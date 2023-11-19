import { Box } from 'core/box';
import { Form } from 'core/form';
import { Input } from 'core/input';
import { Button } from 'core/button';
import { Locale } from 'utils/types';
import { getTFunction } from 'i18n/tFunction';
import { Heading } from 'core/heading';
import { Label } from 'core/label';
import { apiPostLoginServerAction } from 'serverAction/serverActions';
import { Text } from 'core/text';
import { loginErrorState } from 'serverAction/utils/serverActionConstants';

export default async function Login({
  params: { lang },
}: {
  params: { lang: Locale };
}) {
  const t = await getTFunction(lang);

  // --- HELPERS ---

  const headline = t('pages.login.headline');
  const buttonTitle = t('pages.login.cta');
  const emailLabel = t('pages.login.emailLabel');
  const passwordLabel = t('pages.login.passwordLabel');

  const emailError = loginErrorState.getEmailError();
  const passwordError = loginErrorState.getPasswordError();

  const emailValidationError =
    emailError && t(`pages.login.validationError.${emailError}`);

  const passwordValidationError =
    passwordError && t(`pages.login.validationError.${passwordError}`);

  // --- RENDER ---

  return (
    <Box className="login-page">
      <Box className="login-page-container">
        <Heading className="login-page-headline">{headline}</Heading>

        <Form action={apiPostLoginServerAction} className="login-form">
          <Box className="login-form-email-box">
            <Label className="login-form-label" htmlFor="email">
              {emailLabel}
            </Label>
            <Input
              className="login-form-input"
              id="email"
              name="email"
              type="text"
            />
            <Text className="login-form-validation-error">
              {emailValidationError}
            </Text>
          </Box>

          <Box className="login-form-password-box">
            <Label className="login-form-label" htmlFor="password">
              {passwordLabel}
            </Label>
            <Input
              // TODO Build show password toggle
              className="login-form-input"
              id="password"
              name="password"
              type="password"
            />
            <Text className="login-form-validation-error">
              {passwordValidationError}
            </Text>
          </Box>

          <Button
            buttonTitle={buttonTitle}
            className="login-form-cta"
            type="submit"
          />
        </Form>
      </Box>
    </Box>
  );
}
