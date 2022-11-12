import React from "react";
import SignUpLayout from "../components/JoinLayout";
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
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

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
  const { t } = useTranslation("footer");

  async function onSubmit(data) {
    setDisableLoginBtn(true);
    const { email, password } = data;

    const result = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    if (!result.error) {
      router.push("/dashboard");
    } else {
      setLoginStatus(result.error);
      setOpenToastError(true);
      setDisableLoginBtn(false);
    }
  }

  return (
    <SignUpLayout title="Iniciar sesi&oacute;n">
      <p>{t("description")}</p>
      <ToastContainer className="p-3" position="bottom-start">
        <Toast
          delay={3000}
          autohide
          bg="danger"
          show={openToastError}
          onClose={() => setOpenToastError(!openToastError)}
        >
          <Toast.Header>
            <strong className="me-auto">YuYu | Inicio de sesi&oacute;n</strong>
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
          Panel de control
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
                isInvalid={errors.email}
                placeholder="name@example.com"
                {...register("email", {
                  required: "Campo obligatorio",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Correo electrónico no es correcto",
                  },
                })}
              />
              <label htmlFor="email">Correo electr&oacute;nico</label>
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
                placeholder="Contrase&ntilde;a"
                isInvalid={errors.password}
                {...register("password", {
                  required: "Campo obligatorio",
                  maxLength: 10,
                  minLength: 6,
                })}
              />
              <label htmlFor="password">Contrase&ntilde;a</label>
            </Form.Floating>

            <Form.Control.Feedback
              type="invalid"
              className={errors?.password && "d-block"}
            >
              {(errors.password && errors.password.message) ||
                (errors.password?.type === "maxLength" && (
                  <span>M&aacute;ximo de car&aacute;cteres permitidos 10</span>
                )) ||
                (errors.password?.type === "minLength" && (
                  <span>M&iacute;nimo de car&aacute;cteres permitidos 6</span>
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
                Iniciar sesi&oacute;n
              </Button>
            </Col>

            <Col md={6} className="text-end">
              <span>¿No tienes una cuenta?</span>{" "}
              <Link href="/signup" passHref>
                <a href="#">Reg&iacute;strate</a>
              </Link>
            </Col>
          </Row>
        </Form>
      </Col>
    </SignUpLayout>
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
      ...(await serverSideTranslations(locale, ["common", "footer"])),
    },
  };
}

export default Index;
