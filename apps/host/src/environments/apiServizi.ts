export const apiServizi = {
  pa: {
    aste: {
      add: {
        path: '/inserimentoAsta',
      },
      delete: {
        path: '/eliminaAsta',
      },
      detail: {
        path: '/dettaglioAsta',
      },
      update: {
        path: '/modificaAsta',
      },
      search: {
        path: '/ricercaAste',
      },
      all: {
        path: '',
      },
      mieAste: {
        path: '/elencoAstePartecipate',
      },
    },
    offerte: {
      add: {
        path: '/inserimentoOfferta',
      },
      detail: {
        path: '/ultimaOfferta',
      },
    },
  },
  am: {
    beni: {
      detail: {
        path: '/dettaglioBene',
      },
      search: {
        path: '/ricercaBeni',
      },
      all: {
        path: '/elencoBeni',
      },
    },
    foto: {
      get: {
        _endpoint: '/byte',
        path: '/dettaglioFotoBene',
      },
    },
    tipologiche: {
      elenco: {
        path: '/elencoTipologica',
      },
      comuni: {
        path: '/elencoComuni',
      },
      province: {
        path: '/elencoProvince',
      },
      regioni: {
        path: '/elencoRegioni',
      },
      asset: {
        path: '/elencoTipologiaAsset',
      },
      assetVendibili: {
        path: '/elencoCategorie',
      },
    },
  },
};
