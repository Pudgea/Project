import React from "react"
import PropTypes from "prop-types"

const Qualities = ({ obj }) => {
  return (
    <ul>
      {obj.qualities.map((obj) => {
        return (
          <li key={obj.name} className={"badge m-2 bg-" + obj.color}>
            {obj.name}
          </li>
        )
      })}
    </ul>
  )
}
Qualities.propTypes = {
  obj: PropTypes.object.isRequired
}

export default Qualities
