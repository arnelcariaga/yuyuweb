import React from 'react';
import { useRouter } from "next/router";
import Form from "react-bootstrap/Form";
import { useSelector, useDispatch } from "react-redux";
import { getLangsAction } from "../Redux/langsDucks";

function ChangeLocale() {
    const dispatch = useDispatch();
    const langs = useSelector((s) => s.langsData.langs);
    const router = useRouter();

    React.useEffect(() => {
        dispatch(getLangsAction());
    }, [dispatch]);

    const onToggleLanguageClick = (newLocale) => {
        let locale = newLocale.target.value;
        const { pathname, asPath, query } = router;
        router.push({ pathname, query }, asPath, { locale });
    }

    return <Form.Select
        aria-label="Seleccionar idioma"
        className='w-auto shadow-lg'
        value={router.locale}
        size="sm"
        onChange={onToggleLanguageClick}>
        {langs.map(({ _id, name, abb }) => <option key={_id} value={abb}>{name}</option>)}
    </Form.Select>
}

export default ChangeLocale