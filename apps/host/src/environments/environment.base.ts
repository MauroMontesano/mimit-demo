// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

import { apiCore } from './apiCore';

export const base = {
  env: 'LOCAL',
  production: false,
  developMode: true,
  appName: 'ADM',
  baseUrl: 'http://localhost:4200/#/',
  rxStompConfig: {
    brokerURL: 'ws://websocket.portale-aste-ocp2test.svc.cluster.local:9080/portale-aste/websocket',
    connectHeaders: {
      'x-auth-user': '',
      'x-nonce': '',
    },
    heartbeatIncoming: 0,
    heartbeatOutgoing: 20000,
    reconnectDelay: 500,
  },
  api: apiCore,
  minStartDate: '259200000',
  durataAstaMassima: '604800000',
  percentualeCauzione: '20',
  sogliaCauzione: '3000',
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
