import React from 'react';
import { useRouter } from "next/router";
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import AudioPlayer from "./AudioPlayer";
import { useSelector, useDispatch } from "react-redux";
import { getCategoriesAction } from "./../Redux/categoriesDucks";

const EditCell = ({ type, row, categories, locale }) => {
    const fecthCategories = () => {
        let newCategory = categories.length > 0 && categories[0][locale]
        return newCategory.length > 0 && newCategory.map(({ _id, name, index }) => <option key={_id} data-id={_id} value={index} >{name}</option>)
    }

    if (type === "englishPhrase") {
        return <Form.Control size='sm' type="text" value={row.englishPhrase} />
    } else if (type === "howToSay") {
        return <Form.Control size='sm' type="text" value={row.englishPhrase} />
    } else if (type === "category") {
        return <Form.Select
            aria-label="Categoria"
            className='w-auto'
            value={row.category[0].index}
            size="sm"
            onChange={() => { }}>
            {fecthCategories()}
        </Form.Select>
    }

}

const DefaultCell = ({ type, row, categories, locale }) => {
    if (type === "englishPhrase") {
        return <>
            {row.englishPhrase}
            <AudioPlayer url={row.englishPhraseAudio} />
        </>
    } else if (type === "howToSay") {
        return <>
            {row.howToSay}
            <AudioPlayer url={row.howToSayAudio} />
        </>
    } else if (type === "category") {
        let newCategory = categories.length > 0 && categories[0][locale]
        return newCategory.length > 0 && newCategory.map(({index, name}) => index === row.category[0].index && name)
    } else {
        return null
    }
}

function Cell({ type, row, index, editting }) {
    const dispatch = useDispatch();
    const categories = useSelector((s) => s.categoriesData.categories);
    const router = useRouter();
    const { locale } = router;

    React.useEffect(() => {
        dispatch(getCategoriesAction());
    }, [dispatch]);

    return <div className="d-flex align-items-center">
        {
            index === editting?.i &&
                row._id === editting.r._id ?
                <EditCell
                    type={type}
                    row={editting.r}
                    categories={categories}
                    locale={locale}
                /> :
                <DefaultCell
                categories={categories}
                locale={locale}
                    type={type}
                    row={row}
                />
        }
    </div>
}
export default Cell
