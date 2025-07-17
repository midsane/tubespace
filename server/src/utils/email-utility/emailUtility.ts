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
    subject: 'OTP for Update Password',
    html: `<html>   
  <body style="font-family: Arial, sans-serif; background-color: #f9f9f9; padding: 20px;">
    <div style="max-width: 600px; margin: auto; background-color: white; padding: 30px; border-radius: 10px; box-shadow: 0 2px 6px rgba(0,0,0,0.1);">
      <h2 style="color: #333;">Password Reset Request</h2>
      <p>Greetings from Tubespace.</p>
      <p>You (or someone else) requested to reset your account password.</p>
      <p>
        Use the following One-Time Password (OTP) to verify your identity and change your password:
      </p>
      <p style="font-size: 24px; font-weight: bold; color: #007BFF; letter-spacing: 2px;">${otp}</p>
      <p style="margin-top: 20px;">
        This OTP is valid for a limited time. If you didn't request a password change, you can safely ignore this email.
      </p>
      <p style="color: #888; font-size: 12px; margin-top: 40px;">
        — Tubespace
      </p>
    </div>
  </body>
</html>
`
  });
  console.log('Email sent successfully');
}

export const sendOtp = async (email: string, otp: number) => {

  const result = await redisClient.set(`otp:${email}`, otp, { ex: 120 });//expire in 2 minutes

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

  if (storedOtp && storedOtp === Number(enteredOtp)) {
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