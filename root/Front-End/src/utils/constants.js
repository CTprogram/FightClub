export const getExpressBaseURI =  () => {
    const URI = import.meta.env.EXPRESS_URI || 'http://localhost:3001';
    return URI;
}