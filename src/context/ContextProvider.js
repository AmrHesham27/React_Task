/* eslint-disable prettier/prettier */
/* eslint-disable react/react-in-jsx-scope */

import { useState } from 'react'
import AppContext from './AppContext'
import { NewProduct } from 'src/helpers/newProduct'
import CalculateInvoice from 'src/helpers/Invoice'

const InvoicesProvider = (props) => {
  const [invoices, setInvoices] = useState({
    1: CalculateInvoice({
        ...NewProduct,
        Name: 'iPad',
        Price: 2000,
        Quantity: 10,
        Discount: { amount: 0, rate: 0 },
        ItemDiscount: 0,
        ValueDifference: 200,
    }),
    2: CalculateInvoice({
        ...NewProduct, 
        Name: 'iPhone', 
        Price: 3000, 
        Quantity: 10,
        Discount: { amount: 0, rate: 10 },
        ItemDiscount: 500,
        ValueDifference: 0,
    }),
    3: CalculateInvoice({
        ...NewProduct, 
        Name: 'Card', 
        Price: 3000, 
        Quantity: 10,
        Discount: { amount: 4000, rate: 0 },
        ItemDiscount: 200,
        ValueDifference: 100,
    }),
  })

  const cartContext = {
    invoices,
    addInvoice: (newInvoice) => {
        const newIndex = +Object.keys(invoices)[Object.keys(invoices).length - 1] + 1;
        let newInvoicesObject = invoices;
        newInvoicesObject[newIndex] = newInvoice;
        setInvoices(newInvoicesObject) 
    },
    deleteInvoice: (id) => {
      let invoicesObject = invoices;
      delete invoicesObject[id];
      setInvoices(invoicesObject)
    },
    editInvoice: (id, newInvoice) => {
      let invoicesObject = invoices
      invoicesObject[id] = newInvoice
      setInvoices(invoicesObject)
    }
  }

  // eslint-disable-next-line react/prop-types
  return <AppContext.Provider value={cartContext}>{props.children}</AppContext.Provider>
}

export default InvoicesProvider
