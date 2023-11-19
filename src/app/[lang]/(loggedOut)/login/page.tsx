import { Box } from 'core/box';
import { Form } from 'core/form';
import { Input } from 'core/input';
import { Locale } from 'utils/types';
import { getTFunction } from 'i18n/tFunction';
import { Heading } from 'core/heading';
import { Label } from 'core/label';
import { apiPostLoginServerAction } from 'serverAction/serverActions';
import { Text } from 'core/text';
import { loginErrorState } from 'serverAction/utils/serverActionConstants';
import { Button } from 'core/button';

export default async function Login({
  params: { lang },
}: {
  params: { lang: Locale };
}) {
  const t = getTFunction(lang);

  // --- HELPERS ---

  const emailError = loginErrorState.getEmailError();
  const passwordError = loginErrorState.getPasswordError();

  const emailValidationError =
    emailError && t(`pages.login.validationError.${emailError}`);

  const passwordValidationError =
    passwordError && t(`pages.login.validationError.${passwordError}`);

  // --- RENDER ---

  return (
    <Box className="login-register-page">
      <Box className="login-register-page-container">
        <Heading className="form-headline">{t('pages.login.headline')}</Heading>

        <Form action={apiPostLoginServerAction}>
          <Box className="form-email-box">
            <Label className="form-label" htmlFor="email">
              {t('pages.login.emailLabel')}
            </Label>

            <Input className="form-input" id="email" name="email" type="text" />

            <Text className="form-validation-error">
              {emailValidationError}
            </Text>
          </Box>

          <Box className="form-password-box">
            <Label className="form-label" htmlFor="password">
              {t('pages.login.passwordLabel')}
            </Label>

            <Input
              // TODO Build show password toggle
              className="form-input"
              id="password"
              name="password"
              type="password"
            />
            <Text className="form-validation-error">
              {passwordValidationError}
            </Text>
          </Box>

          <Button className="form-cta" type="submit">
            {t('pages.login.cta')}
          </Button>
        </Form>
      </Box>
    </Box>
  );
}
