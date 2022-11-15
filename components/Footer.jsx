import Col from "react-bootstrap/Col"
import { useTranslation } from 'next-i18next'
function Footer() {
    const { t } = useTranslation('footer')
    return <Col className="text-center">
        <span className="fw-semibold">
            &copy; 2022 YuYu.com. {t("copyRightsText")}
        </span>
    </Col>
}
export default Footer