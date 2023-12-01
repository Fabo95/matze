import { Box } from "@Interval/components/core/box";
import { Form } from "@Interval/components/core/form";
import { Heading } from "@Interval/components/core/heading";
import { Input } from "@Interval/components/core/input";
import { Label } from "@Interval/components/core/label";
import { Text } from "@Interval/components/core/text";
import { getTFunction } from "@Interval/i18n/tFunction";
import { apiPostRegisterServerAction } from "@Interval/serverAction/serverActions";
import { registerErrorState } from "@Interval/serverAction/utils/serverActionConstants";
import { Locale } from "@Interval/utils/types";
import { Link } from "@Interval/components/core/link";
import { FormButton } from "@Interval/components/formButton";

export default async function register({
    params: { lang },
}: {
    params: {
        lang: Locale;
    };
}) {
    const t = getTFunction(lang);

    // --- HELPERS ---

    const headline = t("pages.register.headline");
    const buttonTitle = t("pages.register.cta");
    const emailLabel = t("pages.register.emailLabel");
    const passwordLabel = t("pages.register.passwordLabel");
    const confirmPasswordLabel = t("pages.register.confirmPasswordLabel");

    const emailError = registerErrorState.getEmailError();
    const passwordError = registerErrorState.getPasswordError();

    const emailValidationError = emailError && t(`pages.register.validationError.${emailError}`);

    const passwordValidationError = passwordError && t(`pages.register.validationError.${passwordError}`);

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
                        <Text className="form-validation-error">{emailValidationError}</Text>
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

                        <Text className="form-validation-error">{passwordValidationError}</Text>
                    </Box>

                    <FormButton className="form-cta" type="submit">
                        {buttonTitle}
                    </FormButton>

                    <Link className="form-subtitle" href={"/login"} locale={lang}>
                        {t("pages.register.subtitle.loginRedirect")}
                    </Link>
                </Form>
            </Box>
        </Box>
    );
}
