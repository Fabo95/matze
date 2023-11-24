import { Box } from 'components/core/box';
import { Form } from 'components/core/form';
import { Input } from 'components/core/input';
import { Locale } from 'utils/types';
import { getTFunction } from 'i18n/tFunction';
import { Heading } from 'components/core/heading';
import { Label } from 'components/core/label';
import { apiPostRegisterServerAction } from 'serverAction/serverActions';
import { Text } from 'components/core/text';
import { registerErrorState } from 'serverAction/utils/serverActionConstants';
import { Button } from 'components/core/button';

export default async function register({
  params: { lang },
}: {
  params: { lang: Locale };
}) {
  const t = getTFunction(lang);

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
          <Button className="form-cta" type="submit">
            {buttonTitle}
          </Button>
        </Form>
      </Box>
    </Box>
  );
}
