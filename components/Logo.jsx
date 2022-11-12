import Col from "react-bootstrap/Col"
import { useTranslation, Trans } from 'next-i18next'
function Logo() {
    const { t } = useTranslation('logo')
    return <Col md={6} className="text-center">
        <h1 className="text-white">
            YuYu
        </h1>
        <h6 className="text-white fw-bold fs-5">
            Aprende ingl&eacute;s del d&iacute;a a d&iacute;a sin estudiar gram&aacute;tica.
        </h6>
        <Trans i18nKey='logo'>
            Then you may have a look at <a href={t('blog.optimized.link')}>this blog post</a>.
        </Trans>
    </Col>
}
export default Logo