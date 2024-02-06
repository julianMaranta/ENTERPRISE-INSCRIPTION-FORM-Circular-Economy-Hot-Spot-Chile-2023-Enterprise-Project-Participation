import React, { useState} from 'react';
import './Form.css';
import { validateDocument } from '../../utils/validateDocument';




type Props = {
  onSubmit: (data: {
    name: string,
    lastName: string,
    email: string,
    documentType: DocumentType,
    dni: string,
    countryCode: string,
    phone: string,
    org: string,
    charge: string,
    country: string,
    howDidYouHear: string,
    industria: string,
    dia: string
  }) => void;
};

enum DocumentType {
  DNI = 'DNI',
  RUT = 'RUT',
  Pasaporte = 'Pasaporte',
}

const Form: React.FC<Props> = ({ onSubmit }) => {
  const [documentType, setDocumentType] = useState<DocumentType>(DocumentType.RUT);
  const [dni, setDni] = useState<string>('');
  const [countryCode, setCountryCode] = useState<string>('');
  const [isPhoneValid, setIsPhoneValid] = useState<boolean>(true);
  const [isDocumentValid, setIsDocumentValid] = useState<boolean>(true);
  const [formSubmitted, setFormSubmitted] = useState<boolean>(false);
  
  const [selectedDays, setSelectedDays] = useState<string[]>([]);
  


  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = event.target;
    if (checked) {
      setSelectedDays([...selectedDays, name]);
    } else {
      setSelectedDays(selectedDays.filter(day => day !== name));
    }
  };

  
  

  // const enviarDatosAFirebase = () => {
  //   const database = firebase.database();
  //   database.ref('diasSeleccionados').set(checkboxState);
    
  // };


  const handleDocumentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setDni(value);
    setIsDocumentValid(validateDocument(documentType, value)); 
  };
  console.log(isPhoneValid)
  console.log(isDocumentValid)
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const phone = e.target.value;
    const fullNumber = countryCode + phone;
    const isValid = /^\+\d{1,3}\d{7,14}$/.test(fullNumber);
    setIsPhoneValid(isValid);
  };

  // useEffect(() => {
  //   let modalTimeout: NodeJS.Timeout;

  //   if (formSubmitted) {
  //     setModalVisible(true); 
  //     modalTimeout = setTimeout(() => {
  //       setModalVisible(false); 
  //       setFormSubmitted(false); 
  //     }, 9000);
  //   }

  //   return () => clearTimeout(modalTimeout);
  // }, [formSubmitted]);



  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    
    if (!isDocumentValid) {
      console.error('El documento ingresado no es válido');
      return;
    }
    setFormSubmitted(true);
    

    const formData = new FormData(event.currentTarget);
    const selectedDaysAsString = selectedDays.join(', '); // Convierte el array en una cadena separada por comas
    const data = {
      name: formData.get('name') as string,
      lastName: formData.get('lastName') as string,
      email: formData.get('email') as string,
      documentType, // Añadiendo el tipo de documento al objeto data
      dni: formData.get('dni') as string,
      countryCode: formData.get('countryCode') as string,
      phone: formData.get('phone') as string,
      org: formData.get('org') as string,
      charge: formData.get('charge') as string,
      country: formData.get('country') as string,
      howDidYouHear: formData.get('howDidYouHear') as string,
      industria: formData.get('industria') as string,
      dia: selectedDaysAsString as string,
      
    };
    
    
  
  
    onSubmit(data);
    
  };

  




  return (
    <form className="form-container" onSubmit={handleSubmit}>
      <div className="form-header form-title">
        <h2 className='title'>Inscríbete</h2>
      </div>
      <div className="form-field name-section">
        <input className="form-input" type="text" name="name" placeholder="Nombre" required />
        <input className="form-input" type="text" name="lastName" placeholder="Apellido" required />
      </div>
      <div className="form-field document-section">
        <div className="selector-input-wrapper">
          <select 
            className="form-input document-type" 
            name="documentType" 
            onChange={(e) => setDocumentType(e.target.value as DocumentType)} 
            required
          >
            <option value="RUT">RUT</option>      
            <option value="DNI">DNI</option>         
            <option value="Pasaporte">Pasaporte</option>
          </select>
          <input 
            className="form-input document-number" 
            type="text" name="dni" 
            placeholder="Número de Documento" 
            value={dni} 
            onChange={handleDocumentChange} 
            required 
          />
          
        </div>
        {/* { formSubmitted && !isDocumentValid && dni !== '' && (
          <div className="modal">
          <div className="modal-content">
            <p className="modal-inscription">Número de documento no válido</p>
          </div>
        </div>
        )} */}
        {/* {formSubmitted && !isDocumentValid && dni !== '' && (
          <div className="error-message">
            Número de documento no válido
            
            </div>
          
        )} */}
      </div>
      <div className='warning-rut-div'>
      <p className='warning-rut'>RUT: Si eres de CHILE escribe el RUT con PUNTOS y GUIÓN</p>
      <p className='warning-rut'>DNI: Únicamente Números</p>
      <p className='warning-rut'>Pasaporte: Únicamente Números y Letras</p>

      </div>
      


      <div className="form-field">
        <input className="form-input" type="email" name="email" placeholder="Correo" required />
      </div>
      <div className="form-field phone-section">
        <input
          className="form-input country-code"
          type="text"
          name="countryCode"
          placeholder="+56"
          value={countryCode}
          onChange={(e) => setCountryCode(e.target.value)}
          required
        />
        <input
          className="form-input phone-number"
          type="tel"
          name="phone"
          placeholder="Número de teléfono"
          onChange={handlePhoneChange}
          required
        />
        {/* {!isPhoneValid && <div><span className="error-message">Número de teléfono no válido</span></div>} */}
      </div>


      <div className="form-field">
        <input className="form-input" type="text" name="org" placeholder="Empresa u organizacion" />
      </div>
      <div className="form-field">
        <select className="form-input" name="industria" id="industria" required>
          <option value="" disabled>Seleccione su Industria:</option>
          <option value="Agricultura, Ganadería y Pesca">Agricultura, Ganadería y Pesca</option>
          <option value="Alimentación">Alimentación</option>
          <option value="Automotriz">Automotriz</option>
          <option value="Comercio">Comercio</option>
          <option value="Construcción">Construcción</option>
          <option value="Energía">Energía</option>
          <option value="Educación">Educación</option>
          <option value="Gestion de Residuos">Gestion de Residuos</option>
          <option value="Hotelería y Turismo">Hotelería y Turismo</option>
          <option value="Industrias Quimicas">Industrias Quimicas</option>
          <option value="Inmobiliaria">Inmobiliaria</option>
          <option value="Manufacturera">Manufacturera</option>
          <option value="Medios de Comunicación">Medios de Comunicación</option>
          <option value="Minería">Minería</option>
          <option value="Servicios Financieros y Seguros">Servicios Financieros y Seguros</option>
          <option value="Servicio Público">Servicio Público</option>
          <option value="Innovación y Tecnologia">Innovación y Tecnologia</option>
          <option value="Textil">Textil</option>
          <option value="Transporte">Transporte</option>
          <option value="Otras Industrias">Otras Industrias</option>
        </select>
      </div>
      <div className="form-field">
        <input className="form-input" type="text" name="charge" placeholder="Cargo" />
      </div>
      <div className="form-field">
        <input className="form-input" type="text" name="country" placeholder="País" />
      </div>
      <div className="form-field">
        <select className="form-input" name="howDidYouHear" id="howDidYouHear" required>
          <option value="" disabled>Como se entero del evento?</option>
          <option value="web">Web</option>
          <option value="hotspot">Hotspot</option>
          <option value="linkedin">Linkedin</option>
          <option value="social">Red social</option>
          <option value="email">Email</option>
          <option value="conocido">Conocido</option>
        </select>
      </div>

      <div className='checkbox-list'> 
      <label className='label-checkbox-title'>Seleccione sus días:</label>
      <div className="form-field-checkbox">
        <input className="form-checkbox-input" type="checkbox" name="martes"
          id="martes"
          checked={selectedDays.includes('martes')}
        onChange={handleCheckboxChange} />
        <label className="form-checkbox" htmlFor="martes">Martes 28/11 - Iniciativas Público Privadas</label>       
      </div>
      <div className="form-field-checkbox">
        <input className="form-checkbox-input" type="checkbox" name="miercoles"  id="miercoles"
        checked={selectedDays.includes('miercoles')}
        onChange={handleCheckboxChange} />
        <label className="form-checkbox" htmlFor="miercoles">Miércoles 29/11 - Empresas Sostenibles</label>
      </div>
      <div className="form-field-checkbox">
        <input className="form-checkbox-input" type="checkbox"  id="jueves"
        name="jueves"
        checked={selectedDays.includes('jueves')}
        onChange={handleCheckboxChange} />
        <label className="form-checkbox" htmlFor="jueves">Jueves 30/11 - Innovación Para la Economía Circular</label>
      </div>
      <div className="form-field-checkbox">
        <input className="form-checkbox-input" type="checkbox"  id="viernes"
        name="viernes"
        checked={selectedDays.includes('viernes')}
        onChange={handleCheckboxChange} />
        <label className="form-checkbox" htmlFor="viernes">Viernes 01/12 - Compromiso Ciudadano</label>
        
      </div>
      <div className="form-field-checkbox">
        <input className="form-checkbox-input" type="checkbox"  id="expo"
        name="expo"
        checked={selectedDays.includes('expo')}
        onChange={handleCheckboxChange} />
        <label className="form-checkbox" htmlFor="expo">Asistir únicamente a Expo - Abierta al Público</label>     
      </div>
      </div>
      <a className="form-program-link" href="ProgramaEconomiaCircular2023.pdf">Ver Programa de Evento</a>
      <a className="form-tours-link" href="https://docs.google.com/forms/d/e/1FAIpQLSdfC_CTSWtYPf2OKCgIvSvjZvBe-mxbr3Y6Rn1bYh3SjcXfhw/viewform">Inscríbete a Tours Circulares</a>
      {/* <button onClick={descargarPDF} type="submit" className="form-button-download">Descargar Programa de Evento</button> */}
    
      {/* <div className="form-field">
        <select className="form-input" name="dia" id="dia" required>
          <option value="" disabled>Seleccione el día:</option>
          <option value="Martes">Martes 28/11 - Iniciativas Público Privadas: En Práctica para la Transición Circular</option>
          <option value="Miércoles">Miércoles 29/11 - Empresas Sostenibles: Modelos Circulares</option>
          <option value="Jueves">Jueves 30/11 - Innovación Para la Economía Circular: Nuevos Desarrollos Habilitantes</option>
          <option value="Viernes">Viernes 01/12 - Compromiso Ciudadano: Elemento Clave Para La Transición Circular</option>
          
        </select>
      </div> */}
      
      
      <div className="form-field">
        <button type="submit" className="form-button">Enviar</button>
      </div>
      
      <div className="privacy-note">
        <p className="privacy-note">NOTA DE PRIVACIDAD: Los datos recogidos a través de este formulario serán tratados única y exclusivamente con estricto apego a la Ley 19.628 sobre la Protección de la Vida Privada y la Ley 21.096 sobre la Protección de Datos Personales.</p>
      </div>
      { formSubmitted && isDocumentValid && (
          <div className="modal">
          <div className="modal-content">
            <p className="modal-inscription">YA ESTAS INSCRITO</p>
          </div>
        </div>
        )}
        {/* { formSubmitted && !isDocumentValid && !formSubmitted &&(
          <div className="modal">
          <div className="modal-content">
            <p className="modal-inscription">Número de documento no válido</p>
          </div>
        </div>
        )} */}
        
    </form>
  );
};

export default Form;
