import Keycloak from "keycloak-js";
import { useKeycloak } from "@react-keycloak/web";


export default function hidePage ({ children }) {
    const { keycloak } = useKeycloak();
   
    const isLoggedIn = keycloak.authenticated;

    return isLoggedIn ? children : null;
};