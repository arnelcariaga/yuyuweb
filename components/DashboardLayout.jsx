import Container from 'react-bootstrap/Container';
import Head from 'next/head';
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Footer from './Footer';
import { useTranslation } from "next-i18next";
import ChangeLocale from "./ChangeLocale"
import { useSession, signOut } from "next-auth/react";
import Button from "react-bootstrap/Button";
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Dropdown from 'react-bootstrap/Dropdown';

function Layout({ children, title }) {
    const { t } = useTranslation("common");
    let newTitle = `YuYu || ${title}`,
        signOutLabel = t("signOutLabel", { ns: "login" });
    const { data: session } = useSession()
    return <>
        <Head>
            <title>{newTitle}</title>
            <meta name="viewport" content="width=device-width, initial-scale=1.0"></meta>
        </Head>
        <Container className="bg-info" fluid>
            <Row className="min-vh-100 align-items-center p-5 pb-1 pt-1">
                <Col md={12}>
                    <ChangeLocale />
                </Col>
                <Col md={12}>
                    <div className="d-flex align-items-center justify-content-between">
                        <h3 className="text-white fw-bold">{newTitle}</h3>
                        <Dropdown as={ButtonGroup}>
                            <Button variant="success" size='sm'>{session?.user.username}</Button>
                            <Dropdown.Toggle split variant="success" id="dropdown-split-basic" />
                            <Dropdown.Menu>
                                <Dropdown.Item onClick={() => signOut()}>{signOutLabel}</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </div>
                    {children}
                </Col>
                <Col md={12}>
                    <Footer />
                </Col>
            </Row>
        </Container>
    </>

}
export default Layout