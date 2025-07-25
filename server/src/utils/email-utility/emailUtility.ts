import { Resend } from 'resend';
import { redisClient } from '../../lib/redisClient';
import { RESEND_API_KEY } from '../../config';

if (!RESEND_API_KEY) {
  throw new Error("RESEND_API_KEY is not defined in the environment variables.");
}

const resend = new Resend(RESEND_API_KEY);

export const sendEmail = async (email: string, otp: number) => {
  await resend.emails.send({
    from: 'Tubespace <support@tubespace.studio>',
    to: email,
    subject: 'OTP for Updating Password',
    html: `
<html>
  <body style="font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 40px 0;">
    <div style="max-width: 600px; width:90%; margin: auto; background-color: #fff; padding: 20px 20px; border-radius: 10px; box-shadow: 0 4px 12px rgba(0,0,0,0.1); position: relative;">
      <div style="position: absolute; top: 30px; right: 40px;">
        <img src="https://tubespace.studio/favicon.png" alt="Tubespace Logo" style="height: 40px;" />
      </div>
      <h2 style="color: #111; margin-bottom: 10px;">Verify it’s you</h2>
      <p style="font-size: 16px; color: #333; line-height: 1.6;">
        There’s one quick step you need to complete to verify your identity.
      </p>
      <p style="margin: 10px 0 10px 0; font-size: 16px;">
        Please enter this verification code when prompted:
      </p>
      <p style="font-size: 32px; font-weight: bold; letter-spacing: 2px; color: #007BFF; margin: 10px 0;">${otp}</p>
      <p style="font-size: 14px; color: #555;">
        This OTP expires in 2 minutes.
      </p>
      <p style="margin-top: 40px; font-size: 14px; color: #888;">Thanks,<br />Tubespace Team</p>
    </div>
    <p style="text-align: center; font-size: 12px; color: #aaa; margin-top: 20px;">
      © Tubespace, 2025. All rights reserved.
    </p>
  </body>
</html>
`
  });

  console.log('Email sent successfully');
};


export const sendOtp = async (email: string, otp: number) => {

  const result = await redisClient.set(`otp:${email}`, otp, 'EX', 120);//expire in 2 minutes

  console.log("Redis SET result:", result);
  await inspectRedisOtps()
  console.log(`OTP for ${email} is ${otp}`);
  await sendEmail(email, otp);

  console.log(`OTP sent to ${email} and otp is ${otp}`);

};

export const verifyOtp = async (email: string, enteredOtp: number) => {
  const storedOtp = await redisClient.get(`otp:${email}`);

  console.log("Stored OTP:", storedOtp, "Entered:", enteredOtp);
  await inspectRedisOtps()

  if (storedOtp && Number(storedOtp) === Number(enteredOtp)) {
    console.log("OTP is valid");
    await redisClient.del(`otp:${email}`);
    return true;
  } else {
    console.log("Invalid or expired OTP");
    return false;
  }
};

export const inspectRedisOtps = async () => {
  const keys = await redisClient.keys('otp:*');
  console.log(`🔑 Found ${keys.length} OTP keys:\n`);

  for (const key of keys) {
    const value = await redisClient.get(key);
    console.log(`${key} => ${value}`);
  }
};