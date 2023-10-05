
import {Link , useNavigate} from "react-router-dom";
import { useForm } from "react-hook-form";
import {useDispatch} from 'react-redux'
import * as actions from '../../redux/actions'
import requestApi from "../../helpers/api.js";
import {toast} from "react-toastify";

function addProduct () {

    const dispatch = useDispatch()

    const navigate = useNavigate()

    const { register , handleSubmit , formState: {errors}} = useForm()

    const handleSubmitFormAdd = async (data) => {
        console.log('data form:::',data)
        dispatch(actions.controlLoading(true))
        try {
            const res = await requestApi('product','POST',data)
            console.log(res)
            dispatch(actions.controlLoading(false))
            toast.success(`${res.data.message}`,{position : 'top-center' , autoClose: 2000})
            setTimeout(()=>navigate('/products'),3000)
        }catch (e) {
            console.log(e)
            dispatch(actions.controlLoading(false))
        }
    }

    return (
            <div id="layoutSidenav_content">
                <main>
                    <div className="container-fluid px-4">
                        <h1 className="mt-4">New Product</h1>
                        <ol className="breadcrumb mb-4">
                            <li className="breadcrumb-item"><Link to="/">Dashboard</Link></li>
                            <li className="breadcrumb-item ">Product</li>
                            <li className="breadcrumb-item active">Add Product</li>
                        </ol>
                        <div className="card mb-4">
                            <div className="card-header">
                                <i className="fas fa-plus me-1"></i>
                                Add
                            </div>
                            <div className="card-body">
                                <div className="row mb-3">
                                    <form>
                                    <div className="col-md-6">
                                        <div className="mb-3 mt-3">
                                            <label className="form-label">Product Name :</label>
                                            <input {...register('product_name', {required: 'product name is required.'})} type="text" className="form-control" placeholder="Enter your Name"/>
                                            {errors.product_name && <p style={{color:'red'}}>{errors.product_name.message}</p>}
                                        </div>
                                        <div className="mb-3">
                                            <label className="form-label">Product Description :</label>
                                            <input {...register('product_description', {required: 'product description is required.'})} type="text" className="form-control" placeholder="Enter your Description"/>
                                            {errors.product_description && <p style={{color:'red'}}>{errors.product_description.message}</p>}
                                        </div>
                                        <div className="mb-3 mt-3">
                                            <label className="form-label">Product Price :</label>
                                            <input {...register('product_price', {required: 'product price is required.'})} type="number" className="form-control" placeholder="Enter your Price"/>
                                            {errors.product_price && <p style={{color:'red'}}>{errors.product_price.message}</p>}
                                        </div>
                                        <div className="mb-3">
                                            <label className="form-label">Product Thumb :</label>
                                            <input {...register('product_thumb', {required: 'product thumb is required.'})} type="text" className="form-control" placeholder="Enter your Thumb"/>
                                            {errors.product_thumb && <p style={{color:'red'}}>{errors.product_thumb.message}</p>}
                                        </div>
                                        <div className="mb-3 mt-3">
                                            <label className="form-label">Product_Type :</label>
                                            <select {...register('product_type')} className="form-select">
                                                <option value="Electronics">Electronics</option>
                                                <option value="Furniture">Furniture</option>
                                                <option value="Clothing">Clothing</option>
                                            </select>
                                        </div>
                                        <div className="mb-3">
                                            <label className="form-label">Product_Quantity :</label>
                                            <input {...register('product_quantity', {required: 'product quantity is required.'})} type="number" className="form-control" placeholder="Enter your Quantity"/>
                                            {errors.product_quantity && <p style={{color:'red'}}>{errors.product_quantity.message}</p>}
                                        </div>

                                        <div className="mb-3 mt-3">

                                            <label className="form-label">Product Brand :</label>
                                            <input {...register('product_attributes.brand', {required: 'product brand is required.'})} type="text" className="form-control" placeholder="Enter your Brand"/>
                                            {errors.product_attributes?.brand && <p style={{color:'red'}}>{errors.product_attributes?.brand.message}</p>}
                                        </div>
                                        <div className="mb-3">
                                            <label className="form-label">Product Size :</label>
                                            <input {...register('product_attributes.size', {required: 'product size is required.'})} type="text" className="form-control" placeholder="Enter your Size"/>
                                            {errors.product_attributes?.size && <p style={{color:'red'}}>{errors.product_attributes?.size.message}</p>}
                                        </div>
                                        <div className="mb-3 mt-3">

                                            <label className="form-label">Product Meterial :</label>
                                            <input {...register('product_attributes.meterial', {required: 'product meterial is required.'})} type="text" className="form-control" placeholder="Enter your Meterial"/>
                                            {errors.product_attributes?.meterial && <p style={{color:'red'}}>{errors.product_attributes?.meterial.message}</p>}
                                        </div>
                                        <button type="button" onClick={handleSubmit(handleSubmitFormAdd)} className="btn btn-success">Add</button>
                                    </div>
                                </form>
                                </div>
                            </div>
                        </div>


                    </div>
                </main>

            </div>
    )
}

export default addProduct