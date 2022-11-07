import React from 'react';
import Container from 'react-bootstrap/Container';
import Head from 'next/head';
import Logo from './Logo'
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Footer from './Footer';
import { useSelector, useDispatch } from "react-redux";
import { getLangsAction } from "../Redux/langsDucks";

function Layout({ children, title }) {
    const dispatch = useDispatch();
    const langs = useSelector((s) => s.langsData.langs);

    React.useEffect(() => {
        dispatch(getLangsAction());
    }, [dispatch]);

    return <>
        <Head>
            <title>YuYu || {title}</title>
            <meta name="viewport" content="width=device-width, initial-scale=1.0"></meta>
        </Head>
        <Container className="bg-info" fluid>
            <Row className="min-vh-100 align-items-center p-5 pb-1 pt-1">
                <Col md={12}>
                    <Form.Select aria-label="Default select example" className='w-auto shadow-lg'>
                        <option value="">Seleccionar idioma</option>
                        {langs.map(({ _id, name }) => <option key={_id} value={_id}>{name}</option>)}
                    </Form.Select>
                </Col>
                <Logo />
                {children}
                <Footer />
            </Row>
        </Container>
    </>

}
export default Layout