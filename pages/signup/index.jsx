import React from "react";
import JoinLayout from "../../components/JoinLayout";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row"
import InputGroup from "react-bootstrap/InputGroup"
import {
    FaUserAlt,
    FaEnvelopeOpenText,
    FaLock
} from "react-icons/fa"
import { useForm } from "react-hook-form";
import Toast from 'react-bootstrap/Toast';
import ToastContainer from 'react-bootstrap/ToastContainer';
import { useRouter } from "next/router"
import Link from "next/link";
import { getSession } from "next-auth/react";
import { useTranslation } from "next-i18next";

function SignUp() {
    const { register, handleSubmit, watch, formState: { errors } } = useForm()
    const [disableRegisterBtn, setDisableRegisterBtn] = React.useState(false)
    const [registerStatus, setRegisterStatus] = React.useState()
    const [openToastError, setOpenToastError] = React.useState(false)
    const router = useRouter()
    const { t } = useTranslation("login")

    async function onSubmit(data) {
        setDisableRegisterBtn(true)
        const { username, email, password } = data
        const response = await fetch('/api/auth/signUp', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username,
                email,
                password
            }),
        })

        const resData = await response.json()
        if (resData.status === "error") {
            setRegisterStatus(resData.error)
            setOpenToastError(true)
            setDisableRegisterBtn(false)
        } else {
            alert("Registro con éxito")
            router.push('/')
        }
    }

    return (
        <JoinLayout title="Registrarse">

            <ToastContainer className="p-3" position="bottom-start">
                <Toast delay={3000} autohide bg="danger" show={openToastError} onClose={() => setOpenToastError(!openToastError)}>
                    <Toast.Header>
                        <strong className="me-auto">YuYu | Registro</strong>
                        <small>Hace 2 segs.</small>
                    </Toast.Header>
                    <Toast.Body className='text-white'>{registerStatus}</Toast.Body>
                </Toast>
            </ToastContainer>

            <Col md={6}>
                <Form
                    className="fw-semibold text-muted mt-3 bg-white p-3 rounded-3 shadow-lg"
                    noValidate
                    autoComplete="off"
                    onSubmit={handleSubmit(onSubmit)}
                >
                    <InputGroup className="mb-3" hasValidation>
                        <InputGroup.Text id="basic-addon1"><FaUserAlt /></InputGroup.Text>
                        <Form.Floating>
                            <Form.Control
                                id="username"
                                type="text"
                                placeholder="Nombre de usuario"
                                {...register("username", {
                                    required: "Campo obligatorio",
                                    maxLength: 20,
                                    minLength: 5
                                })}
                                isInvalid={errors.username}
                            />
                            <label htmlFor="username">Nombre de usuario</label>
                        </Form.Floating>

                        <Form.Control.Feedback type="invalid" className={errors?.username && "d-block"}>
                            {
                                errors.username &&
                                errors.username.message ||
                                errors.username?.type === "maxLength" && <span>M&aacute;ximo de car&aacute;cteres permitidos 20</span> ||
                                errors.username?.type === "minLength" && <span>M&iacute;nimo de car&aacute;cteres permitidos 5</span>
                            }
                        </Form.Control.Feedback>
                    </InputGroup>


                    <InputGroup className="mb-3">
                        <InputGroup.Text id="basic-addon1"><FaEnvelopeOpenText /></InputGroup.Text>
                        <Form.Floating>
                            <Form.Control
                                id="email"
                                type="email"
                                isInvalid={errors.email}
                                placeholder="name@example.com"
                                {...register("email", {
                                    required: "Campo obligatorio",
                                    pattern: {
                                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                        message: 'Correo electrónico no es correcto'
                                    }
                                })}
                            />
                            <label htmlFor="email">Correo electr&oacute;nico</label>
                        </Form.Floating>

                        <Form.Control.Feedback type="invalid" className={errors?.email && "d-block"}>
                            {errors.email && errors.email.message}
                        </Form.Control.Feedback>
                    </InputGroup>

                    <InputGroup className="mb-3">
                        <InputGroup.Text id="basic-addon1"><FaLock /></InputGroup.Text>
                        <Form.Floating>
                            <Form.Control
                                id="password"
                                type="password"
                                placeholder="Contrase&ntilde;a"
                                isInvalid={errors.password}
                                {...register("password", {
                                    required: "Campo obligatorio",
                                    maxLength: 10,
                                    minLength: 6
                                })}
                            />
                            <label htmlFor="password">Contrase&ntilde;a</label>
                        </Form.Floating>

                        <Form.Control.Feedback type="invalid" className={errors?.password && "d-block"}>
                            {
                                errors.password &&
                                errors.password.message ||
                                errors.password?.type === "maxLength" && <span>M&aacute;ximo de car&aacute;cteres permitidos 10</span> ||
                                errors.password?.type === "minLength" && <span>M&iacute;nimo de car&aacute;cteres permitidos 6</span>
                            }
                        </Form.Control.Feedback>
                    </InputGroup>

                    <InputGroup className="mb-3">
                        <InputGroup.Text id="basic-addon1"><FaLock /></InputGroup.Text>
                        <Form.Floating>
                            <Form.Control
                                id="repeatPassword"
                                type="password"
                                placeholder="Repetir contrase&ntilde;a"
                                isInvalid={errors.repeatPassword}
                                {...register("repeatPassword", {
                                    required: "Campo obligatorio",
                                    validate: (value) => value === watch('password') || "Las contraseñas no coinciden",
                                    maxLength: 10,
                                    minLength: 6
                                })}
                            />
                            <label htmlFor="repeatPassword">Repetir contrase&ntilde;a</label>
                        </Form.Floating>

                        <Form.Control.Feedback type="invalid" className={errors?.repeatPassword && "d-block"}>
                            {
                                errors.repeatPassword && errors.repeatPassword.message ||
                                errors.repeatPassword?.type === "maxLength" && <span>M&aacute;ximo de car&aacute;cteres permitidos 10</span> ||
                                errors.repeatPassword?.type === "minLength" && <span>M&iacute;nimo de car&aacute;cteres permitidos 6</span>
                            }
                        </Form.Control.Feedback>
                    </InputGroup>

                    <Row className="mb-3 align-items-center">
                        <Col md={6}>
                            <Button variant="info" className="fw-semibold text-white" type="submit" disabled={disableRegisterBtn}>
                                Registrarme
                            </Button>
                        </Col>

                        <Col md={6} className="text-end">
                            <span>¿Ya tienes una cuenta?</span>{" "}
                            <Link href="/" passHref>
                                <a href="#">Iniciar sesi&oacute;n</a>
                            </Link>
                        </Col>
                    </Row>

                </Form>
            </Col>
        </JoinLayout>
    );
}


export async function getServerSideProps(ctx) {
    const session = await getSession(ctx);
    if (session) {
        return {
            redirect: {
                destination: "/dashboard",
                permanent: false,
            },
        };
    }

    return {
        props: {}
    }
}

export default SignUp