import { Box } from 'common/box';
import { Form } from 'common/form';
import { Input } from 'common/input';
import { Button } from 'common/button';
import { Locale } from 'utils/types';
import { getTFunction } from 'i18n/get-t-function';
import { Heading } from 'common/heading';
import { Label } from 'common/label';
import { apiPostRegisterServerAction } from 'serverAction/serverActions';

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

  // --- RENDER ---

  return (
    <Box className="register-page">
      <Box className="register-page-container">
        <Heading className="register-page-headline">{headline}</Heading>

        <Form action={apiPostRegisterServerAction} className="register-form">
          <Label className="register-form-label" htmlFor="email">
            {emailLabel}
          </Label>
          <Input
            className="register-form-input"
            id="email"
            name="email"
            type="text"
          />
          <Label className="register-form-label" htmlFor="password">
            {passwordLabel}
          </Label>
          <Input
            // TODO Build show password toggle
            className="register-form-input"
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
