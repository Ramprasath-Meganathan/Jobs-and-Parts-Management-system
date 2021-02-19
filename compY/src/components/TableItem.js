import React from 'react'



const TableItem = ({ item }) => {
  return (
    <tr>
      <td>{item.partId}</td>
      <td>{item.partName}</td>
      <td>{item.qoh}</td>
    </tr>
  )
}

export default TableItem
