let DOMAIN
switch (process.env.NODE_ENV) {
  case 'production':{
    const hostname = window.location.hostname
    DOMAIN = `http://${hostname}:8000/`
    break }
  case 'development':
  default:
    DOMAIN = 'http://127.0.0.1:8000/'
}

const URLAPI = `${DOMAIN}api/`
export const getUrl = (url) => `${URLAPI}${url}`
