
import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { FaEdit, FaTrash } from 'react-icons/fa';

 export const Eventos = () => {
  const [show, setShow] = useState(false);
  const [currentEvento, setCurrentEvento] = useState({
    id: '',
    nombre: '',
    fechaInicio: '',
    horario: '',
    descripcion: ''
  });

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleEdit = (evento) => {
    setCurrentEvento(evento);
    handleShow();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCurrentEvento((prevEvento) => ({
      ...prevEvento,
      [name]: value,
    }));
  };

  const eventos = [
    { id: 1, nombre: 'Día del Estudiante', fechaInicio: '01/06/2024', horario: '10:00 - 12:00', descripcion: 'Celebración del día del estudiante' },
    { id: 2, nombre: 'Día del Árbol', fechaInicio: '02/06/2024', horario: '10:00 - 12:00', descripcion: 'Celebración del día del árbol' },
    { id: 3, nombre: 'Día del Idioma', fechaInicio: '03/06/2024', horario: '10:00 - 12:00', descripcion: 'Celebración del día del idioma' },
  ];

  return (
<div className="container col-lg-8">
      <h2 className="mt-5">Eventos</h2>
      <Button variant="success" className="mb-3" onClick={() => handleShow()}>
        Agregar
      </Button>
      <ul className="list-group mb-4">
        {eventos.map((evento) => (
          <li key={evento.id} className="list-group-item d-flex justify-content-between align-items-center">
            <div>{evento.nombre}</div>
            <div>
              <Button variant="secondary" className="btn-sm me-2 btn-custom" onClick={() => handleEdit(evento)}>
                Editar <FaEdit />
              </Button>
              <Button variant="danger" className="btn-sm">
                <FaTrash />
              </Button>
            </div>
          </li>
        ))}
      </ul>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{currentEvento.id ? 'Editar' : 'Crear'} Evento</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <div className="mb-3">
              <label className="form-label">Nombre del evento</label>
              <input
                type="text"
                className="form-control"
                name="nombre"
                value={currentEvento.nombre}
                onChange={handleChange}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Fecha de inicio</label>
              <input
                type="text"
                className="form-control"
                name="fechaInicio"
                value={currentEvento.fechaInicio}
                onChange={handleChange}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Horario</label>
              <input
                type="text"
                className="form-control"
                name="horario"
                value={currentEvento.horario}
                onChange={handleChange}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Descripción</label>
              <input
                type="text"
                className="form-control"
                name="descripcion"
                value={currentEvento.descripcion}
                onChange={handleChange}
              />
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Guardar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};



