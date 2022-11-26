import React from "react";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row"
import { getSession } from "next-auth/react";
import DashboardLayout from "./../../components/DashboardLayout"
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import TranslationsForm from "../../components/TranslationsForm";
function Dashboard() {
    const { t } = useTranslation("common");

    return (
        <DashboardLayout title="Panel de control">
            <TranslationsForm />
        </DashboardLayout>
    );
}

export async function getServerSideProps({ res, locale }) {
    const session = await getSession(res);
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
                "logo",
                "footer",
            ])),
        },
    }
}

export default Dashboard