import { getSession } from "next-auth/react";
import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import JoinLayout from "../../components/JoinLayout";;
import SignUpForm from "../../components/SignUpForm"

function SignUp() {
    return (
        <JoinLayout title="Registrarse">
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
                "common",
                "logo",
                "signup",
                "footer",
            ])),
        }
    }
}

export default SignUp