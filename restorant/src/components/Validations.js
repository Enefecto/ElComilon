const validateEmail = (correo) => {
    const expresionRegular = /^[\w-.]+@([\w-]+\.)+[\w-]{2,}$/i;
    return expresionRegular.test(correo);
}

const validatePhoneNumber = (phone) => {
    let expresionRegular = /^(?:\+|\d)[\d-]{8,}$/;
    return expresionRegular.test(phone); 
}
  
  

export {validateEmail, validatePhoneNumber};