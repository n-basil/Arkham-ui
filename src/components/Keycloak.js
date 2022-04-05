import Keycloak from "keycloak-js";

// This instanciates the keycloak object
const keycloak = new Keycloak({
    url: process.env.REACT_APP_KC_CONNECTION_STRING,
    // url: "http://arkhamdevops.eastus.cloudapp.azure.com:8080",
    
    realm: "arkham",
    
    clientId: "arkham-ui",

  });

export default keycloak;