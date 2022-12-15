import React from "react"
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import {
    FaPlusCircle,
    FaTrashAlt,
    FaUndoAlt
} from "react-icons/fa"
import { IconContext } from "react-icons"
import { useForm, useFieldArray } from "react-hook-form";
import InputsPhrases from "./InputsPhrases"
import { v4 } from "uuid";
import { useTranslation } from "next-i18next";
import { useSelector, useDispatch } from "react-redux";
import { getCategoriesAction } from "./../Redux/categoriesDucks";

let renderCount = 0;

function TranslationsForm() {
    const [numberOfInput, setNumberOfInput] = React.useState(1)
    const dispatch = useDispatch();
    const categories = useSelector((s) => s.categoriesData.categories);

    React.useEffect(() => {
        dispatch(getCategoriesAction());
    }, [dispatch]);

    const { register, handleSubmit, setValue, formState: { errors }, control } = useForm({
        defaultValues: {
            translationForm: [{
                id: v4(),
                default: true,
                englishPhrase: "",
                englishPhraseAudio: "",
                howToSay: "",
                howToSayAudio: ""
            }, {
                id: v4(),
                default: true,
                englishPhrase: "",
                englishPhraseAudio: "",
                howToSay: "",
                howToSayAudio: ""
            }]
        }
    });
    const { fields, append, remove } = useFieldArray({
        control,
        name: "translationForm",
    });
    const { t } = useTranslation("common");
    let translationsFormDescription = t("translationsFormDescription"),
        numberOfPhraseLabel = t("numberOfPhraseLabel"),
        saveTransalationBtn = t("saveTransalationBtn"),
        selectCategoryLabel = t("selectCategoryLabel");

    const addPhraseFunc = () => {
        let newArray = [];
        for (let i = 0; i < numberOfInput; i++) {
            newArray.push({
                id: v4(),
                englishPhrase: "",
                englishPhraseAudio: "",
                howToSay: "",
                howToSayAudio: ""
            })
        }
        append(newArray);
    }

    const removeField = (i) => {
        remove(i)
    }

    const resetField = (i) => {
        setValue(`translationForm.${i}.englishPhrase`, "")
        setValue(`translationForm.${i}.englishPhraseAudio`, "")
        setValue(`translationForm.${i}.howToSay`, "")
        setValue(`translationForm.${i}.howToSayAudio`, "")
    }

    const quantityInputFunc = (e) => {
        const { value } = e.target
        setNumberOfInput(parseInt(value))
    }

    async function onSubmit(data) {
        console.log(data)
    }

    renderCount++

    return (
        <div className="bg-white p-4 rounded shadow">
            <Form
                noValidate
                autoComplete="off"
                onSubmit={handleSubmit(onSubmit)}
            >
                <Row className="mb-3">
                    <Col md={8} className="d-flex flex-direction-row justify-content-between">
                        <h6 className="text-danger fw-bold small">
                            {translationsFormDescription}
                        </h6>
                    </Col>

                    <Col md={4} className="d-flex align-items-center justify-content-end">
                        <strong className="me-2 text-muted fw-bold small">{numberOfPhraseLabel}:</strong>
                        <Form.Control type="number" size="sm" min="1" onChange={quantityInputFunc} defaultValue={1} className="w-25" />
                        <Button variant="primary" size="sm" type="button" className="ms-2" onClick={addPhraseFunc}>
                            <IconContext.Provider value={{ className: "my-1" }}>
                                <FaPlusCircle />
                            </IconContext.Provider>
                        </Button>

                    </Col>
                </Row>
                <Row>
                    <Col md={4} className="mb-3">
                        <Form.Select
                            className="w-auto"
                            aria-label={selectCategoryLabel}
                            isInvalid={errors.category}
                            {...register("category", {
                                required: true
                            })}
                        >
                            <option value="">{selectCategoryLabel}</option>
                            <option value="1">One</option>
                            <option value="2">Two</option>
                            <option value="3">Three</option>
                        </Form.Select>
                    </Col>
                </Row>
                {
                    fields.map(
                        (item, i) => {
                            return <div className="d-flex align-items-center" key={i}>
                                <InputsPhrases
                                    i={i}
                                    register={register}
                                    errors={errors}
                                />
                                <div className="d-flex">
                                    <Button
                                        variant="primary"
                                        size="sm"
                                        type="button"
                                        className="me-2"
                                        onClick={() => resetField(i)}
                                    >
                                        <FaUndoAlt />
                                    </Button>

                                    <Button
                                        variant="danger"
                                        size="sm"
                                        type="button"
                                        disabled={item.default}
                                        onClick={() => removeField(i)}
                                    >
                                        <FaTrashAlt />
                                    </Button>
                                </div>
                            </div>
                        }
                    )
                }

                <Button variant="primary" size="sm" type="submit">
                    {saveTransalationBtn}
                </Button>
            </Form >
        </div >
    );
}

export default TranslationsForm;