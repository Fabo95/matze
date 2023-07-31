'use server';

import Joi from 'Joi';

export const validateEmail = (email: FormDataEntryValue | null) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
  });

  const { error } = schema.validate({ email });

  return error;
};

export const validatePassword = (password: FormDataEntryValue | null) => {
  const schema = Joi.object({
    password: Joi.string()
      // https://stackoverflow.com/questions/66271180/how-to-do-password-validation-in-react-js-using-joi-schema
      .regex(/[ -~]*[a-z][ -~]*/) // at least 1 lower-case
      .regex(/[ -~]*[A-Z][ -~]*/) // at least 1 upper-case
      .regex(/[ -~]*(?=[ -~])[^0-9a-zA-Z][ -~]*/) // basically: [ -~] && [^0-9a-zA-Z], at least 1 special character
      .regex(/[ -~]*[0-9][ -~]*/) // at least 1 number
      .min(4)
      .required(),
  });

  const { error } = schema.validate({ password });

  return error;
};
