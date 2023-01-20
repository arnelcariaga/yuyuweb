import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import {
    FaFileAudio,
    FaExclamation,
} from "react-icons/fa"
import { IconContext } from "react-icons"
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import { useTranslation } from "next-i18next";

function InputsPhrases({ i, register, errors, translationsAlreadyExist }) {
    const { t } = useTranslation("common");
    let phrase = t("phrase"),
        placeHolderExample = t("placeHolderExample"),
        howDoYouSayIt = t("howDoYouSayIt"),
        howDoYouSayItExist = t("howDoYouSayItExist"),
        onlyMP3Allowed = t("onlyMP3Allowed"),
        fileSizeExceded = t("fileSizeExceded"),
        counter = i + 1;

    return <Row className="mb-3 w-100 me-0">
        <Form.Group as={Col} controlId={i}>
            <Form.Label className="text-muted fw-semibold">{phrase} {counter}</Form.Label>
            <InputGroup className="mb-3">
                <Form.Control
                    placeholder={`${placeHolderExample}: I feel you...`}
                    size="sm"
                    aria-label={`${phrase} ${counter} `}
                    isInvalid={errors["translationForm"]?.[i]?.englishPhrase}
                    {...register(`translationForm.${i}.englishPhrase`, {
                        required: true,
                        maxLength: {
                            value: 100,
                            message: "Caracteres maximos permitidos es 100"
                        },
                        minLength: {
                            value: 2,
                            message: "Caracteres minimos permitidos es 2"
                        },
                    })}
                />
                <InputGroup.Text className={
                    `bg-light p-0 ${errors["translationForm"]?.[i]?.englishPhraseAudio && "border-danger"}`
                }>
                    <Button variant="light" className="border-0 rounded-0 position-relative overflow-hidden d-flex align-items-center" type="button">
                        <IconContext.Provider value={{ className: "fs-5 text-muted" }}>
                            <FaFileAudio />
                        </IconContext.Provider>
                        <Form.Control
                            type="file"
                            size="sm"
                            accept=".mp3"
                            className="position-absolute end-0 top-0 opacity-0"
                            {...register(`translationForm.${i}.englishPhraseAudio`, {
                                required: <FaExclamation />,
                                validate: {
                                    fileSize: (v) => {
                                        let file = v[0],
                                            size = file.size,
                                            fileSize = Math.round((size / 1024));
                                        if (fileSize >= 4 * 1024) {
                                            return <FaExclamation />
                                        }
                                    },
                                    fileType: (v) => {
                                        let file = v[0],
                                            name = file.name,
                                            extension = name.split('.').pop();
                                        if (extension.toLowerCase() !== "mp3") {
                                            return <FaExclamation />
                                        }
                                    }
                                }
                            })}
                        />
                        <Form.Control.Feedback type="invalid" className={
                            errors["translationForm"]?.[i]?.englishPhraseAudio && "d-block m-0"
                        }>
                            {
                                errors["translationForm"]?.[i]?.englishPhraseAudio &&
                                errors["translationForm"]?.[i].englishPhraseAudio.message
                            }
                        </Form.Control.Feedback>
                    </Button>

                </InputGroup.Text>

                <Form.Control.Feedback type="invalid" className={errors["translationForm"]?.[i]?.englishPhrase && "d-block"}>
                    {errors["translationForm"]?.[i]?.englishPhrase &&
                        errors["translationForm"]?.[i]?.englishPhrase.message}
                </Form.Control.Feedback>

                {
                    errors["translationForm"]?.[i]?.englishPhraseAudio &&
                    errors["translationForm"]?.[i].englishPhraseAudio.type === "fileSize" &&
                    <Form.Control.Feedback type="invalid" className={errors["translationForm"]?.[i]?.englishPhraseAudio && "d-block"}>
                        {fileSizeExceded} 4MB
                    </Form.Control.Feedback>
                }
                {
                    errors["translationForm"]?.[i]?.englishPhraseAudio &&
                    errors["translationForm"]?.[i].englishPhraseAudio.type === "fileType" &&
                    <Form.Control.Feedback type="invalid" className={errors["translationForm"]?.[i]?.englishPhraseAudio && "d-block"}>
                        Solo se permite archivos MP3
                    </Form.Control.Feedback>
                }
            </InputGroup>

        </Form.Group>

        <Form.Group as={Col} controlId={i}>
            <Form.Label className="text-muted fw-semibold">{howDoYouSayIt}</Form.Label>
            <InputGroup className="mb-3">
                <Form.Control
                    isInvalid={errors["translationForm"]?.[i]?.howToSay}
                    aria-label={howDoYouSayIt}
                    size="sm"
                    {...register(`translationForm.${i}.howToSay`, {
                        required: true,
                        maxLength: {
                            value: 100,
                            message: "Caracteres maximos permitidos es 100"
                        },
                        minLength: {
                            value: 2,
                            message: "Caracteres minimos permitidos es 2"
                        },
                        validate: {
                            howDoYouSayAlreadyExist: (v) => {
                                for (const key in translationsAlreadyExist) {
                                    const howToSay = translationsAlreadyExist[key]["howToSay"]
                                    if (howToSay === v) {
                                        return false
                                    }
                                }
                            }
                        }
                    })}
                />
                <InputGroup.Text className={
                    `bg-light p-0 ${errors["translationForm"]?.[i]?.howToSayAudio && "border-danger"}`
                }>
                    <Button variant="light" className="border-0 rounded-0 position-relative overflow-hidden d-flex align-items-center" type="button">
                        <IconContext.Provider value={{ className: "fs-5 text-muted" }}>
                            <FaFileAudio />
                        </IconContext.Provider>
                        <Form.Control
                            type="file"
                            size="sm"
                            accept=".mp3"
                            className="position-absolute end-0 top-0 opacity-0"
                            {...register(`translationForm.${i}.howToSayAudio`, {
                                required: <FaExclamation />,
                                validate: {
                                    fileSize: (v) => {
                                        let file = v[0],
                                            size = file.size,
                                            fileSize = Math.round((size / 1024));
                                        if (fileSize >= 4 * 1024) {
                                            return <FaExclamation />
                                        }
                                    },
                                    fileType: (v) => {
                                        let file = v[0],
                                            name = file.name,
                                            extension = name.split('.').pop();
                                        if (extension.toLowerCase() !== "mp3") {
                                            return <FaExclamation />
                                        }
                                    }
                                }
                            })}
                        />
                        <Form.Control.Feedback type="invalid" className={
                            errors["translationForm"]?.[i]?.howToSayAudio && "d-block m-0"
                        }>
                            {errors["translationForm"]?.[i]?.howToSayAudio && errors["translationForm"]?.[i].howToSayAudio.message}
                        </Form.Control.Feedback>
                    </Button>
                </InputGroup.Text>
                <Form.Control.Feedback type="invalid" className={errors["translationForm"]?.[i]?.howToSay && "d-block"}>
                    {errors["translationForm"]?.[i]?.howToSay && errors["translationForm"]?.[i].howToSay.message}
                </Form.Control.Feedback>

                {
                    errors["translationForm"]?.[i]?.howToSayAudio &&
                    errors["translationForm"]?.[i].howToSayAudio.type === "fileSize" &&
                    <Form.Control.Feedback type="invalid" className={errors["translationForm"]?.[i]?.howToSayAudio && "d-block"}>
                        {fileSizeExceded} 4MB
                    </Form.Control.Feedback>
                }
                {
                    errors["translationForm"]?.[i]?.howToSayAudio &&
                    errors["translationForm"]?.[i].howToSayAudio.type === "fileType" &&
                    <Form.Control.Feedback type="invalid" className={errors["translationForm"]?.[i]?.howToSayAudio && "d-block"}>
                        {onlyMP3Allowed}
                    </Form.Control.Feedback>
                }
                {
                    errors["translationForm"]?.[i]?.howToSay &&
                    errors["translationForm"]?.[i].howToSay.type === "howDoYouSayAlreadyExist" &&
                    <Form.Control.Feedback type="invalid" className={errors["translationForm"]?.[i]?.howToSay && "d-block"}>
                        {howDoYouSayItExist}
                    </Form.Control.Feedback>
                }
            </InputGroup>

        </Form.Group>
    </Row>
}

export default InputsPhrases