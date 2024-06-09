import { uploadfile } from "../firebase/config";
import { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Form, Button, Alert, Row, Col } from 'react-bootstrap';
import { FaCloudUploadAlt, FaCopy } from 'react-icons/fa';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);

const UploadFiles = () => {

    const [file, setFile] = useState(null);
    const [uploadedUrl, setUploadedUrl] = useState('');
    const [showAlert, setShowAlert] = useState(false);
    const [copyButtonText, setCopyButtonText] = useState('URL Imagen');

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!file) {
            return;
        }

        try {
            const url = await uploadfile(file);
            setUploadedUrl(url);
            setShowAlert(true);
            MySwal.fire({
                title: 'Éxito',
                text: 'El archivo se ha subido correctamente',
                icon: 'success',
            });
        } catch (error) {
            console.error(error);
            MySwal.fire({
                title: 'Error',
                text: 'Fallo interno, intente más tarde',
                icon: 'error',
            });
        } finally {
            setFile(null); // Limpiar el campo de archivo después de enviar
        }
    };

    const handleCopyUrl = () => {
        navigator.clipboard.writeText(uploadedUrl);
        setCopyButtonText('Url Copiado');
        setTimeout(() => setCopyButtonText('URL Imagen'), 2000); // Volver al texto original después de 2 segundos
    };

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
        setUploadedUrl('');
        setShowAlert(false);
    };


    return (
        <>
            <Container className="mb-5"> {/* Agregado espaciado aquí */}
                <Row className="justify-content-center">
                    <Col md={10} lg={6}>
                        <Form onSubmit={handleSubmit}>
                            <Form.Group controlId="formFile" className="mb-3">
                                <Form.Label>Subir archivo</Form.Label>
                                <Form.Control type="file" onChange={handleFileChange} />
                            </Form.Group>
                            <Button variant="primary" type="submit" disabled={!file} className="w-100 mb-3">
                                <FaCloudUploadAlt /> Subir
                            </Button>
                        </Form>
                        {showAlert && (
                            <Alert variant="success" className="mt-3">
                                <div className="d-flex justify-content-between align-items-center">
                                    <span>URL Imagen:</span>
                                    <Button variant="primary" onClick={handleCopyUrl} disabled={!uploadedUrl}>
                                        {copyButtonText} <FaCopy />
                                    </Button>
                                </div>
                            </Alert>
                        )}
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default UploadFiles;
