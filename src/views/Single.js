/* eslint-disable prettier/prettier */

import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import { CCard, CCardHeader } from '@coreui/react'
import { Table } from 'react-bootstrap'
import { useContext } from 'react'
import AppContext from 'src/context/AppContext'
import Invoice from '../helpers/Invoice'

function Single() {
  const { id } = useParams()

  const { invoices, editInvoice } = useContext(AppContext)

  const [thisInvoice, setThisInvoice] = useState(invoices[id])

  const [discountRateDisabled, setDiscountRateDisabled] = useState(false)
  const [discountAmountDisabled, setDiscountAmountDisabled] = useState(false)

  const handleChangeName = (e) => {
    const newInvoice = { ...thisInvoice, Name: e.target.value }
    editInvoice(id, newInvoice)
    setThisInvoice(newInvoice)
    console.log(newInvoice)
  }

  const handleChangeQuantity = (e) => {
    if (e.target.value === '') e.target.value = 0
    const newInvoice = Invoice({ ...thisInvoice, Quantity: e.target.value })
    editInvoice(id, newInvoice)
    setThisInvoice(newInvoice)
  }

  const handleChangePrice = (e) => {
    if (e.target.value === '') e.target.value = 0
    const newInvoice = Invoice({ ...thisInvoice, Price: e.target.value * 100 })
    editInvoice(id, newInvoice)
    setThisInvoice(newInvoice)
  }

  const handleChangeDiscountRate = (e) => {
    if (e.target.value === '') e.target.value = 0
    const newInvoice = Invoice({
      ...thisInvoice,
      Discount: { ...thisInvoice['Discount'], rate: e.target.value },
    })
    editInvoice(id, newInvoice)
    setThisInvoice(newInvoice)
    if (e.target.value !== ('0' || '')) setDiscountAmountDisabled(true)
    else setDiscountAmountDisabled(false)
  }

  const handleChangeDiscountAmount = (e) => {
    if (e.target.value === '') e.target.value = 0
    const newInvoice = Invoice({
      ...thisInvoice,
      Discount: { ...thisInvoice['Discount'], amount: (e.target.value * 100) },
    })
    editInvoice(id, newInvoice)
    setThisInvoice(newInvoice)
    if (e.target.value !== ('' || '0')) setDiscountRateDisabled(true)
    else setDiscountRateDisabled(false)
  }

  const handleChangeValueDifference = (e) => {
    if (e.target.value === '') e.target.value = 0
    const newInvoice = Invoice({
      ...thisInvoice,
      ValueDifference: e.target.value * 100,
    })
    editInvoice(id, newInvoice)
    setThisInvoice(newInvoice)
  }

  const handleChangeItemDiscount = (e) => {
    if (e.target.value === '') e.target.value = 0
    const newInvoice = Invoice({
      ...thisInvoice,
      ItemDiscount: e.target.value * 100,
    })
    editInvoice(id, newInvoice)
    setThisInvoice(newInvoice)
  }

  return (
    <>
      <CCard>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Name</th>
              <th>Quantity</th>
              <th>Price</th>
              <th>Discount Rate</th>
              <th>Discount Amount</th>
              <th>Sales Total</th>
              <th>Net</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <input
                  onChange={handleChangeName}
                  className="w-100"
                  placeholder={thisInvoice.Name}
                />
              </td>
              <td>
                <input
                  onChange={handleChangeQuantity}
                  className="w-100"
                  placeholder={thisInvoice.Quantity}
                />
              </td>
              <td>
                <input
                  onChange={handleChangePrice}
                  className="w-100"
                  placeholder={(thisInvoice['Price'] / 100).toFixed(2)}
                />
              </td>
              <td>
                <input
                  onChange={handleChangeDiscountRate}
                  className="w-100"
                  placeholder={thisInvoice.Discount['rate']}
                  disabled={discountRateDisabled}
                />
              </td>
              <td>
                <input
                  onChange={handleChangeDiscountAmount}
                  className="w-100"
                  placeholder={(thisInvoice['Discount']['amount'] / 100).toFixed(2)}
                  disabled={discountAmountDisabled}
                />
              </td>
              <td>{(thisInvoice['Sales'] / 100).toFixed(2)}</td>
              <td>{(thisInvoice['Net'] / 100).toFixed(2)}</td>
            </tr>
          </tbody>
        </Table>
      </CCard>

      <CCard className="my-3">
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Total Taxable Amount</th>
              <th>Total Non Taxable Amount</th>
              <th>Value Difference</th>
              <th>Items Discount</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{(thisInvoice.TotalTaxableFees / 100).toFixed(2)}</td>
              <td>{(thisInvoice.TotalNonTaxableFees / 100).toFixed(2)}</td>
              <td>
                <input
                  onChange={handleChangeValueDifference}
                  className="w-100"
                  placeholder={(thisInvoice.ValueDifference / 100).toFixed(2)}
                />
              </td>
              <td>
                <input
                  onChange={handleChangeItemDiscount}
                  className="w-100"
                  placeholder={(thisInvoice.ItemDiscount / 100).toFixed(2)}
                />
              </td>
              <td>{(thisInvoice.TotalInvoiceLine / 100).toFixed(2)}</td>
            </tr>
          </tbody>
        </Table>
      </CCard>

      <CCard className="my-3">
        <CCardHeader>
          <h5>Taxes</h5>
        </CCardHeader>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Type</th>
              <th>Percentage</th>
              <th>Amount</th>
              <th>Notes</th>
            </tr>
          </thead>
          <tbody>
            {invoices &&
              thisInvoice['Tax'].map((tax, index) => {
                const taxableStatus = index > 11 ? 'Non Taxable' : 'Taxable'
                const alert = taxableStatus === 'Non Taxable' ? 'success' : 'secondary'
                return (
                  <tr key={index} className={`alert alert-${alert}`}>
                    <td>{tax.taxType}</td>
                    <td>{tax.rate}</td>
                    <td>{(tax.amount / 100).toFixed(2)}</td>
                    <td>{taxableStatus}</td>
                  </tr>
                )
              })}
          </tbody>
        </Table>
      </CCard>
    </>
  )
}

export default Single
