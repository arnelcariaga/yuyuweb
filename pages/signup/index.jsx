import { getSession } from "next-auth/react";
import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import JoinLayout from "../../components/JoinLayout";
import SignUpForm from "../../components/SignUpForm"
import { useTranslation } from "next-i18next";

function SignUp() {
    const { t } = useTranslation("signup");
    let signUpText = t("signUpText")
    return (
        <JoinLayout title={signUpText}>
            <SignUpForm />
        </JoinLayout>
    );
}

export async function getServerSideProps({ res, locale }) {
    const session = await getSession(res);
    if (session) {
        return {
            redirect: {
                destination: "/dashboard",
                permanent: false,
            },
        };
    }

    return {
        props: {
            ...(await serverSideTranslations(locale, [
                "logo",
                "signup",
                "footer",
            ])),
        }
    }
}

export default SignUp