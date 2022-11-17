import React from "react";
import JoinLayout from "../components/JoinLayout";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import InputGroup from "react-bootstrap/InputGroup";
import { IconContext } from "react-icons";
import { FaCpanel, FaEnvelopeOpenText, FaLock } from "react-icons/fa";
import { useForm } from "react-hook-form";
import Toast from "react-bootstrap/Toast";
import ToastContainer from "react-bootstrap/ToastContainer";
import { useRouter } from "next/router";
import Link from "next/link";
import { signIn, getSession } from "next-auth/react";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";

function Index() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [disableLoginBtn, setDisableLoginBtn] = React.useState(false);
  const [loginStatus, setLoginStatus] = React.useState();
  const [openToastError, setOpenToastError] = React.useState(false);
  const router = useRouter();
  const { t } = useTranslation("login");
  let headTitle = t("headTitle"),
    emailLabel = t("emailLabel"),
    wrongEmailErrorMsg = t("wrongEmailErrorMsg"),
    requiredMsg = t("requiredMsg"),
    passwordLabel = t("passwordLabel"),
    loginText = t("loginText"),
    haveNoAccount = t("haveNoAccount"),
    signUpText = t("signUpText"),
    userDoesntExistText = t("userDoesntExistText"),
    wrongPasswordText = t("wrongPasswordText"),
    maxLength = t("maxLength"),
    minLength = t("minLength");

  async function onSubmit(data) {
    setDisableLoginBtn(true);
    const { email, password } = data;

    const result = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    let error = result.error;

    if (error === "invalid_user") {
      setLoginStatus(userDoesntExistText);
      setOpenToastError(true);
    } else if (error === "invalid_password") {
      setLoginStatus(wrongPasswordText);
      setOpenToastError(true);
    } else {
      router.push("/dashboard");
    }

    setDisableLoginBtn(false);
  }

  return (
    <JoinLayout title="Iniciar sesi&oacute;n">
      <ToastContainer className="p-3" position="bottom-start">
        <Toast
          delay={3000}
          autohide
          bg="danger"
          show={openToastError}
          onClose={() => setOpenToastError(!openToastError)}
        >
          <Toast.Header>
            <strong className="me-auto">YuYu | {loginText}</strong>
            <small>Hace 2 segs.</small>
          </Toast.Header>
          <Toast.Body className="text-white">{loginStatus}</Toast.Body>
        </Toast>
      </ToastContainer>

      <Col md={6}>
        <h1 className="text-white fs-2">
          <IconContext.Provider value={{ size: "2em", className: "me-3" }}>
            <FaCpanel />
          </IconContext.Provider>
          {headTitle}
        </h1>
        <Form
          className="fw-semibold text-muted mt-3 bg-white p-3 rounded-3 shadow-lg"
          noValidate
          autoComplete="off"
          onSubmit={handleSubmit(onSubmit)}
        >
          <InputGroup className="mb-3">
            <InputGroup.Text id="basic-addon1">
              <FaEnvelopeOpenText />
            </InputGroup.Text>
            <Form.Floating>
              <Form.Control
                id="email"
                type="email"
                placeholder={emailLabel}
                isInvalid={errors.email}
                {...register("email", {
                  required: requiredMsg,
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: wrongEmailErrorMsg,
                  },
                })}
              />
              <label htmlFor="email">{emailLabel}</label>
            </Form.Floating>

            <Form.Control.Feedback
              type="invalid"
              className={errors?.email && "d-block"}
            >
              {errors.email && errors.email.message}
            </Form.Control.Feedback>
          </InputGroup>

          <InputGroup className="mb-3">
            <InputGroup.Text id="basic-addon1">
              <FaLock />
            </InputGroup.Text>
            <Form.Floating>
              <Form.Control
                id="password"
                type="password"
                placeholder={passwordLabel}
                isInvalid={errors.password}
                {...register("password", {
                  required: requiredMsg,
                  maxLength: 10,
                  minLength: 6,
                })}
              />
              <label htmlFor="password">{passwordLabel}</label>
            </Form.Floating>

            <Form.Control.Feedback
              type="invalid"
              className={errors?.password && "d-block"}
            >
              {(errors.password && errors.password.message) ||
                (errors.password?.type === "maxLength" && (
                  <span>{maxLength} 10</span>
                )) ||
                (errors.password?.type === "minLength" && (
                  <span>{minLength} 6</span>
                ))}
            </Form.Control.Feedback>
          </InputGroup>

          <Row className="mb-3 align-items-center">
            <Col md={6}>
              <Button
                variant="info"
                className="fw-semibold text-white"
                type="submit"
                disabled={disableLoginBtn}
              >
                {loginText}
              </Button>
            </Col>

            <Col md={6} className="text-end">
              <span>{haveNoAccount}</span>{" "}
              <Link href="/signup" passHref>
                <a href="#">{signUpText}</a>
              </Link>
            </Col>
          </Row>
        </Form>
      </Col>
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
        "login",
        "footer",
      ])),
    },
  };
}

export default Index;
