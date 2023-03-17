import React, { useState, useEffect } from "react"
import api from "../api"
import Pagination from "./pagination"
import { paginate } from "../utils/paginate"
import GroupList from "./groupList"
import Counter from "./counter"
import UserTable from "./usersTable"
import _ from "lodash"

const UsersList = () => {
  const [professions, setProfessions] = useState()
  const [selectedProf, setSelectedProf] = useState()
  const [sortBy, setSortBy] = useState({ iter: "name", order: "asc" })

  useEffect(() => {
    setCurrentPage(1)
  }, [selectedProf])
  useEffect(() => {
    api.professions.fetchAll().then((data) => setProfessions(data))
  }, [])

  const pageSize = 4
  const [currentPage, setCurrentPage] = useState(1)

  const [users, setUsers] = useState()
  useEffect(() => {
    api.users.fetchAll().then((data) => setUsers(data))
  }, [])

  const handleBookMark = (obj) => {
    const isBookMark = obj.bookmark
    if (!isBookMark) {
      obj.bookmark = true
      const newArray = users.map((c) => {
        if (c._id === obj._id) {
          return (c = obj)
        } else {
          return c
        }
      })
      setUsers(newArray)
    } else {
      obj.bookmark = false
      const newArray = users.map((c) => {
        if (c._id === obj._id) {
          return (c = obj)
        } else {
          return c
        }
      })
      setUsers(newArray)
    }
  }
  const handDelete = (userId) => {
    setUsers((prevState) => prevState.filter((tag) => tag !== userId))
  }
  const handleProfessionSelect = (item) => {
    setSelectedProf(item)
  }
  const handlePageChange = (pageIndex) => {
    setCurrentPage(pageIndex)
  }
  const handleSort = (item) => {
    setSortBy(item)
  }
  const handleCaret = (item) => {
    if (item.iter === sortBy.iter) {
      if (sortBy.order === "asc") {
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-caret-down-fill"
            viewBox="0 0 16 16"
          >
            <path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z" />
          </svg>
        )
      }
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          className="bi bi-caret-up-fill"
          viewBox="0 0 16 16"
        >
          <path d="m7.247 4.86-4.796 5.481c-.566.647-.106 1.659.753 1.659h9.592a1 1 0 0 0 .753-1.659l-4.796-5.48a1 1 0 0 0-1.506 0z" />
        </svg>
      )
    }
    return ""
  }

  if (users) {
    const filteredUsers = selectedProf
      ? users.filter((obj) => obj.profession._id === selectedProf._id)
      : users
    const sorteredUsers = _.orderBy(
      filteredUsers,
      [sortBy.iter],
      [sortBy.order]
    )
    const userCrop = paginate(sorteredUsers, currentPage, pageSize)
    const clearFilter = () => {
      setSelectedProf()
    }
    const count = filteredUsers.length

    return (
      <div className="d-flex">
        {professions && (
          <div className="d-flex flex-column flex-shrink-0 p-3">
            <GroupList
              selectedItem={selectedProf}
              items={professions}
              onItemSelect={handleProfessionSelect}
              valueProperty="_id"
              contentProperty="name"
            />
            <button
              className="btn btn-secondary mt-2"
              onClick={() => clearFilter()}
            >
              {" "}
              Очистить
            </button>
          </div>
        )}
        <div className="d-flex flex-column">
          <div className="d-flex justify-content-center">
            <Counter user={filteredUsers} />
          </div>
          {count > 0 && (
            <UserTable
              handleBookMark={handleBookMark}
              handDelete={handDelete}
              userCrop={userCrop}
              onSort={handleSort}
              selectedSort={sortBy}
              caret={handleCaret}
            />
          )}{" "}
          <div className="d-flex justify-content-center">
            <Pagination
              itmesCount={count}
              pageSize={pageSize}
              currentPage={currentPage}
              onPageChange={handlePageChange}
            />
          </div>
        </div>
      </div>
    )
  }
  return "loading..."
}

export default UsersList
