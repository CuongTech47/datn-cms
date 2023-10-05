import {useEffect, useState} from "react";
import requestApi from "../helpers/api.js";
import {useDispatch} from "react-redux";
import * as actions from '../redux/actions'

function Dashboard () {

    const dispatch = useDispatch()


    const [dashboardData, setDashboardData] = useState({})

    useEffect(() => {
        // requestApi('product','GET',[]).then(response =>{
        //     console.log(response)
        //     setDashboardData({
        //         ...dashboardData,totalProduct : response.data.metadata.products.length
        //     })
        // }).catch(err => {
        //     console.log(err)
        // })
        const promiseProduct = requestApi('product','GET')
        const promiseDiscount = requestApi('discount','GET')
        dispatch(actions.controlLoading(true))
        Promise.all([promiseProduct,promiseDiscount]).then((res) => {
            console.log('res ::',res)
            setDashboardData({
                ...dashboardData,totalProduct : res[0].data.metadata.products.length, totalDiscount : res[1].data.metadata.length
            })
            console.log(dashboardData)
            dispatch(actions.controlLoading(false))
        }).catch(e =>{
            console.log(e)
            dispatch(actions.controlLoading(false))
        })
    }, []);
    return (
        <>
            <div id="layoutSidenav_content">
                <main>
                    <div className="container-fluid px-4">
                        <h1 className="mt-4">Dashboard</h1>
                        <ol className="breadcrumb mb-4">
                            <li className="breadcrumb-item active">Dashboard</li>
                        </ol>
                        <div className="row">
                            <div className="col-xl-3 col-md-6">
                                <div className="card bg-primary text-white mb-4">
                                    <div className="card-body">Total Users
                                    {/*    {productData.totalProduct && (<span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">*/}
                                    {/*    {productData.totalProduct}*/}
                                    {/*</span>)}*/}

                                    </div>
                                    <div className="card-footer d-flex align-items-center justify-content-between">
                                        <a className="small text-white stretched-link" href="#">View Details</a>
                                        <div className="small text-white"><i className="fas fa-angle-right"></i></div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-xl-3 col-md-6">
                                <div className="card bg-warning text-white mb-4">
                                    <div className="card-body">Total Product
                                        <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                                        {dashboardData.totalProduct}
                                    </span>
                                    </div>
                                    <div className="card-footer d-flex align-items-center justify-content-between">
                                        <a className="small text-white stretched-link" href="#">View Details</a>
                                        <div className="small text-white"><i className="fas fa-angle-right"></i></div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-xl-3 col-md-6">
                                <div className="card bg-success text-white mb-4">
                                    <div className="card-body">Total Discount
                                            <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                                                {dashboardData.totalDiscount}
                                            </span>
                                    </div>
                                    <div className="card-footer d-flex align-items-center justify-content-between">
                                        <a className="small text-white stretched-link" href="#">View Details</a>
                                        <div className="small text-white"><i className="fas fa-angle-right"></i></div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-xl-3 col-md-6">
                                <div className="card bg-danger text-white mb-4">
                                    <div className="card-body">Danger Card</div>
                                    <div className="card-footer d-flex align-items-center justify-content-between">
                                        <a className="small text-white stretched-link" href="#">View Details</a>
                                        <div className="small text-white"><i className="fas fa-angle-right"></i></div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </main>
            </div>
        </>
    )

}

export default Dashboard