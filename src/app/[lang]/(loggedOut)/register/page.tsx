import { Box } from 'common/box';
import { Form } from 'common/form';
import { Input } from 'common/input';
import { Button } from 'common/button';
import { Locale } from 'utils/types';
import { getTFunction } from 'i18n/tFunction';
import { Heading } from 'common/heading';
import { Label } from 'common/label';
import { apiPostRegisterServerAction } from 'serverAction/serverActions';
import { Text } from 'common/text';
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
    <Box className="register-page">
      <Box className="register-page-container">
        <Heading className="register-page-headline">{headline}</Heading>

        <Form action={apiPostRegisterServerAction} className="register-form">
          <Box className="register-form-email-box">
            <Label className="register-form-label" htmlFor="email">
              {emailLabel}
            </Label>
            <Input
              className="register-form-input"
              id="email"
              name="email"
              type="text"
            />
            <Text className="register-form-validation-error">
              {emailValidationError}
            </Text>
          </Box>

          <Box className="register-form-password-box">
            <Label className="register-form-label" htmlFor="password">
              {passwordLabel}
            </Label>
            <Input
              // TODO Build show password toggle
              className="register-form-input register-form-password-input"
              id="password"
              name="password"
              type="password"
            />
            <Label className="register-form-label" htmlFor="password">
              {confirmPasswordLabel}
            </Label>
            <Input
              // TODO Build show password toggle
              className="register-form-input"
              id="confirmPassword"
              name="confirmPassword"
              type="password"
            />

            <Text className="register-form-validation-error">
              {passwordValidationError}
            </Text>
          </Box>
          <Button
            buttonTitle={buttonTitle}
            className="register-form-cta"
            type="submit"
          />
        </Form>
      </Box>
    </Box>
  );
}
