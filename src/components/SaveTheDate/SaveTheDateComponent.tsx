

import { FC, useState } from 'react';
import './SaveTheDateComponent.scss';

type SaveTheDateComponentProps = {
    deadline: string
}
// { deadline }
const SaveTheDateComponent: FC<SaveTheDateComponentProps> = () => {
    const [isOpen, setIsOpen] = useState(false);

    const crearUrlEvento = (titulo: string, inicio: string, fin: string, descripcion: string, lugar: string) => {
        titulo = encodeURIComponent(titulo);
        descripcion = encodeURIComponent(descripcion);
        lugar = encodeURIComponent(lugar);

        return `https://www.google.com/calendar/render?action=TEMPLATE&text=${titulo}&dates=${inicio}/${fin}&details=${descripcion}&location=${lugar}&sf=true&output=xml`;
    };

    const handleEventoClick = (url: string) => {
        window.open(url, '_blank');
    };

    return (

        <ul 
        className="add-to-date dropdown dropbtn" 
        onClick={() => setIsOpen(!isOpen)}>
          <li className="text-left save-date">
              <div title="Add to Calendar" className="addeventatc save-date-content">
                  <div className="clock">
                      <div className="clock-inner"></div>
                  </div>
                  <div className="date-details">
                      <h3>Save<span>The</span>Date</h3>
                      <p className='deadline'>November 28, 2023</p>
                  </div>
                  {/* Desplegable */}
                  {isOpen && (
                      <div className="dropdown-content">
                          <button onClick={() => handleEventoClick(crearUrlEvento("Economia Circular", "20231128", "20231130", "Reunión Empresarial en Santiago-Chile.", "Santiago-Chile"))}>Agendar evento</button>
                          {/* ... puedes agregar más botones aquí , "Economia Circular", "20231128", "20231214", "Reunión Empresarial en Santiago-Chile.", "Santiago-Chile"*/}
                      </div>
                  )}
              </div>
          </li>
      </ul>
    );
};

export default SaveTheDateComponent;

