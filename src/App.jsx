
import { Routes, Route } from 'react-router-dom';
import './App.css'
import Main from "./layouts/Main.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Login from "./pages/Login.jsx";
import 'react-toastify/dist/ReactToastify.css';
import Register from "./pages/Register.jsx";
import PrivateRoutes from "./layouts/PrivateRoutes.jsx";
import PublicRoutes from "./layouts/PublicRoutes.jsx";
import Layout from "./layouts/Layout.jsx";
import ProductListPublished from "./components/product/ProductListPublished.jsx";
import AddProduct from "./components/product/addProduct.jsx";

import './assets/css/styles.css'
import NotFound from "./pages/NotFound.jsx";
import DiscountList from "./components/discount/DiscountList.jsx";
import ProductListDrafts from "./components/product/ProductListDrafts.jsx";

function App() {


  return (
    <>
        <Routes>
            <Route element={<Layout/>}>
                <Route element={<Main />}>
                    <Route element={<PrivateRoutes />}>
                        <Route path='/' element={<Dashboard />} />
                        <Route path='/products/published' element={<ProductListPublished />} />
                        <Route path='/products/draft' element={<ProductListDrafts />} />
                        <Route path='/product/add' element={<AddProduct />} />

                        <Route path='/discounts' element={<DiscountList />} />
                    </Route>
                </Route>
                <Route element={<PublicRoutes />}>
                    <Route path='/login' element={<Login />} />
                    <Route path='/register' element={<Register />} />
                </Route>
            </Route>
            <Route path="*" element={<NotFound/>}>

            </Route>

        </Routes>
    </>
  )
}

export default App
