import React, { useState } from "react"

import { Pagination, PaginationItem, PaginationLink } from "reactstrap"

const CustomPagination = props => {
  const [pagination, setpagination] = useState({
    upperPageBound: 4,
    lowerPageBound: 0,
    pageBound: 4,
  })

  const handleArrowButton = (event, arrow, isDisabled) => {
    event.preventDefault()

    if (arrow === "prev" && !isDisabled) {
      handleChangePage(event, props.page - 1)

      if ((props.page - 1) % pagination.pageBound === 0) {
        setpagination(prevState => ({
          ...prevState,
          upperPageBound: prevState.upperPageBound - prevState.pageBound,
          lowerPageBound: prevState.lowerPageBound - prevState.pageBound,
        }))
      }
    }

    if (arrow === "next" && !isDisabled) {
      handleChangePage(event, props.page + 1)

      if (props.page + 1 > pagination.upperPageBound) {
        setpagination(prevState => ({
          ...prevState,
          upperPageBound: prevState.upperPageBound + prevState.pageBound,
          lowerPageBound: prevState.lowerPageBound + prevState.pageBound,
        }))
      }
    }
  }

  const handleChangePage = (event, page) => {
    event.preventDefault()

    props?.setFilter(prevState => ({ ...prevState, page: page }))
  }

  // Logic for displaying page numbers
  const pageNumbers = []
  for (let i = 1; i <= Math.ceil(props.totalCount / props.limit); i++) {
    pageNumbers.push(i)
  }

  const renderPageNumbers = pageNumbers
    .filter(
      number =>
        number < pagination.upperPageBound + 1 &&
        number > pagination.lowerPageBound
    )
    .map(number => {
      return (
        <PaginationItem active={props.page === number} key={number}>
          <PaginationLink onClick={e => handleChangePage(e, number)} href="#">
            {number}
          </PaginationLink>
        </PaginationItem>
      )
    })

  return (
    <Pagination className="pagination pagination-rounded justify-content-center mt-2 mb-5">
      <PaginationItem disabled={props.page === 1}>
        <PaginationLink
          previous
          href="#"
          onClick={e => handleArrowButton(e, "prev", props.page === 1)}
        />
      </PaginationItem>
      {renderPageNumbers}
      <PaginationItem
        disabled={props.page === Math.ceil(props.totalCount / props.limit)}
      >
        <PaginationLink
          next
          href="#"
          onClick={e =>
            handleArrowButton(
              e,
              "next",
              props.page === Math.ceil(props.totalCount / props.limit)
            )
          }
        />
      </PaginationItem>
    </Pagination>
  )
}

export default CustomPagination
