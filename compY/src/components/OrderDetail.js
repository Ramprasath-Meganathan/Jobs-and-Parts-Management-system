import React from 'react'

const OrderDetail = ({ item }) => {
  return (
    <tr>
      <td>{item.partId}</td>
      <td>{item.jobName}</td>
      <td>{item.userId}</td>
      <td>{item.qty}</td>
    </tr >
  )
}

export default OrderDetail
