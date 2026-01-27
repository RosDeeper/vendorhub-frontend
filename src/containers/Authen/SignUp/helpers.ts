import z from "zod";

export enum CrudKeys {
  _EMAIL = 'email',
  _PHONE_NUMBER = 'phone',
  _PASSWORD = 'password',
  _CONFIRM_PASSWORD = 'confirmPassword',
};

export type SignUpFormValues = {
  [CrudKeys._EMAIL]: string,
  [CrudKeys._PHONE_NUMBER]: string,
};

export type CreatePasswordFormValues = {
  [CrudKeys._PASSWORD]: string,
  [CrudKeys._CONFIRM_PASSWORD]: string,
};

export const initialValues = {
  [CrudKeys._EMAIL]: '',
  [CrudKeys._PHONE_NUMBER]: '',
};

export const initialPasswordValues = {
  [CrudKeys._PASSWORD]: '',
  [CrudKeys._CONFIRM_PASSWORD]: '',
};

// ------------ Form Schema --------------

export const formSchema = z.object({
  [CrudKeys._EMAIL]: z.email("Invalid email address")
    .min(1, "Email is required"),
  [CrudKeys._PHONE_NUMBER]: z.string("Invalid phone number")
    .min(1, "Phone number is required"),
});

export const passwordSchema = z
  .object({
    [CrudKeys._PASSWORD]: z.string("Invalid password"),
    [CrudKeys._CONFIRM_PASSWORD]: z.string("Invalid confirm password")
  })
  .refine(
    (data) => data[CrudKeys._PASSWORD] === data[CrudKeys._CONFIRM_PASSWORD],
    {
      message: "Confirm Password do not match",
      path: [CrudKeys._CONFIRM_PASSWORD],
    }
  );
