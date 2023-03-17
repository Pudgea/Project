import React from "react"
import PropTypes from "prop-types"
import BookMark from "./bookmark"
import Qualities from "./qualties"
import Table from "./table"

const UserTable = ({
  handleBookMark,
  handDelete,
  onSort,
  selectedSort,
  userCrop,
  caret
}) => {
  const colums = {
    name: { iter: "name", name: "Имя" },
    qualities: {
      name: "Качество",
      component: (obj) => <Qualities obj={obj} />
    },
    profession: { iter: "profession.name", name: "Профессия" },
    completedMeetings: { iter: "completedMeetings", name: "Встретился, раз" },
    rate: { iter: "rate", name: "Оценка" },
    bookmark: {
      iter: "bookmark",
      name: "Сохранить",
      component: (user) => (
        <button
          className={"btn btn-outline-warning"}
          onClick={() => handleBookMark(user)}
        >
          <BookMark obj={user} />
        </button>
      )
    },
    delete: {
      component: (obj) => (
        <button
          onClick={() => handDelete(obj)}
          type="button"
          className="btn btn-danger"
        >
          Delete
        </button>
      )
    }
  }

  return (
    <Table
      onSort={onSort}
      selectedSort={selectedSort}
      colums={colums}
      data={userCrop}
      caret={caret}
    />
  )
}
UserTable.propTypes = {
  userCrop: PropTypes.array.isRequired,
  handleBookMark: PropTypes.func.isRequired,
  handDelete: PropTypes.func.isRequired,
  onSort: PropTypes.func.isRequired,
  selectedSort: PropTypes.object.isRequired,
  caret: PropTypes.func.isRequired
}

export default UserTable
