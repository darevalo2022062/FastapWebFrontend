import { useCallback } from 'react';

const useWhatsApp = (phoneNumber) => {
  const sendMessage = useCallback((productName) => {
    const message = `Hola, estoy interesado en el producto ${productName}. ¿Está disponible?`;
    const encodedMessage = encodeURIComponent(message);
    const url = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    window.open(url, '_blank');
  }, [phoneNumber]);

  return { sendMessage };
};

export default useWhatsApp;
