import React from "react"
import DataTable from 'react-data-table-component';
import { useSelector, useDispatch } from "react-redux";
import { getTranslationsAction } from "./../Redux/translationsDuck";
import Button from 'react-bootstrap/Button';
import Link from "next/link";
import { useTranslation } from "next-i18next";
import AudioPlayer from "./AudioPlayer";
import moment from "moment"
import {
    FaEdit,
    FaTrash
} from "react-icons/fa"

const Cell = ({ row, type }) => {
    const Element = () => {
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
        }
    }
    return <div className="d-flex align-items-center">
        <Element />
    </div>
}

const Columns = (t) => {
    let phrase = t("phrase"),
        phraseTranslatedOnYourLang = t("phraseTranslatedOnYourLang");
    const columns = [
        {
            name: phrase,
            sortable: true,
            selector: (row) => row.englishPhrase,
            cell: (row) => <Cell type="englishPhrase" row={row} />
        },
        {
            name: phraseTranslatedOnYourLang,
            sortable: true,
            selector: (row) => row.howToSay,
            cell: (row) => <Cell type="howToSay" row={row} />
        },
        {
            name: "Categoria",
            sortable: true,
            selector: (row) => row.category[0]._id,
            cell: (row) => row.category[0].name
        },
        {
            name: "Agregado por",
            sortable: true,
            selector: (row) => row.addedBy[0].username + `(${row.addedBy[0].userType === 2 ? "Admin" : "Usuario"})`
        },
        {
            name: "Agregado el",
            sortable: true,
            selector: (row) => row.createdAt,
            format: (row) => moment(row.createdAt).format('DD/MM/YYYY, h:mm a')
        },
        {
            name: "Acciones",
            sortable: true,
            cell: (row) => {
                return <>
                    <Button variant="success" size="sm" className="me-2"><FaEdit /></Button>
                    <Button variant="danger" size="sm"><FaTrash /></Button>
                </>
            }
        },
    ];
    return { columns }
}

function TranslationsDataTable() {
    const dispatch = useDispatch();
    const translations = useSelector((s) => s.translationsData.translations);
    const { t } = useTranslation("common");
    let addTranslations = t("addTranslations"),
        noDataTableFound = t("noDataTableFound");
    const { columns } = Columns(t)

    React.useEffect(() => {
        dispatch(getTranslationsAction());
    }, [dispatch]);

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
        />
    </>
}
export default TranslationsDataTable