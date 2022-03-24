import Keycloak from "keycloak-js";

// This instanciates the keycloak object
const keycloak = new Keycloak({
 url: "http://localhost:8080",
 realm: "react",
 clientId: "react"

  
});

export default keycloak;