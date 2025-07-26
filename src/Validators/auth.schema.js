import Joi from "joi";

/* Sign Up Schema */
export const signUpSchema = {
  body: Joi.object({
    username: Joi.string().required().messages({
      "any.required": "Username is required",
      "string.base": "Username must be a string",
    }),
    email: Joi.string()
      .email({
        tlds: {
          allow: ["com", "net", "org", "edu"],
        },
        minDomainSegments: 2,
        maxDomainSegments: 3,
      })
      .required()
      .messages({
        "any.required": "Email is required",
        "string.email": "Email must be valid",
        "string.base": "Email must be a string",
      }),
    password: Joi.string().required().messages({
      "any.required": "Password is required",
      "string.base": "Password must be a string",
    }),
    age: Joi.number().required().messages({
      "any.required": "Age is required",
      "number.base": "Age must be a number",
    }),
    gender: Joi.string().valid("male", "female").messages({
      "string.base": "Gender must be a string",
      "string.valid": "Gender must be male or female",
    }),
  }),
};

/* Sign In Schema */
export const signInSchema = {
  body: Joi.object({
    email: Joi.string()
      .email({
        tlds: {
          allow: ["com", "net", "org", "edu"],
        },
        minDomainSegments: 2,
        maxDomainSegments: 3,
      })
      .required()
      .messages({
        "any.required": "Email is required",
        "string.email": "Email must be valid",
        "string.base": "Email must be a string",
      }),
    password: Joi.string().required().messages({
      "any.required": "Password is required",
      "string.base": "Password must be a string",
    }),
  }),
};

/* Forget Password Schema */
export const forgetPasswordSchema = {
  body: Joi.object({
    email: Joi.string().email().required().messages({
      "any.required": "Email is required",
      "string.base": "Email must be a string",
      "string.email": "Email must be valid",
    }),
  }),
};

/* Reset Password Schema */
export const resetPasswordSchema = {
  body: Joi.object({
    email: Joi.string().email().required().messages({
      "any.required": "Email is required",
      "string.base": "Email must be a string",
      "string.email": "Email must be valid",
    }),
    newPassword: Joi.string().required().messages({
      "any.required": "New Password is required",
      "string.base": "New Password must be a string",
    }),
    otp: Joi.string().required().messages({
      "any.required": "Reset Password Otp is required",
      "string.base": "Reset Password Otp must be a string",
    }),
  }),
};

/* Refresh Token Schema */
export const refreshTokenSchema = {
  headers: Joi.object({
    refreshtoken: Joi.string().required().messages({
      "any.required": "Refresh Token is required",
      "string.base": "Refresh Token must be a string",
    }),
  }).unknown(true),
};
