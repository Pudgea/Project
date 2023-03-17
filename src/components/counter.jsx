import React from "react"
import PropTypes from "prop-types"

const renderPhrase = (titles, user) => {
  const number = user.length
  const cases = [2, 0, 1, 1, 1, 2]
  if (number === 0) {
    return (
      <h1>
        <span className="badge bg-danger">Никто не тусанет с тобой</span>
      </h1>
    )
  }
  if (number > 0) {
    return (
      <h1>
        <span className="badge bg-success">
          {number}{" "}
          {
            titles[
              number % 100 > 4 && number % 100 < 20
                ? 2
                : cases[number % 10 < 5 ? number % 10 : 5]
            ]
          }{" "}
          тусанет с тобой
        </span>
      </h1>
    )
  }
}
const Counter = ({ user }) => {
  return <>{renderPhrase(["человек", "человека", "людей"], user)}</>
}

Counter.propTypes = {
  user: PropTypes.array.isRequired
}

export default Counter
