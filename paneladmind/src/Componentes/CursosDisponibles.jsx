import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { FaEdit, FaTrash } from 'react-icons/fa';

export const Cursos = () => {
  const [show, setShow] = useState(false);
  const [currentCurso, setCurrentCurso] = useState({
    id: '',
    nombre: '',
    rubro: '',
    fechaInicio: '',
    dia: '',
    horario: '',
    descripcion: ''
  });

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleEdit = (curso) => {
    setCurrentCurso(curso);
    handleShow();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCurrentCurso((prevCurso) => ({
      ...prevCurso,
      [name]: value,
    }));
  };

  const cursos = [
    { id: 1, nombre: 'Word', rubro: 'Ofimática', fechaInicio: '01/06/2024', dia: 'Lunes', horario: '10:00 - 12:00', descripcion: 'Curso de Word' },
    { id: 2, nombre: 'Excel', rubro: 'Ofimática', fechaInicio: '02/06/2024', dia: 'Martes', horario: '10:00 - 12:00', descripcion: 'Curso de Excel' },
    { id: 3, nombre: 'PowerPoint', rubro: 'Ofimática', fechaInicio: '03/06/2024', dia: 'Miércoles', horario: '10:00 - 12:00', descripcion: 'Curso de PowerPoint' },
  ];

  

  return (
    <div className="container col-lg-8">
      <h2 className="mt-5">Cursos</h2>
      <Button variant="success" className="mb-3" onClick={() => handleShow()}>
        Agregar
      </Button>
      <ul className="list-group mt5">
        {cursos.map((curso) => (
          <li key={curso.id} className="list-group-item d-flex justify-content-between align-items-center">
            <div>{curso.nombre}</div>
            <div>
              <Button variant="secondary" className="btn-sm me-2 btn-custom" onClick={() => handleEdit(curso)}>
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
          <Modal.Title>{currentCurso.id ? 'Editar' : 'Crear'} Curso</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <div className="mb-3">
              <label className="form-label">Rubro</label>
              <input
                type="text"
                className="form-control"
                name="rubro"
                value={currentCurso.rubro}
                onChange={handleChange}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Nombre del curso</label>
              <input
                type="text"
                className="form-control"
                name="nombre"
                value={currentCurso.nombre}
                onChange={handleChange}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Fecha de inicio</label>
              <input
                type="text"
                className="form-control"
                name="fechaInicio"
                value={currentCurso.fechaInicio}
                onChange={handleChange}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Día</label>
              <input
                type="text"
                className="form-control"
                name="dia"
                value={currentCurso.dia}
                onChange={handleChange}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Horario</label>
              <input
                type="text"
                className="form-control"
                name="horario"
                value={currentCurso.horario}
                onChange={handleChange}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Descripción</label>
              <input
                type="text"
                className="form-control"
                name="descripcion"
                value={currentCurso.descripcion}
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

