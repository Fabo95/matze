import Joi from "joi";

import { ValidationError } from "@Interval/utils/types";

export const validateEmail = (email: FormDataEntryValue | null) => {
    const schema = Joi.object({
        email: Joi.string().email().required().messages({
            "string.email": ValidationError.INVALID_EMAIL,
            "string.empty": ValidationError.REQUIRED_EMAIL,
        }),
    });

    const { error } = schema.validate({
        email,
    });

    return error?.details[0].message;
};

export const validatePassword = (password: FormDataEntryValue | null, confirmPassword?: FormDataEntryValue | null) => {
    const schema = Joi.object({
        password: Joi.string()
            // https://stackoverflow.com/questions/66271180/how-to-do-password-validation-in-react-js-using-joi-schema
            .regex(/[ -~]*[a-z][ -~]*/) // at least 1 lower-case
            .regex(/[ -~]*[A-Z][ -~]*/) // at least 1 upper-case
            .regex(/[ -~]*(?=[ -~])[^0-9a-zA-Z][ -~]*/) // basically: [ -~] && [^0-9a-zA-Z], at least 1 special character
            .regex(/[ -~]*[0-9][ -~]*/) // at least 1 number
            .min(8)
            .required()
            .messages({
                "string.empty": ValidationError.REQUIRED_PASSWORD,
                "string.min": ValidationError.MIN_LENGTH_PASSWORD,
                "string.pattern.base": ValidationError.INVALID_PASSWORD,
            }),

        ...(confirmPassword !== undefined && {
            // https://stackoverflow.com/questions/29827082/hapi-route-joi-validation-of-password-confirmation
            confirmPassword: Joi.any().valid(Joi.ref("password")).required().messages({
                // TODO Return validation error for empty confirmPassword.
                "any.empty": ValidationError.REQUIRED_CONFIRM_PASSWORD,
                "any.only": ValidationError.NON_MATCHING_PASSWORD,
            }),
        }),
    });

    const { error } =
        confirmPassword !== undefined
            ? schema.validate({
                  confirmPassword,
                  password,
              })
            : schema.validate({
                  password,
              });

    return error?.details[0].message;
};
