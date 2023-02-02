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
} from "react-icons/fa"
import { useForm } from "react-hook-form";
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';

const DeleteModal = ({
    title,
    body,
    showDeleteRowModal,
    setShowDeleteRowModal,
    confirmDelete,
    disabled }) => {
    return <Modal show={showDeleteRowModal} onHide={setShowDeleteRowModal}>
        <Modal.Header closeButton>
            <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{body}</Modal.Body>
        <Modal.Footer>
            <Button variant="secondary" onClick={setShowDeleteRowModal}>
                Cancelar
            </Button>
            <Button variant="danger" disabled={disabled} onClick={confirmDelete}>
                Eliminar
            </Button>
        </Modal.Footer>
    </Modal>
}

function TranslationsDataTable({ seeTranslations }) {
    const dispatch = useDispatch();
    const translations = useSelector((s) => s.translationsData.translations);
    const { t } = useTranslation("common");
    let addTranslations = t("addTranslations"),
        noDataTableFound = t("noDataTableFound"),
        phrase = t("phrase"),
        phraseTranslatedOnYourLang = t("phraseTranslatedOnYourLang");
    const [translationsData, setTranslationsData] = React.useState([])
    const [columns, setColumns] = React.useState([])
    const [editting, setEditting] = React.useState(null)
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const [showDeleteRowModal, setShowDeleteRowModal] = React.useState(false);
    const [deleteTranslationModalBTNStatus, setDeleteTranslationModalBTNStatus] = React.useState(false);

    React.useEffect(() => {
        dispatch(getTranslationsAction());
    }, [dispatch]);

    React.useEffect(() => {
        setTranslationsData(translations)
    }, [translations]);

    React.useEffect(() => setColumns([
        {
            name: phrase,
            sortable: true,
            selector: (r) => r.englishPhrase,
            cell: (r, i) => <Cell type="englishPhrase" i={i} r={r} editting={editting} register={register} errors={errors} />
        },
        {
            name: phraseTranslatedOnYourLang,
            sortable: true,
            selector: (r) => r.howToSay,
            cell: (r, i) => <Cell type="howToSay" i={i} r={r} editting={editting} register={register} errors={errors} />
        },
        {
            name: "Categoria",
            sortable: true,
            selector: (r) => r.category[0]._id,
            cell: (r, i) => <Cell type="category" i={i} r={r} editting={editting} register={register} errors={errors} />
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

                async function onSubmit(data) {
                    console.log(data)
                }

                const confirmDelete = async () => {
                    setDeleteTranslationModalBTNStatus(true)
                    const fetchTranslations = await fetch("/api/deleteTranslation", {
                        method: "POST",
                        body: JSON.stringify({
                            data: r
                        })
                    })
                    const translationJSON = await fetchTranslations.json()

                    if (translationJSON.code === "translation_deleted") {
                        const data = translationsData.filter((item) => item._id !== r._id)
                        setTranslationsData(data)
                        setShowDeleteRowModal(!showDeleteRowModal.showModal)
                        setDeleteTranslationModalBTNStatus(false)
                    }
                }

                if (editting?.i === i) {
                    return <Form
                        className="my-1"
                        noValidate
                        autoComplete="off"
                        onSubmit={handleSubmit(onSubmit)}
                    >
                        <Cell type="actions" i={i} r={r} editting={editting} register={register} errors={errors} closeEditting={() => setEditting(null)} />
                    </Form>
                }
                return <>
                    {
                        showDeleteRowModal?.i === i && <DeleteModal
                            title="La siguiente traduccion se eliminara"
                            body={<>
                                Frase: {r.englishPhrase} <br />
                                En tu idioma: {r.howToSay} <br />
                                <strong>Nota:</strong> Se eliminara en la base de datos incluyendo los archivos mp3 de dicha taduccion
                            </>
                            }
                            showDeleteRowModal={showDeleteRowModal.showModal}
                            setShowDeleteRowModal={() => setShowDeleteRowModal(!showDeleteRowModal.showModal)}
                            confirmDelete={confirmDelete}
                            disabled={deleteTranslationModalBTNStatus}
                        />
                    }
                    <Button variant="success" size="sm" className="me-2" onClick={() => {
                        //setEditting({ r, i })
                        alert("Para version beta")
                    }}><FaEdit /></Button>
                    <Button variant="danger" size="sm" onClick={() => setShowDeleteRowModal({ r, i, showModal: true })}><FaTrash /></Button>
                </>
            }
        },
    ]), [
        phrase,
        phraseTranslatedOnYourLang,
        editting,
        handleSubmit,
        register,
        errors,
        showDeleteRowModal,
        deleteTranslationModalBTNStatus,
        translationsData
    ])

    return <>
        <Link href="/dashboard">
            <Button size="sm" type="button" className="float-end mb-2">
                {addTranslations}
            </Button>
        </Link>

        <DataTable
            columns={columns}
            data={translationsData}
            noDataComponent={noDataTableFound}
            pagination
            fixedHeader
            highlightOnHover
            dense
            selectAllRowsItem
            keyField="_id"
            title={seeTranslations}
        />
    </>
}
export default TranslationsDataTable