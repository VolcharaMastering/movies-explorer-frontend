import { Redirect, Route } from "react-router-dom";
import Footer from "./Footer/Footer";

function ProtectedRoute({component: Component, ...props}){
    return(
        <Route>
            {props.loggedIn? <Component {...props} /> : <Redirect to="/" />}
        <Footer />
        </Route>
    );
};  

export default ProtectedRoute;