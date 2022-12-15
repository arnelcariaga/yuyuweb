import { getSession } from "next-auth/react";
import DashboardLayout from "./../../components/DashboardLayout"
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import TranslationsForm from "../../components/TranslationsForm";

function Dashboard() {
    const { t } = useTranslation("common");
    let controlPanelTitle = t("controlPanelTitle");

    return (
        <DashboardLayout title={controlPanelTitle}>
            <TranslationsForm />
        </DashboardLayout>
    );
}

export async function getServerSideProps(ctx) {
    let { locale } = ctx
    const session = await getSession(ctx);
    if (!session) {
        return {
            redirect: {
                destination: "/",
                permanent: false,
            },
        };
    }

    return {
        props: {
            ...(await serverSideTranslations(locale, [
                "common",
                "login",
                "footer",
            ])),
        },
    }
}

export default Dashboard