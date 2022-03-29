import Keycloak from "keycloak-js";

// This instanciates the keycloak object
const keycloak = new Keycloak({
    url: "http://localhost:8080",
    realm: "arkham",
    clientId: "arkham-ui",
  });

export default keycloak;