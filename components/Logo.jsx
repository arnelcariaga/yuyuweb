import Col from "react-bootstrap/Col"
import { useTranslation } from 'next-i18next'
function Logo() {
    const { t } = useTranslation('logo')
    return <Col md={6} className="text-center">
        <h1 className="text-white">
            YuYu
        </h1>
        <h6 className="text-white fw-bold fs-5">
            {t('slogan')}
        </h6>

    </Col>
}
export default Logo