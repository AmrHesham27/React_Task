/* eslint-disable prettier/prettier */

import React, { useState } from 'react'
import { 
  CCard, CCardBody, CCol, CRow, CButton, 
  CModal, CModalHeader, CModalTitle, CModalBody, CModalFooter
} from '@coreui/react'
import Table from 'react-bootstrap/Table'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faEye } from '@fortawesome/free-solid-svg-icons'
import { useContext } from "react"
import AppContext from "../context/AppContext";
import CalculateDashboardData from 'src/helpers/DashboardData'


const Dashboard = () => {
  const { invoices, deleteInvoice } = useContext(AppContext);
  
  const [itemToBeDeleted, setItemToBeDeleted] = useState(false);

  const handleDeleteInvoice = () => {
    deleteInvoice(itemToBeDeleted)
    setItemToBeDeleted(false)
  } 

  const [extraDiscountAmount, setExtraDiscountAmount] = useState(0)

  const handleChangeExtraDiscount = (e) => {
    setExtraDiscountAmount(e.target.value)
  }

  return (
    <>
      {itemToBeDeleted && 
        <CModal visible={itemToBeDeleted} onClose={() => setItemToBeDeleted(false)}>
          <CModalHeader onClose={() => setItemToBeDeleted(false)}>
            <CModalTitle>Are you sure?</CModalTitle>
          </CModalHeader>
          <CModalBody>You will delete Invoice with ID: {itemToBeDeleted} </CModalBody>
          <CModalFooter>
            <CButton color="secondary" onClick={() => setItemToBeDeleted(false)}>
              Close
            </CButton>
            <CButton color="danger" onClick={handleDeleteInvoice}>Delete</CButton>
          </CModalFooter>
        </CModal>
      }
      <CCard className='mb-4'>
        <CCardBody>
          <Table>
            <thead>
              <tr>
                <th>Total Discount Amount</th>
                <th>Total Sales Amount</th>
                <th>Net Amount</th>
                <th>Extra Discount Amount</th>
                <th>Total Amount</th>
                <th>Total Items Discount Amount</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  { 
                    invoices && ( CalculateDashboardData(invoices, extraDiscountAmount * 100)
                    .getTotalDiscountAmount() / 100 ).toFixed(2)
                  }
                </td>
                <td>
                  {
                    invoices && ( CalculateDashboardData(invoices, extraDiscountAmount * 100)
                    .getTotalSalesAmount() / 100 ).toFixed(2)
                  }
                </td>
                <td>
                  {
                    invoices && ( CalculateDashboardData(invoices, extraDiscountAmount * 100)
                    .getTotalNetAmounts() / 100 ).toFixed(2)
                  }
                </td>
                <td>
                  <input
                    onChange={handleChangeExtraDiscount}
                    className="w-100"
                    placeholder={extraDiscountAmount}
                    type='number'
                    min={0}
                    step={0}
                  />
                </td>
                <td>
                  {
                    invoices && ( CalculateDashboardData(invoices, extraDiscountAmount * 100)
                    .getTotalAmount() / 100 ).toFixed(2)
                  }
                </td>
                <td>
                  {
                    invoices && ( CalculateDashboardData(invoices, extraDiscountAmount * 100)
                    .getTotalItemsDiscountAmount() / 100 ).toFixed(2)
                  }
                </td>
              </tr>
            </tbody>
          </Table>
        </CCardBody>
      </CCard>

      <CCard className="mb-4">
        <CCardBody>
          <CRow className="d-flex justify-content-between">
            <CCol sm={5}>
              <h4 className="card-title my-2">All Products</h4>
            </CCol>
            <CCol sm={4} className="d-flex justify-content-end">
              <a className="m-3 btn btn-success" href='/#/create'>
                Add Product
              </a>
            </CCol>
          </CRow>
          <CRow>
            <CCol sm={12} className="d-none d-md-block">
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Price</th>
                    <th>Quantity</th>
                    <th>Sales</th>
                    <th>Discount</th>
                    <th>Discount Amount</th>
                    <th>Net</th>
                    <th>Value Difference</th>
                    <th>Item Discount</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    invoices && Object.entries(invoices).map(invoice => {
                      return (
                      <tr key={invoice[0]}>
                        <td>{invoice[0]}</td>
                        <td>{invoice[1].Name}</td>
                        <td>{invoice[1].Price / 100}</td>
                        <td>{invoice[1].Quantity}</td>
                        <td>{invoice[1].Sales / 100}</td>
                        <td>{invoice[1].Discount['rate']}</td>
                        <td>{invoice[1].Discount['amount'] / 100}</td>
                        <td>{invoice[1].Net / 100}</td>
                        <td>{invoice[1].ValueDifference / 100}</td>
                        <td>{invoice[1].ItemDiscount / 100}</td>
                        <td>
                          <a className="btn btn-primary mx-2 my-2" href={`/#/invoice/${invoice[0]}`}>
                            <FontAwesomeIcon icon={faEye} />
                          </a>
                          <button className="btn btn-danger mx-2 my-2" onClick={() => setItemToBeDeleted(invoice[0])} >
                            <FontAwesomeIcon icon={faTrash}/>
                          </button>
                        </td>
                      </tr>)
                    })
                  }
                  
                </tbody>
              </Table>
            </CCol>
          </CRow>
        </CCardBody>
      </CCard>
    </>
  )
}

export default Dashboard
