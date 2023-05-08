export const apiUtente = {
  pa: {
    utente: {
      generaHashMac: {
        path: '/hashMac',
      },
      getDeleghe: {
        path: '/getDeleghe',
      },
    },
    report: {
      path: '/elencoReport',
    },
    aste: {
      mieAste: {
        path: '/elencoAstePartecipate',
      },
      addToMieAste: {
        path: '/aggiungiUtenteInteressato',
      },
      saveTransazione: {
        path: '/saveTransazione',
      },
      approvaAsta: {
        path: '/approvaAsta',
      },
      checkPrimaOfferta: {
        path: '/checkPrimaOfferta',
      },
      checkVerifichePreliminari: {
        path: '/checkVerifichePreliminari',
      },
      apertura: {
        path: '/aperturaAsta',
      },
    },
  },
};
