// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

const GatewayApiUrl = "http://localhost:7000";

export const environment = {
  production: false,

  gestionFournisseurApi: "http://localhost:49214/api",
  gestionCompresseursApi: "http://localhost:49211/api",
  gestionUtilisateurApi: "http://localhost:5001/api",
  authentificationPghApi: "http://localhost:5009/api",
  notificationApi: "http://localhost:5006/api",

  // gestionFournisseurApi: GatewayApiUrl + '/Fournisseur',
  // gestionCompresseursApi: GatewayApiUrl + '/Compresseur',
  // gestionUtilisateurApi: GatewayApiUrl + '/Responsable',
  // authentificationPghApi: GatewayApiUrl + '/Authentification',
  // notificationApi: GatewayApiUrl + '/Notification',
  ApplicationMenuId: "8d36db56-4ffd-4dbf-953e-c5593d97ebc5"
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
