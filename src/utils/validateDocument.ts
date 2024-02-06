/* eslint-disable no-case-declarations */
export type DocumentType = 'RUT' | 'DNI' | 'Pasaporte';

export const validateDocument = (documentType: DocumentType, value: string): boolean => {
  switch (documentType) {
    case 'RUT':
      // Lógica para validar formato de RUT
      const rutRegex = /^(\d{1,2}(\.\d{3}){2}-[\dkK]|\d{1,2}(\.\d{3}){2}-?[\dkK])$/;
      // Este es un ejemplo básico, ajusta la expresión regular según tus necesidades (Expr. Reg. Anterior: /^[0-9]+-[0-9kK]{1}$/;)
      return rutRegex.test(value);
    case 'DNI':
      // Lógica para validar formato de DNI
      const dniRegex = /^[0-9]{7,8}$/; // Asume que un DNI tiene entre 7 y 8 dígitos, ajusta según tus necesidades
      return dniRegex.test(value);
    case 'Pasaporte':
      // Lógica para validar formato de Pasaporte
      const passportRegex = /^[a-zA-Z0-9]{5,9}$/; // Asume que un pasaporte tiene entre 5 y 9 caracteres alfanuméricos, ajusta según tus necesidades
      return passportRegex.test(value);
    default:
      return false;
  }
}
  