
import { ToastContainer } from 'react-toastify';
import {Outlet} from "react-router-dom";
import {ScaleLoader} from "react-spinners";
import {useSelector} from "react-redux";

const override = {
    position : 'absolute',
    top : '0',
    left : '0',
    right : '0',
    bottom : '0',
    backgroundColor : "rgb(0 0 0 / 30%)",
    textAlign : 'center',
    zIndex: '99999'
}
function Layout () {
    const statusLoading = useSelector(state => state.globalLoading.status)
    return (
        <>
            <ScaleLoader loading={statusLoading} cssOverride={ override} color='#36d7b7'/>
            <Outlet/>
            <ToastContainer/>
        </>
    )
}

export default Layout