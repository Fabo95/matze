import { Box } from '@Interval/components/core/box';
import { Button } from '@Interval/components/core/button';
import { Form } from '@Interval/components/core/form';
import { Heading } from '@Interval/components/core/heading';
import { Input } from '@Interval/components/core/input';
import { Label } from '@Interval/components/core/label';
import { Text } from '@Interval/components/core/text';
import { getTFunction } from '@Interval/i18n/tFunction';

import { apiPostLoginServerAction } from '@Interval/serverAction/serverActions';
import { loginErrorState } from '@Interval/serverAction/utils/serverActionConstants';
import { Locale } from '@Interval/utils/types';

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
