import React from "react"
import _ from "lodash"
import PropTypes from "prop-types"

const Pagination = ({ itmesCount, pageSize, onPageChange, currentPage }) => {
  const pageCount = Math.ceil(itmesCount / pageSize)
  if (pageCount === 1) return null
  const pages = _.range(1, pageCount + 1)
  return (
    <nav>
      <ul className="pagination">
        {pages.map((page) => (
          <li
            className={"page-item" + (page === currentPage ? " active" : "")}
            key={"page_" + page}
          >
            <button className="page-link" onClick={() => onPageChange(page)}>
              {page}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  )
}
Pagination.propTypes = {
  itmesCount: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  currentPage: PropTypes.number.isRequired
}

export default Pagination
