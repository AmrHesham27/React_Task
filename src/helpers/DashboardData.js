/* eslint-disable prettier/prettier */

export default function DashboardData(invoices, extraDiscountAmount) {
  const getTotalDiscountAmount = () => {
    let totalDiscountAmount = 0
    Object.values(invoices).forEach((invoice) => {
      totalDiscountAmount += invoice['Discount']['amount']
    })
    return totalDiscountAmount
  }

  const getTotalSalesAmount = () => {
    let totalSalesAmount = 0
    Object.values(invoices).forEach((invoice) => {
      totalSalesAmount += invoice['Sales']
    })
    return totalSalesAmount
  }

  const getTotalNetAmounts = () => {
    let totalNetAmount = 0
    Object.values(invoices).forEach((invoice) => {
      totalNetAmount += invoice['Net']
    })
    return totalNetAmount
  }

  const getTotalAmount = () => {
    let totalInvoiceLineValues = 0
    Object.values(invoices).forEach((invoice) => {
      totalInvoiceLineValues += invoice['TotalInvoiceLine']
    })
    let totalAmount = totalInvoiceLineValues - extraDiscountAmount
    return totalAmount
  }

  const getTotalItemsDiscountAmount = () => {
    let totalItemsDiscountAmount = 0
    Object.values(invoices).forEach((invoice) => {
      totalItemsDiscountAmount += invoice['ItemDiscount']
    })
    return totalItemsDiscountAmount
  }

  return {
    getTotalDiscountAmount : () => getTotalDiscountAmount(),
    getTotalSalesAmount : () => getTotalSalesAmount(),
    getTotalNetAmounts : () => getTotalNetAmounts(),
    getTotalAmount : () => getTotalAmount(),
    getTotalItemsDiscountAmount : () => getTotalItemsDiscountAmount(),
  }
}
