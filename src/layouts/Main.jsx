import Header from "../components/Header.jsx";
import Sidebar from "../components/Sidebar.jsx";
import {Outlet} from "react-router-dom";


function Main () {
    return (
        <>
            <Header/>
            <div id="layoutSidenav">
                <Sidebar />
                <Outlet />
            </div>
        </>
    )
}

export default Main