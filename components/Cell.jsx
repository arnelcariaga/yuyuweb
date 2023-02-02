import React from 'react';
import { useRouter } from "next/router";
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import AudioPlayer from "./AudioPlayer";
import { useSelector, useDispatch } from "react-redux";
import { getCategoriesAction } from "./../Redux/categoriesDucks";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import {
    FaEdit,
    FaTrash,
    FaRegWindowClose,
    FaRegSave
} from "react-icons/fa"

const EditCell = ({ type, categories, locale, editting, closeEditting, errors, register }) => {

    console.log(errors)

    const fecthCategories = () => {
        let newCategory = categories.length > 0 && categories[0][locale]
        return newCategory.length > 0 && newCategory.map(({ _id, name, index }) => <option key={_id} data-id={_id} value={index} >{name}</option>)
    }

    const Inputs = () => {
        if (type === "englishPhrase") {
            return <Form.Control
                size='sm'
                type="text"
                isInvalid={errors.englishPhrase}
                defaultValue={editting.r.englishPhrase}
                {...register("englishPhrase", {
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
        } else if (type === "howToSay") {
            return <Form.Control
                size='sm'
                type="text"
            />
        } else if (type === "category") {
            return <Form.Select
                aria-label="Categoria"
                className='w-auto'
                size="sm"
            >
                {fecthCategories()}
            </Form.Select>
        } else if (type === "actions") {
            return <>
                <Button variant="outline-success" size="sm" className="me-2" type="submit"><FaRegSave /></Button>
                <Button variant="outline-danger" size="sm" onClick={closeEditting}><FaRegWindowClose /></Button>
            </>
        }
    }

    return <Inputs />

}

const DefaultCell = ({ type, r, categories, locale }) => {
    if (type === "englishPhrase") {
        return <>
            {r.englishPhrase}
            <AudioPlayer url={r.englishPhraseAudio} />
        </>
    } else if (type === "howToSay") {
        return <>
            {r.howToSay}
            <AudioPlayer url={r.howToSayAudio} />
        </>
    } else if (type === "category") {
        let newCategory = categories.length > 0 && categories[0][locale]
        return newCategory.length > 0 && newCategory.map(({ index, name }) => index === r.category[0].index && name)
    }
}

function Cell({ type, r, i, editting, closeEditting, register, errors }) {
    const dispatch = useDispatch();
    const categories = useSelector((s) => s.categoriesData.categories);
    const router = useRouter();
    const { locale } = router;

    React.useEffect(() => {
        dispatch(getCategoriesAction());
    }, [dispatch]);

    return <div className="d-flex align-items-center">
        {
            i === editting?.i ?
                <EditCell
                    type={type}
                    categories={categories}
                    locale={locale}
                    editting={editting}
                    closeEditting={closeEditting}
                    errors={errors}
                    register={register}
                /> :
                <DefaultCell
                    type={type}
                    r={r}
                    categories={categories}
                    locale={locale}
                />
        }
    </div>
}
export default Cell
