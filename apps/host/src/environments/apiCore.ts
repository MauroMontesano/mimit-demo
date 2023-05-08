export const apiCore = {
  _base: 'https://gateway-api-portale-aste-ocp2test.apps.ocp2v.cnt.sogei.it/portale-aste/api/auth/gtw/dispatch',
  _endpoint: '',
  pa: {
    utente: {
      getLoggedUser: {
        path: '/utenteLoggato',
      },
      getDatiUtente: {
        path: '/datiUtente',
      },
      completaRegistrazione: {
        path: '/registraEmail',
      },
      presaVisioneUtente: {
        path: '/presaVisioneUtente',
      },
      inviaOTP: {
        path: '/confermaRegistrazione',
      },
    },
    aste: {
      mieAste: {
        path: '/elencoAstePartecipate',
      },
    },
  },
};
