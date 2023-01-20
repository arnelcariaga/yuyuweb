import React from "react"
import DataTable from 'react-data-table-component';
import { useSelector, useDispatch } from "react-redux";
import { getTranslationsAction } from "./../Redux/translationsDuck";
import Button from 'react-bootstrap/Button';

const columns = [
    {
        name: 'Frase en ingles',
        cell: (row, index, column, id) => {
            var audio = new Audio(row.englishPhraseAudio);
            console.log(audio.ENTITY_REFERENCE_NODE)
            return <div>
                {row.englishPhrase}
                <br />
                <Button variant="success" size="sm" type="button" onClick={() => {
                    if (audio.paused) {
                        audio.play();
                    } else {
                        audio.pause();
                    }
                }}>
                    PLya
                </Button>
            </div>
        }
    },
    {
        name: 'Traducido a tu idioma',
        cell: (row, index, column, id) => {
            return <div>
                {row.howToSay}
                {row.howToSayAudio}
            </div>
        }
    },
];

function TranslationsDataTable() {
    const dispatch = useDispatch();
    const translations = useSelector((s) => s.translationsData.translations);

    React.useEffect(() => {
        dispatch(getTranslationsAction());
    }, [dispatch]);

    return <DataTable
        columns={columns}
        data={translations}
    />
}
export default TranslationsDataTable