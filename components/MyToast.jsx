import ToastContainer from 'react-bootstrap/ToastContainer';
import Toast from 'react-bootstrap/Toast';

function MyToast({ logoTitle, timeAgo, description, onCloseToast, showToast }) {

    return (
        <ToastContainer className="p-3" position="top-end">
            <Toast show={showToast} onClose={onCloseToast}>
                <Toast.Header>
                    <strong className="me-auto">{logoTitle}</strong>
                </Toast.Header>
                <Toast.Body>{description}</Toast.Body>
            </Toast>
        </ToastContainer>
    );
}

export default MyToast;