import React from "react"
import { Button } from "reactstrap"

const SearchInput = props => {
  const handleClick = event => {
    props?.triggerSearch(event)
  }

  return (
    <div className="search-box inline-button mr-2 d-inline-block">
      <div className="position-relative">
        <label for="search-bar-0" className="search-label mb-0">
          <span id="search-bar-0-label" className="sr-only">
            Search this table
          </span>
          <input
            id="search-bar-0"
            aria-labelledby="search-bar-0-label"
            className="form-control"
            type="text"
            placeholder={props?.placeholder}
            onKeyPress={e =>
              ["Enter", "NumpadEnter"].includes(e.code) ? handleClick(e) : null
            }
            onChange={e => props.onSearch(e.target.value)}
            value={props?.searchText}
          />
        </label>

        <Button
          type="button"
          color="primary"
          className="btn-sm btn-rounded search-icon-btn"
          onClick={handleClick}
        >
          <i className="bx bx-search-alt" />
        </Button>
      </div>
    </div>
  )
}

export default SearchInput
