import Container from 'react-bootstrap/Container';
import Head from 'next/head';
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Footer from './Footer';
import ChangeLocale from "./ChangeLocale"

function Layout({ children, title }) {
    return <>
        <Head>
            <title>YuYu || {title}</title>
            <meta name="viewport" content="width=device-width, initial-scale=1.0"></meta>
        </Head>
        <Container className="bg-info" fluid>
            <Row className="min-vh-100 align-items-center p-5 pb-1 pt-1">
                <Col md={12}>
                    <ChangeLocale />
                </Col>
                <Col md={12}>
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