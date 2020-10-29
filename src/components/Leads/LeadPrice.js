import React from 'react'
import { formatAmountDisplay, formatCurrency } from '../Helpers/helpers'

function LeadPrice({ price }) {
  if (price) {
      return (
        <div className="font-weight-bold text-primary">
          <span>{formatAmountDisplay(price.amount)}</span>
          <span> {formatCurrency(price.currency)}</span>
        </div>
      )
  } else {
    return <div className="text-white">Geliyor</div>
  }
}

export default LeadPrice
