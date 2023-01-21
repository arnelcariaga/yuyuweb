import React from "react"
import DataTable from 'react-data-table-component';
import { useSelector, useDispatch } from "react-redux";
import { getTranslationsAction } from "./../Redux/translationsDuck";
import Button from 'react-bootstrap/Button';
import Link from "next/link";
import { useTranslation } from "next-i18next";
import { FaPlayCircle, FaPauseCircle } from "react-icons/fa"

const audioInstance = (audio) => {
    return new Audio(audio);
}

const Cell = ({ row }) => {
    const [newData, setNewData] = React.useState([{
        ...row,
        isPlaying: false
    }])

    let audio = new Audio(newData.englishPhraseAudio);

    const playFunction = (id) => {
        if (audio.paused) {
            audio.play();
            const newItem = newData.find(item => item._id === id).isPlaying = !row.isPlaying
            console.log("newItem", newItem)
            //setNewData(newItem)
        } else {
            audio.pause();
            const newItem = newData.find(item => item._id === id).isPlaying = !row.isPlaying
        }
    }

    console.log(newData)

    return <div className="d-flex align-items-center" data-tag="allowRowEvents">
        {row.englishPhrase}
        <Button
            variant="default"
            type="button"
            className="rounded-circle p-0 ms-2"
            data-tag="allowRowEvents"
            onClick={() => playFunction(row._id)}>
            klk
            {
                //newRowData.isPlaying ? <FaPauseCircle /> : <FaPlayCircle />
            }
        </Button>
    </div>
}

const Columns = (t) => {
    let phrase = t("phrase"),
        phraseTranslatedOnYourLang = t("phraseTranslatedOnYourLang");

    const data = [
        {
            name: phrase,
            sortable: true,
            cell: (row) => <Cell row={row} />
        },
        {
            name: phraseTranslatedOnYourLang,
            sortable: true,
            cell: (row, index, column, id) => {
                var audio = new Audio(row.howToSayAudio);
                return <div className="d-flex align-items-center">
                    {row.englishPhrase}
                    <Button
                        variant="default"
                        type="button"
                        className="rounded-circle p-0 ms-2"
                        onClick={() => {
                            if (audio.paused) {
                                audio.play();
                            } else {
                                audio.pause();
                            }
                        }}>
                        <FaPlayCircle />
                    </Button>
                </div>
            }
        },
    ];

    return data
}

function TranslationsDataTable() {
    const dispatch = useDispatch();
    const translations = useSelector((s) => s.translationsData.translations);
    const { t } = useTranslation("common");
    let addTranslations = t("addTranslations"),
        noDataTableFound = t("noDataTableFound");

    const [audios, setAudios] = React.useState([])

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
            columns={Columns(t)}
            data={translations}
            noDataComponent={noDataTableFound}
        />
    </>
}
export default TranslationsDataTable