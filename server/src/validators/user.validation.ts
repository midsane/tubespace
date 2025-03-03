import Joi from "joi";

const userSchema = Joi.object({
    username: Joi.string().alphanum().min(3).max(15).required().messages({
        "string.base": "username must be a string",
        "string.alphanum": "Username can only contain letters and numbers.",
        "string.min": "Username must be at least 3 characters long.",
        "string.max": "Username must not exceed 15 characters.",
        "any.required": "Username is required.",
    }),
    password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")).required().messages({
        "string.pattern.base": "invalid password",
        "any.required": "Password is required.",
    }),

    email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ["com", "net", "tech", "me", "live"] } })
        .required()
        .messages({
            "string.pattern.base": "invalid email",
            "any.required": "email is required",
        }),
});

export default userSchema;
