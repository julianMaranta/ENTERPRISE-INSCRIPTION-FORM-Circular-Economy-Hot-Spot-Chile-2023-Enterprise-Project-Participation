import './App.css';
import React, { useState } from 'react';
import Clock from './components/Clock/Clock';
// import SaveTheDate from './components/SaveTheDate/SaveTheDate'
import SaveTheDateComponent from './components/SaveTheDate/SaveTheDateComponent';
import Form from '../src/components/Form/Form';
import Modal from '../src/components/Modal';
//@ts-ignore
import { storeMessage } from "../src/utils/storeFirebase"

const App: React.FC = () => {
  const [isModalOpen, setModalOpen] = useState(false);

  const handleFormSubmit = async(data: { name: string, email: string, country: string }) => {
    console.log('Datos del formulario:', data);
    try {
      await storeMessage(data);
      console.log("Datos almacenados correctamente.");
    } catch (error) {
      console.error("Ocurrió un error al guardar los datos:", error);
    }
    setModalOpen(false);
  };

  // const deadline = new Date(Date.parse(new Date()) + 12 * 24 * 60 * 60 * 1000);
  // const deadline = new Date('November 28, 2023 00:00:00').getTime();

  //Fechas de testeo
  // const deadline = 'October 20, 2023 00:00:00';
  // const deadline = 'September 15, 2023 00:00:00';
  // const now = new Date();
  // const deadline = new Date(now.getFullYear(), now.getMonth(), now.getDate(), now.getHours() + 1, now.getMinutes() + 30).toString();
  // const deadline = new Date(Date.now() + 2 * 60 * 1000).toString();
  // const deadline = new Date(Date.now() + 45 * 1000).toString();
  // const deadline = new Date(Date.now() + 1000).toString();

  //Fecha del evento de economia circular
  const deadline = 'November 28, 2023 08:00:00';

  return (
    <div className="contenedor">
     <img src="/logo.png" alt="Logo" className="logo" />
     
    <div className="background">
     
    <div className='centered-square'>
      <div className='timer-container'>
        <h2><span>¿Cuánto</span> falta?</h2>
        <Clock countdown={deadline} />
      </div>
      <div className='container-container'>
        <div className='reserva-ahora'>

          {/* <h2>Reserva <span>ahora</span></h2> */}
          <button className='principal-button' onClick={() => setModalOpen(true)}>Inscríbete</button>
        </div>
        <SaveTheDateComponent deadline={deadline} />
        
      </div>
    </div>
        <Modal isOpen={isModalOpen} onClose={() => setModalOpen(false)}>
          <Form onSubmit={handleFormSubmit} />
        </Modal>
        </div>
  </div>
  );
}

export default App;