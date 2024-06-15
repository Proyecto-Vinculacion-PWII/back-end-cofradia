
import React, { useState, useEffect } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { FaEdit, FaTrash, FaPlus } from 'react-icons/fa';
import { collection, getDocs, deleteDoc, doc, updateDoc, addDoc } from 'firebase/firestore/lite';
import { db } from '../firebase/config';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { Timestamp } from 'firebase/firestore/lite';
import '../styles/StyleEvents.css';


const MySwal = withReactContent(Swal);

export const Eventos = () => {
  const [events, setEvents] = useState([]);
  const [show, setShow] = useState(false);
  const [currentEvento, setCurrentEvento] = useState({
    id: '',
    nombre: '',
    fechaInicio: '',
    horario: '',
    descripcion: '',
    imagen: ''
  });

  const EventsCollection = collection(db, "Eventos");

  const getEvents = async () => {
    const data = await getDocs(EventsCollection);
    const eventData = data.docs.map(doc => ({
      id: doc.id,
      nombre: doc.data().nombre,
      descripcion: doc.data().descripcion,
      fechaInicio: doc.data().fechaInicio.toDate().toISOString().slice(0, 10),
      horario: doc.data().horario,
      imagen: doc.data().imagen
    }));
    setEvents(eventData);
  };

  const deleteEvent = async (id) => {
    const eventDoc = doc(db, "Eventos", id);
    await deleteDoc(eventDoc);
    getEvents();
  };

  const handleShow = () => {
    setCurrentEvento({
      id: '',
      nombre: '',
      fechaInicio: '',
      horario: '',
      descripcion: '',
      imagen: ''
    });
    setShow(true);
  };

  const handleClose = () => setShow(false);

  const confirmDelete = (id) => {
    MySwal.fire({
      title: "Eliminar el evento?",
      text: "No podrás revertir esto!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, eliminar!"
    }).then((result) => {
      if (result.isConfirmed) {
        deleteEvent(id);
        Swal.fire({
          title: "Eliminado!",
          text: "El evento ha sido eliminado.",
          icon: "success"
        });
      }
    });
  };

  const handleEdit = (event) => {
    setCurrentEvento(event);
    setShow(true);
  };

  const handleSave = async () => {
    if (!currentEvento.nombre || !currentEvento.fechaInicio || !currentEvento.horario || !currentEvento.descripcion || !currentEvento.imagen) {
      MySwal.fire({
        title: 'Error',
        text: 'Por favor, llene todos los campos',
        icon: 'error'
      });
      return;
    }

    const newEvent = {
      ...currentEvento,
      fechaInicio: Timestamp.fromDate(new Date(currentEvento.fechaInicio))
    };

    if (newEvent.id) {
      const eventDoc = doc(db, "Eventos", newEvent.id);
      try {
        await updateDoc(eventDoc, newEvent);
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
        await addDoc(EventsCollection, newEvent);
        Swal.fire({
          title: "Añadido!",
          text: "Tu evento ha sido añadido.",
          icon: "success"
        });
      } catch (error) {
        console.error("Error adding document: ", error);
      }
    }

    setShow(false);
    getEvents();
  };

  useEffect(() => {
    getEvents();
  }, []);

  return (
    <>
      <div className="container col-lg-8">
        <h2 className="mt-5">Eventos </h2>
        <Button variant="success" className="mb-3" onClick={handleShow}>
          <FaPlus />
        </Button>
        <ul className="list-group mb-4">
          {events.map((evento) => (
            <li key={evento.id} className="list-group-item d-flex justify-content-between align-items-center">
              <div className="d-flex flex-column">
                <p className="mb-0">{evento.nombre}</p>
                <small className="text-muted">{evento.horario}</small>
              </div>
              <div>
                <Button variant="warning" className="btn-sm" style={{ marginRight: '5px' }} onClick={() => handleEdit(evento)}>
                  <FaEdit />
                </Button>
                <Button variant="danger" className="btn-sm" onClick={() => confirmDelete(evento.id)}>
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
                <label className="form-label">Nombre</label>
                <input
                  type="text"
                  className="form-control"
                  name="nombre"
                  value={currentEvento.nombre}
                  onChange={(e) => setCurrentEvento({ ...currentEvento, nombre: e.target.value })}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Descripción</label>
                <textarea
                  className="form-control"
                  name="descripcion"
                  rows="4"
                  value={currentEvento.descripcion}
                  onChange={(e) => setCurrentEvento({ ...currentEvento, descripcion: e.target.value })}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Fecha de inicio</label>
                <input
                  type="datetime-local"
                  className="form-control"
                  name="fechaInicio"
                  value={currentEvento.fechaInicio}
                  onChange={(e) => setCurrentEvento({ ...currentEvento, fechaInicio: e.target.value })}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Horario</label>
                <input
                  type="text"
                  className="form-control"
                  name="horario"
                  value={currentEvento.horario}
                  onChange={(e) => setCurrentEvento({ ...currentEvento, horario: e.target.value })}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">URL de la Imagen</label>
                <input
                  type="text"
                  className="form-control"
                  name="imagen"
                  value={currentEvento.imagen}
                  onChange={(e) => setCurrentEvento({ ...currentEvento, imagen: e.target.value })}
                />
              </div>
            </form>
          </Modal.Body>
          <Modal.Footer>
            <Button className="btn-custom-cancelar" onClick={handleClose}>
              Cancelar
            </Button>
            <Button variant="success" onClick={handleSave}>
              Guardar
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </>
  );
};
