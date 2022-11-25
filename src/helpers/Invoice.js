/* eslint-disable prettier/prettier */

function CalculateInvoice(newProduct) {
  const getSales = (Quantity, Price) => {
    const Sales = +Quantity * +Price
    return Sales
  }

  const getDiscountAmount = (DiscountRate, DiscountAmount, Sales) => {
    let newDiscountAmount = 0;
    if (+DiscountRate !== 0) {
      newDiscountAmount = Math.floor((+DiscountRate / 100) * +Sales)
    }
    else if (+DiscountRate === 0 && +DiscountAmount) { 
      newDiscountAmount = +DiscountAmount
    }
    return newDiscountAmount
  }

  const getNet = (Sales, DiscountAmount) => {
    return (+Sales - +DiscountAmount)
  }

  const getTaxes_from_3_to_20 = (ProductTax, Net, ItemDiscount) => {
    let Tax = [...newProduct.Tax]
    ProductTax.forEach((tax, index) => {
      if (![0, 1, 2, 3, 5].includes(index)) {
        const newAmount = (+tax.rate * Net) / 100
        Tax[index].amount = newAmount
      }
    })
    Tax[2].amount = 3000
    Tax[3].amount = (Net - +ItemDiscount) * (+Tax[3].rate / 100)
    Tax[5].amount = 6000

    return Tax
  }

  const getTaxes_from_1_to_2 = (Tax, Net, ValueDifference, TotalTaxableFees) => {
    Tax[1].amount =
      (Net + TotalTaxableFees + +ValueDifference + +Tax[2].amount) * (+Tax[1].rate / 100)

    Tax[0].amount =
      (Net + TotalTaxableFees + +ValueDifference + +Tax[2].amount + +Tax[1].amount) *
      (+Tax[0].rate / 100)

    return Tax
  }

  const getTotalTaxableFees = (Tax) => {
    let TotalTaxableFees = 0
    Tax.forEach((tax, index) => {
      if (index >= 4 && index <= 11) TotalTaxableFees += tax.amount
    })
    return TotalTaxableFees
  }

  const getTotalNonTaxableFees = (Tax) => {
    let TotalNonTaxableFees = 0
    Tax.forEach((tax, index) => {
      if (index <= 19 && index >= 12) TotalNonTaxableFees += tax.amount
    })
    return TotalNonTaxableFees
  }

  const getTotalInvoiceLine = (Net, Tax, TotalTaxableFees, TotalNonTaxableFees, ItemDiscount) => {
    return (
      Net +
      +Tax[0].amount +
      +Tax[1].amount +
      +Tax[2].amount +
      TotalTaxableFees +
      TotalNonTaxableFees -
      +Tax[3].amount -
      +ItemDiscount
    )
  }

  const getInvoice = () => {
    const Sales = getSales(newProduct.Quantity, newProduct.Price)

    const DiscountAmount = getDiscountAmount(
      newProduct.Discount['rate'],
      newProduct.Discount['amount'],
      Sales
    )

    const Net = getNet(Sales, DiscountAmount)

    let Tax = getTaxes_from_3_to_20(newProduct.Tax, Net, newProduct.ItemDiscount)

    const TotalTaxableFees = getTotalTaxableFees(Tax)

    Tax = getTaxes_from_1_to_2(Tax, Net, newProduct.ValueDifference, TotalTaxableFees)

    const TotalNonTaxableFees = getTotalNonTaxableFees(Tax)

    const TotalInvoiceLine = getTotalInvoiceLine(
      Net,
      Tax,
      TotalTaxableFees,
      TotalNonTaxableFees,
      newProduct.ItemDiscount,
    )

    const invoice = {
      ...newProduct,
      Sales,
      Net,
      Tax,
      TotalTaxableFees,
      TotalNonTaxableFees,
      TotalInvoiceLine,
      Discount: { ...newProduct.Discount, amount: DiscountAmount },
    }

    return invoice
  }

  return getInvoice()
}

export default CalculateInvoice
