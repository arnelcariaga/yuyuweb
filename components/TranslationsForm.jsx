import React from "react"
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';
import { FaPlusCircle, FaFileAudio, FaExclamation } from "react-icons/fa"
import { IconContext } from "react-icons/"
import { useForm } from "react-hook-form";

function InputsPhrases({ i, register, errors }) {
    return <Row className="mb-3">
        <Form.Group as={Col} controlId={`englishPhrase${i}`}>
            <Form.Label className="text-muted fw-semibold">Frase {i}</Form.Label>
            <InputGroup className="mb-3">
                <Form.Control
                    placeholder="Por ejemplo: I feel you..."
                    aria-label={`Frase ${i}`}
                    isInvalid={errors[`englishPhrase${i}`]}
                    {...register(`englishPhrase${i}`, {
                        required: true,
                        pattern: {
                            value: /^[a-zA-Z0-9!@#\$%\^\&*\)\(+=._-]+$/g,
                            message: "No se permite este tipo de caracter"
                        }
                    })}
                />
                <InputGroup.Text className={`bg-light p-0 ${errors[`englishPhraseAudio${i}`] && "border-danger"}`}>
                    <Button variant="light" className="border-0 rounded-0 position-relative overflow-hidden d-flex align-items-center" type="button">
                        <IconContext.Provider value={{ className: "fs-5 text-muted" }}>
                            <FaFileAudio />
                        </IconContext.Provider>
                        <Form.Control
                            type="file"
                            className="position-absolute end-0 top-0 opacity-0"
                            {...register(`englishPhraseAudio${i}`, {
                                required: <FaExclamation />,
                            })}
                        />
                        <Form.Control.Feedback type="invalid" className={errors[`englishPhraseAudio${i}`] && "d-block m-0"}>
                            {errors[`englishPhraseAudio${i}`] && errors[`englishPhraseAudio${i}`].message}
                        </Form.Control.Feedback>
                    </Button>

                </InputGroup.Text>
                <Form.Control.Feedback type="invalid" className={errors[`englishPhrase${i}`] && "d-block"}>
                    {errors[`englishPhrase${i}`] && errors[`englishPhrase${i}`].message}
                </Form.Control.Feedback>
            </InputGroup>
        </Form.Group>

        <Form.Group as={Col} controlId={`howToSay${i}`}>
            <Form.Label className="text-muted fw-semibold">Como se dice en tu idioma?</Form.Label>
            <InputGroup className="mb-3">
                <Form.Control
                    isInvalid={errors[`howToSay${i}`]}
                    aria-label="Como se dice en tu idioma?"
                    {...register(`howToSay${i}`, {
                        required: true,
                        pattern: {
                            value: /^[a-zA-Z0-9!@#\$%\^\&*\)\(+=._-]+$/g,
                            message: "No se permite este tipo de caracter"
                        }
                    })}
                />
                <InputGroup.Text className={`bg-light p-0 ${errors[`howToSayAudio${i}`] && "border-danger"}`}>
                    <Button variant="light" className="border-0 rounded-0 position-relative overflow-hidden d-flex align-items-center" type="button">
                        <IconContext.Provider value={{ className: "fs-5 text-muted" }}>
                            <FaFileAudio />
                        </IconContext.Provider>
                        <Form.Control
                            type="file"
                            className="position-absolute end-0 top-0 opacity-0"
                            {...register(`howToSayAudio${i}`, {
                                required: <FaExclamation />,
                            })}
                        />
                        <Form.Control.Feedback type="invalid" className={errors[`howToSayAudio${i}`] && "d-block m-0"}>
                            {errors[`howToSayAudio${i}`] && errors[`howToSayAudio${i}`].message}
                        </Form.Control.Feedback>
                    </Button>
                </InputGroup.Text>
                <Form.Control.Feedback type="invalid" className={errors[`howToSay${i}`] && "d-block"}>
                    {errors[`howToSay${i}`] && errors[`howToSay${i}`].message}
                </Form.Control.Feedback>
            </InputGroup>
        </Form.Group>
    </Row>
}

function TranslationsForm() {
    const [numberOfInput, setNumberOfInput] = React.useState(1)
    const [defaultInput, setDefaultInput] = React.useState([1, 2])
    const { register, handleSubmit, formState: { errors } } = useForm();

    const addPhraseFunc = () => {
        let newArray = [...defaultInput];
        for (let i = 0; i < numberOfInput; i++) {
            newArray.push(i + 3)
        }
        setDefaultInput(newArray);
    }

    const quantityInputFunc = (e) => {
        const { value } = e.target
        setNumberOfInput(parseInt(value))
    }

    async function onSubmit(data) {

    }

    return (
        <div className="bg-white p-4 rounded shadow">
            <Form
                noValidate
                onSubmit={handleSubmit(onSubmit)}
            >
                <Row className="mb-3">
                    <Col md={8} className="d-flex flex-direction-row justify-content-between">
                        <h6 className="text-danger fw-bold">
                            Agrega al menos 2 frases del ingles que se habla y se escucha del dia a dia y traducelas en tu idioma.
                            <p>Es impresindible colocar los audios de como se pronuncia en cada idioma.</p>
                        </h6>
                    </Col>

                    <Col md={4} className="d-flex align-items-center justify-content-end">
                        <strong className="me-2 text-muted fw-bold">Cantidad de frase:</strong>
                        <Form.Control type="number" min="1" onChange={quantityInputFunc} defaultValue={1} className="w-25" />
                        <Button variant="primary" type="button" className="ms-2" onClick={addPhraseFunc}>
                            <IconContext.Provider value={{ className: "my-1" }}>
                                <FaPlusCircle />
                            </IconContext.Provider>
                        </Button>
                    </Col>
                </Row>

                {
                    defaultInput.map(
                        (e, i) => <InputsPhrases
                            key={i}
                            i={i + 1}
                            register={register}
                            errors={errors}
                        />
                    )
                }

                <Button variant="primary" type="submit">
                    Guardar
                </Button>
            </Form>
        </div>
    );
}

export default TranslationsForm;