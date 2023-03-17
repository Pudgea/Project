import React from "react"
import PropTypes from "prop-types"

const TableHeader = ({ onSort, selectedSort, colums, caret }) => {
  const handleSort = (item) => {
    if (selectedSort.iter === item) {
      onSort({
        ...selectedSort,
        order: selectedSort.order === "asc" ? "desc" : "asc"
      })
    } else {
      onSort({ iter: item, order: "asc" })
    }
  }
  return (
    <thead>
      <tr>
        {Object.keys(colums).map((column) => (
          <th
            key={column}
            onClick={
              colums[column].iter
                ? () => handleSort(colums[column].iter)
                : undefined
            }
            {...{ role: colums[column].iter && "button" }}
            scope="col"
          >
            {colums[column].name}
            {caret(colums[column])}
          </th>
        ))}
      </tr>
    </thead>
  )
}
TableHeader.propTypes = {
  onSort: PropTypes.func.isRequired,
  selectedSort: PropTypes.object.isRequired,
  colums: PropTypes.object.isRequired,
  caret: PropTypes.func.isRequired
}

export default TableHeader
