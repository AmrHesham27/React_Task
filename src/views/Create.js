/* eslint-disable prettier/prettier */

import React, { useState, useRef } from 'react'
import {
  CRow,
  CCol,
  CCard,
  CCardHeader,
  CCardBody,
  CToast,
  CToastHeader,
  CToastBody,
  CToaster,
} from '@coreui/react'
import { Form, Button } from 'react-bootstrap'
import { NewProduct as NewProductFormat } from 'src/helpers/newProduct'
import CalculateInvoice from '../helpers/Invoice'
import { useContext } from 'react'
import AppContext from 'src/context/AppContext'

const Colors = () => {
  const context = useContext(AppContext)

  const [newProduct, setNewProduct] = useState(NewProductFormat)

  const handleChangePrice = (e) => {
    setNewProduct({ ...newProduct, Price: e.target.value * 100 })
  }

  const handleChangeQuantity = (e) => {
    setNewProduct({ ...newProduct, Quantity: e.target.value })
  }

  const handleChangeDiscountRate = (e) => {
    setNewProduct({
      ...newProduct,
      Discount: { ...newProduct.Discount, rate: e.target.value },
    })
  }

  const handleChangeDiscountAmount = (e) => {
    setNewProduct({
      ...newProduct,
      Discount: { ...newProduct.Discount, amount: e.target.value * 100 },
    })
  }

  const handleChangeExtraDiscount = (e) => {
    setNewProduct({
      ...newProduct,
      ItemDiscount: e.target.value * 100,
    })
  }

  const handleChangeValueDifference = (e) => {
    setNewProduct({
      ...newProduct,
      ValueDifference: e.target.value * 100,
    })
  }

  const [toast, addToast] = useState(0)
  const toaster = useRef()
  const Toast = (
    <CToast color='success'>
      <CToastHeader closeButton>
        <strong>Success</strong>
      </CToastHeader>
      <CToastBody><strong>New Invoice was added successfuly</strong></CToastBody>
    </CToast>
  )

  const handleSubmit = (e) => {
    e.preventDefault()
    const invoice = CalculateInvoice(newProduct)
    context.addInvoice(invoice)
    addToast(Toast) 
  }

  return (
    <>      
      <CToaster ref={toaster} push={toast} placement="top-end" />
      <CCard className="mb-4">
        <CCardHeader>Add Product</CCardHeader>
        <CCardBody>
          <CRow>
            <CCol>
              <Form style={{ maxWidth: '600px', minWidth: '400px' }} onSubmit={handleSubmit}>
                <Form.Group className="my-5">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    onChange={(e) => setNewProduct({ ...newProduct, Name: e.target.value })}
                    type="text"
                    required
                    minLength={4}
                    placeholder="Enter Product Name"
                  />
                </Form.Group>

                <Form.Group className="my-5">
                  <Form.Label>Price</Form.Label>
                  <Form.Control
                    onChange={handleChangePrice}
                    type="number"
                    step={0.1}
                    min={1}
                    required
                    placeholder="Enter Product Price"
                  />
                </Form.Group>

                <Form.Group className="my-5">
                  <Form.Label>Quantity</Form.Label>
                  <Form.Control
                    onChange={handleChangeQuantity}
                    type="number"
                    step={1}
                    min={1}
                    required
                    placeholder="Enter product quantity"
                  />
                </Form.Group>

                <Form.Group className="my-5">
                  <Form.Label>Discount Rate</Form.Label>
                  <Form.Control
                    onChange={handleChangeDiscountRate}
                    type="number"
                    step={1}
                    min={0}
                    max={99}
                    required
                    placeholder="Enter Discount Rate"
                  />
                </Form.Group>

                <Form.Group className="my-5">
                  <Form.Label>Discount Amount</Form.Label>
                  <br />
                  <small>Only if discount rate equals 0</small>
                  <Form.Control
                    onChange={handleChangeDiscountAmount}
                    type="number"
                    step={1}
                    min={0}
                    required
                    placeholder="Enter Discount Amount"
                    disabled={newProduct['Discount']['rate'] !== '0'}
                  />
                </Form.Group>

                <Form.Group className="my-5">
                  <Form.Label>Item Discount</Form.Label>
                  <Form.Control
                    onChange={handleChangeExtraDiscount}
                    type="number"
                    step={1}
                    min={0}
                    required
                    placeholder="Enter Item Discount"
                  />
                </Form.Group>

                <Form.Group className="my-5">
                  <Form.Label>Value Difference</Form.Label>
                  <Form.Control
                    onChange={handleChangeValueDifference}
                    type="number"
                    step={1}
                    min={0}
                    max={99}
                    required
                    placeholder="Enter Value Difference"
                  />
                </Form.Group>

                <Button variant="primary" type="submit">
                  Submit
                </Button>
              </Form>
            </CCol>
          </CRow>
        </CCardBody>
      </CCard>
    </>
  )
}

export default Colors
