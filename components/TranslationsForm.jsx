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
import { useRouter } from "next/router";
import MyToast from "./MyToast";
import Link from "next/link";

let renderCount = 0;

function TranslationsForm() {
    const [numberOfInput, setNumberOfInput] = React.useState(1)
    const dispatch = useDispatch();
    const categories = useSelector((s) => s.categoriesData.categories);
    const router = useRouter();
    const [translationsAlreadyExist, setTranslationsAlreadyExist] = React.useState([])
    const [addTranslationsStatus, setAddTranslationsStatus] = React.useState()
    const [showToast, setShowToast] = React.useState(false)
    const [disableBTNSave, setDisableBTNSave] = React.useState(false)

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
        selectCategoryLabel = t("selectCategoryLabel"),
        translationsAddedSuccessFully = t("translationsAddedSuccessFully"),
        serverErrorMsg = t("serverErrorMsg"),
        translations = t("translations"),
        seeTranslations = t("seeTranslations");

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
        setDisableBTNSave(true)
        const { translationForm, category } = data
        let fd = new FormData()

        for (let i = 0; i < translationForm.length; i++) {
            const ele = translationForm[i];
            let englishPhraseAudio = ele["englishPhraseAudio"][0],
                howToSayAudio = ele["howToSayAudio"][0];

            fd.append("englishPhraseAudio", englishPhraseAudio)
            fd.append("howToSayAudio", howToSayAudio)
        }

        fd.append("category", category)
        fd.append("translationForm", JSON.stringify(translationForm))

        const response = await fetch('/api/addTranslations', {
            method: 'POST',
            body: fd
        })

        const resData = await response.json(),
            code = resData.data.code;

        if (code === "already_exist") {
            const getTranslationsAlreadyExist = resData.data.translationsAlreadyExist
            setTranslationsAlreadyExist(getTranslationsAlreadyExist)
            setDisableBTNSave(false)
        } else if (code === "translations_added") {
            setAddTranslationsStatus(translationsAddedSuccessFully)
            setShowToast(true)
            setDisableBTNSave(false)
        } else {
            setAddTranslationsStatus(serverErrorMsg)
            setShowToast(true)
            setDisableBTNSave(false)
        }

    }

    const fecthCategories = () => {
        const { locale } = router;
        let newCategory = categories.length > 0 && categories[0][locale]
        return newCategory.length > 0 && newCategory.map(({ _id, name, index }) => <option key={_id} value={JSON.stringify({ _id, name, index })} >{name}</option>)
    }

    renderCount++

    return (
        <div className="bg-white p-4 rounded shadow">
            <MyToast
                logoTitle={`YuYu || ${translations}`}
                description={addTranslationsStatus}
                onCloseToast={() => setShowToast(!showToast)}
                showToast={showToast}
            />
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
                            {fecthCategories()}
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
                                    translationsAlreadyExist={translationsAlreadyExist}
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

                <Row>
                    <Col className="d-flex justify-content-between">
                        <Button variant="primary" size="sm" type="submit" disabled={disableBTNSave}>
                            {saveTransalationBtn}
                        </Button>

                        <Link href="/translations">
                            <Button variant="success" size="sm" type="button">
                                {seeTranslations}
                            </Button>
                        </Link>
                    </Col>
                </Row>

            </Form >
        </div >
    );
}

export default TranslationsForm;