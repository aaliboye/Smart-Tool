export const environment = {
  production: false,
};
export const   API_URL_DEV = 'http://ec2-3-215-178-122.compute-1.amazonaws.com:4000';
export const API_URL = 'https://daan-covid19-api.herokuapp.com/';
export const  APi_URL_INFO = 'https://daan-covid19-api.herokuapp.com//daily-report/last';
export const  APi_URL_DIFF = 'https://daan-covid19-api.herokuapp.com//daily-report/last-with-diff';
export const APi_URL_symptoms = 'https://daan-covid19-api.herokuapp.com//symptoms';
export const APi_URL_ZONE = 'https://daan-covid19-api.herokuapp.com//zones';
export const  APi_URL_PREV = 'https://daan-covid19-api.herokuapp.com//prevalence';
export const  OAUTH_ISSUER = 'g8NSIdSs6ZbS0Otf728sHm958CxcJLFaRW';
export const APi_URL_MONDIALE = 'https://corona.lmao.ninja/v2/all';
export const Api_Url_Histo = 'https://daan-covid19-api.herokuapp.com//user/trace/' + localStorage.getItem('ID_USER');
export const Api_Url_RISK = 'https://daan-covid19-api.herokuapp.com//user/risk-level/' + localStorage.getItem('ID_USER');
export const SIMULATION = true;
