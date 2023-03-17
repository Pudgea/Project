import React from "react"
import TableBody from "./tableBody"
import TableHeader from "./tableHeader"
import PropTypes from "prop-types"

const Table = ({ onSort, selectedSort, colums, data, caret }) => {
  return (
    <table className="table table-hover">
      <TableHeader {...{ onSort, selectedSort, colums, caret }} />
      <TableBody {...{ colums, data }} />
    </table>
  )
}

Table.propTypes = {
  onSort: PropTypes.func,
  selectedSort: PropTypes.object,
  colums: PropTypes.object,
  data: PropTypes.array,
  caret: PropTypes.func
}

export default Table
