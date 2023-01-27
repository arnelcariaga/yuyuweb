import React from 'react';
import { useRouter } from "next/router";
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import AudioPlayer from "./AudioPlayer";
import { useSelector, useDispatch } from "react-redux";
import { getCategoriesAction } from "./../Redux/categoriesDucks";

const EditCell = ({ type, row }) => {
    const dispatch = useDispatch();
    const categories = useSelector((s) => s.categoriesData.categories);
    const router = useRouter();

    React.useEffect(() => {
        dispatch(getCategoriesAction());
    }, [dispatch]);

    const fecthCategories = () => {
        const { locale } = router;
        let newCategory = categories.length > 0 && categories[0][locale]
        return newCategory.length > 0 && newCategory.map(({ _id, name }) => <option key={_id} value={_id} >{name}</option>)
    }

    if (type === "englishPhrase") {
        return <FloatingLabel
            controlId="floatingInput"
            label="Frase"
            className="m-1"
        >
            <Form.Control size='sm' type="text" value={row.englishPhrase} />
        </FloatingLabel>
    } else if (type === "howToSay") {
        return <FloatingLabel
            controlId="floatingInput"
            label="Como se dice en tu idioma"
            className="m-1"
        >
            <Form.Control size='sm' type="text" value={row.englishPhrase} />
        </FloatingLabel>
    } else if (type === "category") {
        return <Form.Select
            aria-label="Categoria"
            className='w-auto'
            defaultValue={row.category[0]._id}
            size="sm"
            onChange={() => { }}>
            {fecthCategories()}
        </Form.Select>
    }

}

const DefaultCell = ({ type, row }) => {
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
        return row.category[0].name
    } else {
        return null
    }
}



function Cell({ type, row, index, editting }) {
    return <div className="d-flex align-items-center">
        {
            index === editting?.i &&
                row._id === editting.r._id ?
                <EditCell
                    type={type}
                    row={editting.r}
                /> :
                <DefaultCell
                    type={type}
                    row={row}
                />
        }
    </div>
}
export default Cell
