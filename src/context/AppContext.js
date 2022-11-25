/* eslint-disable prettier/prettier */
import React from "react";

const AppContext = React.createContext({
  invoices: {},
  addInvoice: (newInvoice) => {},
  deleteInvoice: (id) => {},
  editInvoice: (id, newInvoice) => {}
});

export default AppContext;