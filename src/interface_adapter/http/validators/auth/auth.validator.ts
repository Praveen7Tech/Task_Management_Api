import z from "zod";
import { emailValidator, nameValidator, passwordValidator } from "../../../../common/validator/validator.schema";

export const SignupRequestSchema = z.object({
  name: nameValidator,
  email: emailValidator,
  password: passwordValidator
});