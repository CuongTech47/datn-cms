import {Navigate , Outlet} from "react-router-dom";


function PublicRoutes () {
    let token = localStorage.getItem('access_token') || false
    return (
        !token?<Outlet/> : <Navigate to="/"/>
    )
}

export default PublicRoutes