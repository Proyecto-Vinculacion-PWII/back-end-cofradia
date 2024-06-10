import React, { useState, useEffect } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { FaEdit, FaTrash, FaPlus } from 'react-icons/fa';
import { collection, getDocs, deleteDoc, doc, updateDoc, addDoc } from 'firebase/firestore/lite';
import { db } from '../firebase/config';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { Timestamp } from 'firebase/firestore/lite';


const MySwal = withReactContent(Swal);

export const Cursos = () => {
  const [cursos, setCursos] = useState([]);
  const [show, setShow] = useState(false);
  const [currentCurso, setCurrentCurso] = useState({
    id: '',
    nombre: '',
    fechaInicio: '',
    dias: '',
    horario: '',
    descripcion: '',
    imagen: ''
  });
  const cursosCollection = collection(db, "Cursos");

  const getCursos = async () => {
    const data = await getDocs(cursosCollection);
    const cursoData = data.docs.map(doc => ({
      id: doc.id,
      nombre: doc.data().nombre,
      fechaInicio: doc.data().fechaInicio.toDate().toISOString().slice(0, 16),
      dias: doc.data().dias,
      horario: doc.data().horario,
      descripcion: doc.data().descripcion,
      imagen: doc.data().imagen
    }));
    setCursos(cursoData);
  };

  const deleteCursos = async (id) => {
    const cursoDoc = doc(db, "Cursos", id);
    await deleteDoc(cursoDoc);
    getCursos();
  };



  const handleShow = () => {
    setCurrentCurso({
      id: '',
      nombre: '',
      fechaInicio: '',
      dias: '',
      horario: '',
      descripcion: '',
      imagen: ''
    });
    setShow(true);
  };

  const handleClose = () => setShow(false);

 const confirmDelete = (id) => {
    MySwal.fire({
      title: "Eliminar el Curso?",
      text: "No podrás revertir esto!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, eliminar!"
    }).then((result) => {
      if (result.isConfirmed) {
        deleteCursos(id);
        Swal.fire({
          title: "Eliminado!",
          text: "El curso ha sido eliminado.",
          icon: "success"
        });
      }
    });
  };

  const handleEdit = (curso) => {
    setCurrentCurso(curso);
    setShow(true);
  };
  const handleSave = async () => { 
    if (!currentCurso.nombre || !currentCurso.fechaInicio || !currentCurso.dias || !currentCurso.horario || !currentCurso.descripcion || !currentCurso.imagen) {
      MySwal.fire({
        title: 'Error',
        text: 'Por favor, llene todos los campos',
        icon: 'error'
      });
      return;
    }

    
    const newCurso = {
      ...currentCurso,
      fechaInicio: Timestamp.fromDate(new Date(currentCurso.fechaInicio))
    };


 

    if (newCurso.id) {
      const cursoDoc = doc(db, "Cursos", newCurso.id);
      try {
        await updateDoc(cursoDoc, newCurso);
        Swal.fire({
          title: "Guardado!",
          text: "Tus cambios han sido guardados.",
          icon: "success"
        });
      } catch (error) {
        console.error("Error updating document: ", error);
      }
    } else {
      try {
        await addDoc(cursosCollection, newCurso);
        Swal.fire({
          title: "Añadido!",
          text: "Tu Curso ha sido añadido.",
          icon: "success"
        });
      } catch (error) {
        console.error("Error adding document: ", error);
      }
    }

    setShow(false);
    getCursos();
  };

  useEffect(() => {
    getCursos();
  }, []);
  

  return (
    <div className="container col-lg-8">
      <h2 className="mt-5">Cursos</h2>
      <Button variant="success" className="mb-3" onClick={() => handleShow()}>
         <FaPlus/>
      </Button>
      <ul className="list-group mt-5">
        {cursos.map((curso) => (
          <li key={curso.id} className="list-group-item d-flex justify-content-between align-items-center">
            <div>{curso.nombre}</div>
            <div>
              <Button variant="warning" className="btn-sm " style={{ marginRight: '5px' }} onClick={() => handleEdit(curso)}>
                     <FaEdit />
              </Button>
              <Button variant="danger" className="btn-sm" onClick={() => confirmDelete(curso.id)}>
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
           
            </div>
            <div className="mb-3">
              <label className="form-label">Nombre</label>
              <input
                type="text"
                className="form-control"
                name="nombre"
                value={currentCurso.nombre}
                onChange={(e) => setCurrentCurso({ ...currentCurso, nombre: e.target.value })}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Descripción</label>
              <textarea
                type="text"
                className="form-control"
                name="descripcion"
                rows="4"
                value={currentCurso.descripcion}
                onChange={(e) => setCurrentCurso({ ...currentCurso, descripcion: e.target.value })}
             
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Fecha de inicio</label>
              <input
                type="text"
                className="form-control"
                name="fechaInicio"
                value={currentCurso.fechaInicio}
                onChange={(e) => setCurrentCurso({ ...currentCurso, fechaInicio: e.target.value })}
                />
            </div>
            <div className="mb-3">
              <label className="form-label">Días</label>
              <input
                type="text"
                className="form-control"
                name="dia"
                value={currentCurso.dias}
                onChange={(e) => setCurrentCurso({ ...currentCurso, dias: e.target.value })}
                />
            </div>
            <div className="mb-3">
              <label className="form-label">Horario</label>
              <input
                type="text"
                className="form-control"
                name="horario"
                value={currentCurso.horario}
                onChange={(e) => setCurrentCurso({ ...currentCurso, horario: e.target.value })}
                />
            </div>
            <div className="mb-3">
                <label className="form-label">URL de la Imagen</label>
                <input
                  type="text"
                  className="form-control"
                  name="imagen"
                  value={currentCurso.imagen}
                  onChange={(e) => setCurrentCurso({ ...currentCurso, imagen: e.target.value })}
                />
              </div>
           
          </form>
        </Modal.Body>
        <Modal.Footer>
            <Button variant="danger" onClick={handleClose}>
              Cancelar
            </Button>
            <Button variant="success" onClick={handleSave}>
              Guardar
            </Button>
          </Modal.Footer>
      </Modal>
    </div>
  );
};

