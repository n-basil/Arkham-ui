// import Keycloak from "keycloak-js";
import { useKeycloak } from "@react-keycloak/web";
import Login from "../views/Login";

/**
 * If a route is protected, we need to check if the user is authenticated.
 * If they are, we can render the route.
 * If they are not, we can redirect them to the login page.
 * 
 * @param {props} the child component that is being wrapped
 * @returns Children or Login component
 */

export default function HideRoute ({ children }) {


    const { keycloak } = useKeycloak();
   
    const isLoggedIn = keycloak.authenticated;

    return isLoggedIn ? children : <Login />;
};