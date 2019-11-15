const GatewayApiUrl = "http://srvdevweb:8052";

export const environment = {
  production: true,

  gestionFournisseurApi: "http://localhost:49214/api",
  gestionCompresseursApi: "http://localhost:49211/api",
  gestionUtilisateurApi: "http://localhost:5001/api",
  authentificationPghApi: "http://localhost:5009/api",
  notificationApi: "http://localhost:5006/api",

  // gestionFournisseurApi: GatewayApiUrl + '/gestionfournisseur/api',
  // gestionCompresseursApi: GatewayApiUrl + '/gestioncompresseur/api',
  // gestionUtilisateurApi: GatewayApiUrl + '/gestionResponsable/api',
  // authentificationPghApi: GatewayApiUrl + '/authentication/api',
  // notificationApi: GatewayApiUrl + '/gestionNotification/api',

  ApplicationMenuId: "8d36db56-4ffd-4dbf-953e-c5593d97ebc5"
};
