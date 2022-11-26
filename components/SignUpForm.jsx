import React from "react";
import { useRouter } from "next/router"
import Link from "next/link";
import { useTranslation } from "next-i18next";
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
import Toast from 'react-bootstrap/Toast';
import ToastContainer from 'react-bootstrap/ToastContainer';
import { useForm } from "react-hook-form";

export default function SignUpForm() {
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const [disableRegisterBtn, setDisableRegisterBtn] = React.useState(false)
    const [registerStatus, setRegisterStatus] = React.useState()
    const [openToastError, setOpenToastError] = React.useState(false);
    const router = useRouter()
    const { t } = useTranslation("signup");

    let usernameLabel = t("usernameLabel"),
        signUpText = t("signUpText"),
        alreadyHaveAccountText = t("alreadyHaveAccountText"),
        logInText = t("logInText"),
        requiredMsg = t("requiredMsg"),
        maxLength = t("maxLength"),
        minLength = t("minLength"),
        wrongEmailErrorMsg = t("wrongEmailErrorMsg"),
        emailLabel = t("emailLabel"),
        passwordLabel = t("passwordLabel"),
        repeatPasswordLabel = t("repeatPasswordLabel"),
        passwordDontMatch = t("passwordDontMatch"),
        userAlreadyExist = t("userAlreadyExist"),
        userSignUpSuccessfully = t("userSignUpSuccessfully");

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
            setRegisterStatus(userAlreadyExist)
            setOpenToastError(true)
            setDisableRegisterBtn(false)
        } else {
            alert(userSignUpSuccessfully)
            router.push('/')
        }
    }

    return <>
        <ToastContainer className="p-3" position="bottom-start">
            <Toast delay={3000} autohide bg="danger" show={openToastError} onClose={() => setOpenToastError(!openToastError)}>
                <Toast.Header>
                    <strong className="me-auto">YuYu | Registro</strong>
                    <small>Hace 2 segs.</small>
                </Toast.Header>
                <Toast.Body className='text-white'>{registerStatus}</Toast.Body>
            </Toast>
        </ToastContainer>
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
                        placeholder={usernameLabel}
                        {...register("username", {
                            required: requiredMsg,
                            maxLength: 20,
                            minLength: 5
                        })}
                        isInvalid={errors.username}
                    />
                    <label htmlFor="username">{usernameLabel}</label>
                </Form.Floating>

                <Form.Control.Feedback type="invalid" className={errors?.username && "d-block"}>
                    {
                        errors.username &&
                        errors.username.message ||
                        errors.username?.type === "maxLength" && <span>{maxLength} 20</span> ||
                        errors.username?.type === "minLength" && <span>{minLength} 5</span>
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
                            required: requiredMsg,
                            pattern: {
                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                message: wrongEmailErrorMsg
                            }
                        })}
                    />
                    <label htmlFor="email">{emailLabel}</label>
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
                        placeholder={passwordLabel}
                        isInvalid={errors.password}
                        {...register("password", {
                            required: requiredMsg,
                            maxLength: 10,
                            minLength: 6
                        })}
                    />
                    <label htmlFor="password">{passwordLabel}</label>
                </Form.Floating>

                <Form.Control.Feedback type="invalid" className={errors?.password && "d-block"}>
                    {
                        errors.password &&
                        errors.password.message ||
                        errors.password?.type === "maxLength" && <span>{maxLength} 10</span> ||
                        errors.password?.type === "minLength" && <span>{minLength} 6</span>
                    }
                </Form.Control.Feedback>
            </InputGroup>

            <InputGroup className="mb-3">
                <InputGroup.Text id="basic-addon1"><FaLock /></InputGroup.Text>
                <Form.Floating>
                    <Form.Control
                        id="repeatPassword"
                        type="password"
                        placeholder={repeatPasswordLabel}
                        isInvalid={errors.repeatPassword}
                        {...register("repeatPassword", {
                            required: requiredMsg,
                            validate: (value) => value === watch('password') || passwordDontMatch,
                            maxLength: 10,
                            minLength: 6
                        })}
                    />
                    <label htmlFor="repeatPassword">{repeatPasswordLabel}</label>
                </Form.Floating>

                <Form.Control.Feedback type="invalid" className={errors?.repeatPassword && "d-block"}>
                    {
                        errors.repeatPassword && errors.repeatPassword.message ||
                        errors.repeatPassword?.type === "maxLength" && <span>{maxLength} 10</span> ||
                        errors.repeatPassword?.type === "minLength" && <span>{minLength} 5</span>
                    }
                </Form.Control.Feedback>
            </InputGroup>

            <Row className="mb-3 align-items-center">
                <Col md={6}>
                    <Button variant="info" className="fw-semibold text-white" type="submit" disabled={disableRegisterBtn}>
                        {signUpText}
                    </Button>
                </Col>

                <Col md={6} className="text-end">
                    <span>{alreadyHaveAccountText}</span>{" "}
                    <Link href="/" passHref>
                        <a href="#">{logInText}</a>
                    </Link>
                </Col>
            </Row>
        </Form>
    </>
}