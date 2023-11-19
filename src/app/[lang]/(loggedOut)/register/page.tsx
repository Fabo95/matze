import { Box } from 'core/box';
import { Form } from 'core/form';
import { Input } from 'core/input';
import { Button } from 'core/button';
import { Locale } from 'utils/types';
import { getTFunction } from 'i18n/tFunction';
import { Heading } from 'core/heading';
import { Label } from 'core/label';
import { apiPostRegisterServerAction } from 'serverAction/serverActions';
import { Text } from 'core/text';
import { registerErrorState } from 'serverAction/utils/serverActionConstants';

export default async function register({
  params: { lang },
}: {
  params: { lang: Locale };
}) {
  const t = await getTFunction(lang);

  // --- HELPERS ---

  const headline = t('pages.register.headline');
  const buttonTitle = t('pages.register.cta');
  const emailLabel = t('pages.register.emailLabel');
  const passwordLabel = t('pages.register.passwordLabel');
  const confirmPasswordLabel = t('pages.register.confirmPasswordLabel');

  const emailError = registerErrorState.getEmailError();
  const passwordError = registerErrorState.getPasswordError();

  const emailValidationError =
    emailError && t(`pages.register.validationError.${emailError}`);

  const passwordValidationError =
    passwordError && t(`pages.register.validationError.${passwordError}`);

  // --- RENDER ---

  return (
    <Box className="login-register-page">
      <Box className="login-register-page-container">
        <Heading className="form-headline">{headline}</Heading>

        <Form action={apiPostRegisterServerAction}>
          <Box className="form-email-box">
            <Label className="form-label" htmlFor="email">
              {emailLabel}
            </Label>
            <Input className="form-input" id="email" name="email" type="text" />
            <Text className="form-validation-error">
              {emailValidationError}
            </Text>
          </Box>

          <Box className="form-password-box">
            <Label className="form-label" htmlFor="password">
              {passwordLabel}
            </Label>
            <Input
              // TODO Build show password toggle
              className="form-input"
              id="password"
              name="password"
              type="password"
            />
            <Label className="form-label" htmlFor="password">
              {confirmPasswordLabel}
            </Label>
            <Input
              // TODO Build show password toggle
              className="form-input"
              id="confirmPassword"
              name="confirmPassword"
              type="password"
            />

            <Text className="form-validation-error">
              {passwordValidationError}
            </Text>
          </Box>
          <Button
            buttonTitle={buttonTitle}
            className="form-cta"
            type="submit"
          />
        </Form>
      </Box>
    </Box>
  );
}
