export const getExpressBaseURI =  () => {
    const URI = import.meta.env.VITE_EXPRESS_URI || '/api';
    return URI;
}