
import DataTable from '../common/DataTable.jsx'
import requestApi from '../../helpers/api'
import { useDispatch } from 'react-redux'
import * as actions from '../../redux/actions'
import { Button, Modal } from 'react-bootstrap'
import {useEffect, useState} from "react";
import { formatDateTime } from "../../helpers/common.js";


function ProductListPublished () {
    const dispatch = useDispatch()
    const [products, setProducts] = useState([])
    const [numOfPage, setNumOfPage] = useState(1)
    const [currentPage, setCurrentPage] = useState(1)
    const [itemsPerPage, setItemsPerPage] = useState(1)
    const [searchString, setSearchString] = useState('')
    const [selectedRows, setSelectedRows] = useState([])
    const [deleteItem, setDeleteItem] = useState(null)
    const [deleteType, setDeleteType] = useState('single')
    const [showModal, setShowModal] = useState(false)
    const [refresh, setRefresh] = useState(Date.now())

    const columns = [
        {
            name: "ID",
            element: row => row._id
        },
        {
            name: "Name",
            element: row => row.product_name
        },
        {
            name: "Image",
            element: row => row.product_thumb
        },
        {
            name: "Description",
            element: row => row.product_description
        },
        {
            name: "Price",
            element: row => row.product_price
        },
        {
            name: "Quantity",
            element: row => row.product_quantity
        },
        {
            name: "Type",
            element: row => row.product_type
        },
        {
            name: "Rating",
            element: row => row.product_ratingsAverage
        },
        {
            name: "Created at",
            element: row => formatDateTime(row.createdAt)
        },
        {
            name: "Updated at",
            element: row => formatDateTime(row.updatedAt)
        },
        {
            name: "Actions",
            element: row => (
                <>
                    <button type="button" className="btn btn-sm btn-success me-1" onClick={()=> handleDraft(row._id)}><i className="fa-brands fa-firstdraft"></i> Draft</button>
                    <button type="button" className="btn btn-sm btn-warning me-1"><i className="fa fa-pencil"></i> Edit</button>
                    <button type="button" className="btn btn-sm btn-danger me-1" onClick={() => handleDelete(row._id)}><i className="fa fa-trash"></i> Delete</button>
                </>
            )
        }
    ]


    const handleDraft = (id) => {
        console.log(id)
    }

    const handleDelete = (id) => {
        console.log("single delete with id => ", id)
        setShowModal(true)
        setDeleteItem(id)
        setDeleteType('single')
    }

    const handleMultiDelete = () => {
        console.log("multi delete => ", selectedRows)
        setShowModal(true)
        setDeleteType('multi')
    }

    const requestDeleteApi = () => {
        if (deleteType === 'single') {
            dispatch(actions.controlLoading(true))
            requestApi(`/users/${deleteItem}`, 'DELETE', []).then(response => {
                setShowModal(false)
                setRefresh(Date.now())
                dispatch(actions.controlLoading(false))
            }).catch(err => {
                console.log(err)
                setShowModal(false)
                dispatch(actions.controlLoading(false))
            })
        } else {
            dispatch(actions.controlLoading(true))
            requestApi(`/users/multiple?ids=${selectedRows.toString()}`, 'DELETE', []).then(response => {
                setShowModal(false)
                setRefresh(Date.now())
                setSelectedRows([])
                dispatch(actions.controlLoading(false))
            }).catch(err => {
                console.log(err)
                setShowModal(false)
                dispatch(actions.controlLoading(false))
            })
        }
    }

    useEffect(() => {
        dispatch(actions.controlLoading(true))
        // let query = `?items_per_page=${itemsPerPage}&page=${currentPage}&search=${searchString}`
        requestApi(`product/published/all`, 'GET', []).then(response => {
            console.log("response=> ", response)
            setProducts(response.data.metadata)
            setNumOfPage(response.data.lastPage)
            dispatch(actions.controlLoading(false))
        }).catch(err => {
            console.log(err)
            dispatch(actions.controlLoading(false))
        })
    }, [currentPage, itemsPerPage, searchString, refresh])
    return (
        <>
            <div id="layoutSidenav_content">
                <main>
                    <div className="container-fluid px-4">
                        <h1 className="mt-4">Tables</h1>
                        <ol className="breadcrumb mb-4">
                            <li className="breadcrumb-item"><a href="index.html">Dashboard</a></li>
                            <li className="breadcrumb-item active">Tables</li>
                        </ol>
                        <div className='mb-3'>
                            <button type='button' className='btn btn-sm btn-success me-2'><i className="fa fa-plus"></i> Add new</button>
                            {selectedRows.length > 0 && <button type='button' className='btn btn-sm btn-danger' onClick={handleMultiDelete}><i className="fa fa-trash"></i> Delete</button>}
                        </div>
                        <DataTable
                            name="List Products"
                            data={products}
                            columns={columns}
                            numOfPage={numOfPage}
                            currentPage={currentPage}
                            onPageChange={setCurrentPage}
                            onChangeItemsPerPage={setItemsPerPage}
                            onKeySearch={(keyword) => {
                                console.log("keyword in user list comp=> ", keyword)
                                setSearchString(keyword)
                            }}
                            onSelectedRows={rows => {
                                console.log("selected rows in uselist=> ", rows)
                                setSelectedRows(rows)
                            }}
                        />
                    </div>
                </main>
                <Modal show={showModal} onHide={() => setShowModal(false)} size='sm'>
                    <Modal.Header closeButton>
                        <Modal.Title>Confirmation</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        Are you sure want to delete?
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={() => setShowModal(false)}>Close</Button>
                        <Button className='btn-danger' onClick={requestDeleteApi}>Delete</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        </>
    )
}

export default ProductListPublished