import React from "react"
import DataTable from 'react-data-table-component';
import { useSelector, useDispatch } from "react-redux";
import { getTranslationsAction } from "./../Redux/translationsDuck";
import Button from 'react-bootstrap/Button';
import Link from "next/link";
import { useTranslation } from "next-i18next";
import moment from "moment"
import Cell from "./Cell";
import {
    FaEdit,
    FaTrash,
    FaRegWindowClose,
    FaRegSave
} from "react-icons/fa"

function TranslationsDataTable() {
    const dispatch = useDispatch();
    const translations = useSelector((s) => s.translationsData.translations);
    const { t } = useTranslation("common");
    let addTranslations = t("addTranslations"),
        noDataTableFound = t("noDataTableFound"),
        phrase = t("phrase"),
        phraseTranslatedOnYourLang = t("phraseTranslatedOnYourLang");
    const [editting, setEditting] = React.useState(null)

    React.useEffect(() => {
        dispatch(getTranslationsAction());
    }, [dispatch]);

    const columns = React.useMemo(() => [
        {
            name: phrase,
            sortable: true,
            selector: (r) => r.englishPhrase,
            cell: (r, i) => <Cell type="englishPhrase" editting={editting} index={i} row={r} />
        },
        {
            name: phraseTranslatedOnYourLang,
            sortable: true,
            selector: (r) => r.howToSay,
            cell: (r, i) => <Cell type="howToSay" editting={editting} index={i} row={r} />
        },
        {
            name: "Categoria",
            sortable: true,
            selector: (r) => r.category[0]._id,
            cell: (r, i) => <Cell type="category" editting={editting} index={i} row={r} />
        },
        {
            name: "Agregado por",
            sortable: true,
            selector: (r) => r.addedBy[0].username + `(${r.addedBy[0].userType === 2 ? "Admin" : "Usuario"})`
        },
        {
            name: "Agregado el",
            sortable: true,
            selector: (r) => r.createdAt,
            format: (r) => moment(r.createdAt).format('DD/MM/YYYY, h:mm a')
        },
        {
            name: "Acciones",
            cell: (r, i) => {
                if(editting?.i === i){
                    return <div className="m-1">
                    <Button variant="outline-success" size="sm" className="me-2" onClick={() => {}}><FaRegSave /></Button>
                    <Button variant="outline-danger" size="sm"><FaRegWindowClose /></Button>
                </div>
                }
                return <div className="m-1">
                    <Button variant="success" size="sm" className="me-2" onClick={() => setEditting({ r, i })}><FaEdit /></Button>
                    <Button variant="danger" size="sm"><FaTrash /></Button>
                </div>
            }
        },
    ], [phrase, phraseTranslatedOnYourLang, editting])

    return <>
        <Link href="/dashboard">
            <Button size="sm" type="button" className="float-end mb-2">
                {addTranslations}
            </Button>
        </Link>

        <DataTable
            columns={columns}
            data={translations}
            noDataComponent={noDataTableFound}
            pagination
            fixedHeader
            highlightOnHover
            dense
        />
    </>
}
export default TranslationsDataTable