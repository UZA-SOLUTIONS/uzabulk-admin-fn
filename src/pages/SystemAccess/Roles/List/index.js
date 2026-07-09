import React, { useEffect, useState } from "react"
import PropTypes from "prop-types"
import { connect, useSelector } from "react-redux"
import { withRouter, Link } from "react-router-dom"
import { isEmpty } from "lodash"
import BootstrapTable from "react-bootstrap-table-next"
import paginationFactory, {
  PaginationListStandalone,
  PaginationProvider,
} from "react-bootstrap-table2-paginator"
import ToolkitProvider, { Search } from "react-bootstrap-table2-toolkit"
import AnimateHeight from "react-animate-height"

import {
  Button,
  Card,
  CardBody,
  Col,
  Container,
  Row,
  Spinner,
} from "reactstrap"

import SearchInput from "components/Common/SearchInput"

//i18n
import { withTranslation } from "react-i18next"

//Import Breadcrumb
import Breadcrumbs from "components/Common/Breadcrumb2"
import { getRoles, deleteRole, putRolesStatus } from "store/actions"
import ListColumns, { selectRow } from "./ListColumns"
import ConfirmModal from "./ConfirmModal"

// Components
import NotFound from "pages/Utility/pages-404-content"

const Roles = ({
  history,
  roles,
  totalRoles,
  onGetRoles,
  onDeleteRole,
  onPutRolesStatus,
  loading,
  activeStoreType,
  ...props
}) => {
  if (
    !props.settings?.hideThings?.find(
      element => element.type === "isSystemAccess"
    )?.value
  ) {
    return <NotFound />
  }

  const [selected, setSelected] = useState([])
  const [confirmModal, setConfirmModal] = useState({
    isOpen: false,
    roleId: null,
  })
  const [confirmSelectedModal, setConfirmSelectedModal] = useState({
    isOpen: false,
  })
  const [filter, setFilter] = useState({
    orderBy: "date_created_utc",
    order: -1,
    page: 0,
    limit: 20,
    search: "",
    fields: [
      {
        fieldName: "",
        fieldValue: "",
      },
    ],
  })
  const user = useSelector(s => s?.Login?.user)
  const role = user?.role || ""
  console.log(role, "role")
  const [searchText, setSearchText] = useState("")
  const [rolesList, setRolesList] = useState([])
  const pageOptions = {
    sizePerPage: 20,
    totalSize: totalRoles,
    custom: true,
    onPageChange: page => setFilter(prevState => ({ ...prevState, page })),
  }
  const { SearchBar } = Search

  useEffect(() => {
    onGetRoles(filter)
    setRolesList(roles)
  }, [onGetRoles, JSON.stringify(filter)])

  useEffect(() => {
    setRolesList(roles || [])
  }, [roles])

  // eslint-disable-next-line no-unused-vars
  const handleTableChange = (type, { searchText, sortField, sortOrder }) => {
    if (type === "search") {
      setSearchText(searchText)
    }

    if (type === "sort") {
      if (sortField == "createdAt") {
        sortField = "date_created_utc"
      }

      if (sortOrder == "desc") {
        sortOrder = -1
      } else if (sortOrder == "asc") {
        sortOrder = 1
      }

      setFilter(prevState => ({
        ...prevState,
        orderBy: sortField,
        order: sortOrder,
      }))
    }
  }

  const toggleConfirmModal = roleId => {
    setConfirmModal(prevState => ({ isOpen: !prevState.isOpen, roleId }))
  }

  const toggleConfirmSelectedModal = () => {
    setConfirmSelectedModal(prevState => ({ isOpen: !prevState.isOpen }))
  }

  const removeConfirm = () => {
    const { roleId, isOpen } = confirmModal

    const onComplete = () => {
      onGetRoles(filter)
    }

    setConfirmModal({ isOpen: !isOpen, roleId: null })
    onDeleteRole({ _id: roleId }, onComplete)
  }

  const removeSelectedConfirm = () => {
    const onComplete = () => {
      setSelected([])
      onGetRoles(filter)
    }

    setConfirmSelectedModal({ isOpen: false })
    onPutRolesStatus({ _id: selected, status: "archived" }, onComplete)
  }

  const onStatusChange = value => {
    const fieldName = !!value ? "status" : ""
    const fieldValue = value

    setFilter(prevState => ({
      ...prevState,
      fields: { fieldName, fieldValue },
    }))
  }

  const onSearch = event => {
    event.preventDefault()

    setFilter(prevState => ({ ...prevState, search: searchText, page: 1 }))
  }

  const onSelect = (row, isSelect) => {
    if (isSelect) {
      setSelected(prevSelected => [...prevSelected, row._id])
    } else {
      setSelected(prevSelected => prevSelected.filter(x => x !== row._id))
    }
  }

  const onSelectAll = (isSelect, rows) => {
    const ids = rows.map(r => r._id)
    if (isSelect) {
      setSelected(ids)
    } else {
      setSelected([])
    }
  }

  const handleRoleStatusChange = status => {
    const callback = () => {
      setSelected([])
      onGetRoles(filter)
    }

    onPutRolesStatus({ _id: selected, status }, callback)
  }

  const lowerCaseStoreType = activeStoreType?.storeType.toLowerCase()
  const handleClick = () => {
    if (role !== "VENDOR") {
      history.push("/roles/add")
    } else {
      history.push(`/${lowerCaseStoreType}/roles/add`)
    }
  }

  return (
    <React.Fragment>
      <ConfirmModal
        isOpen={confirmModal.isOpen}
        toggle={toggleConfirmModal}
        onConfirm={removeConfirm}
      />

      <ConfirmModal
        isOpen={confirmSelectedModal.isOpen}
        toggle={toggleConfirmSelectedModal}
        onConfirm={removeSelectedConfirm}
      />

      <div className="page-content">
        <Container fluid>
          <Breadcrumbs
            title="Roles"
            breadcrumbItem={props.t("roles")}
            breadcrumbItems={[{ title: props.t("roles"), link: "/roles" }]}
          />
          <p>
            <small>{props.t("role_heading")}</small>
          </p>

          <Row>
            <Col xs="12">
              <Card>
                <CardBody>
                  <PaginationProvider
                    pagination={paginationFactory(pageOptions)}
                  >
                    {({ paginationProps, paginationTableProps }) => (
                      <ToolkitProvider
                        keyField="_id"
                        data={rolesList || []}
                        columns={ListColumns(
                          history,
                          toggleConfirmModal,
                          props.t,
                          role,
                          lowerCaseStoreType
                        )}
                        bootstrap4
                        search
                      >
                        {toolkitProps => (
                          <React.Fragment>
                            <Row>
                              <Col
                                className="mb-3"
                                xs={12}
                                md={7}
                                lg={8}
                                xl={7}
                              >
                                <div className="custom-flex-sm d-flex align-items-center">
                                  <div className="filter">
                                    <div className="form-group d-flex align-items-center mb-0">
                                      <label
                                        className="mb-0"
                                        style={{ minWidth: "54px" }}
                                      >
                                        {props.t("filter_by")}:
                                      </label>

                                      <div className="w-auto pl-3">
                                        <select
                                          className="custom-select w-100"
                                          onChange={e =>
                                            onStatusChange(e.target.value)
                                          }
                                          value={filter.fields.fieldValue}
                                          style={{ minWidth: "106px" }}
                                        >
                                          <option value="">
                                            {props.t("all")}
                                          </option>
                                          <option value="active">
                                            {props.t("active")}
                                          </option>
                                          <option value="inactive">
                                            {props.t("inactive")}
                                          </option>
                                        </select>
                                      </div>
                                    </div>
                                  </div>

                                  <div className="search d-flex align-items-center">
                                    <div className="pl-3">
                                      <SearchInput
                                        {...toolkitProps.searchProps}
                                        triggerSearch={onSearch}
                                        placeholder={props.t("search")}
                                        searchText={searchText}
                                      />
                                    </div>

                                    {!!filter.fields.fieldName ||
                                      (!!filter.search && (
                                        <div
                                          className="mr-4"
                                          style={{
                                            minWidth: "73px",
                                          }}
                                        >
                                          <Link
                                            to="#"
                                            onClick={e => {
                                              e.preventDefault()
                                              setFilter(prevState => ({
                                                ...prevState,
                                                fields: {
                                                  fieldName: "",
                                                  fieldValue: "",
                                                },
                                                search: "",
                                              }))
                                              setSearchText("")
                                            }}
                                            className=""
                                          >
                                            {props.t("clear_filters")}
                                          </Link>
                                        </div>
                                      ))}
                                  </div>
                                </div>
                              </Col>

                              <Col
                                className="mb-3"
                                xs={12}
                                md={5}
                                lg={4}
                                xl={5}
                              >
                                <div className="text-sm-left text-md-right">
                                  <Button
                                    type="button"
                                    color="success"
                                    className="btn-rounded waves-effect waves-light mb-2 mr-2"
                                    onClick={handleClick}
                                  >
                                    <i className="mdi mdi-plus mr-1" />
                                    {props.t("add")} {props.t("new")}{" "}
                                    {props.t("role")}
                                  </Button>
                                </div>
                              </Col>
                            </Row>

                            <AnimateHeight
                              duration={500}
                              height={selected.length > 0 ? "auto" : 0}
                            >
                              <div className="custom-flex-xs d-flex align-items-center mb-3">
                                <div className="filter form-group d-flex align-items-center mb-0 mr-3">
                                  <label
                                    className="mb-0"
                                    style={{ minWidth: "48px" }}
                                  >
                                    {props.t("action")}:
                                  </label>

                                  <div className="w-auto pl-3">
                                    <select
                                      className="custom-select w-100"
                                      onChange={e =>
                                        handleRoleStatusChange(e.target.value)
                                      }
                                      style={{ minWidth: "106px" }}
                                    >
                                      <option value="">
                                        {props.t("status")}
                                      </option>
                                      <option value="active">
                                        {props.t("active")}
                                      </option>
                                      <option value="inactive">
                                        {props.t("inactive")}
                                      </option>
                                    </select>
                                  </div>
                                </div>

                                <button
                                  className="btn btn-primary"
                                  onClick={() => toggleConfirmSelectedModal()}
                                >
                                  {props.t("delete")} {props.t("selected")}
                                </button>
                              </div>
                            </AnimateHeight>

                            <Row>
                              <Col xl="12">
                                <div className="table-responsive spinner-content">
                                  <BootstrapTable
                                    responsive
                                    remote
                                    bordered={false}
                                    striped={false}
                                    classes={
                                      "table table-centered table-nowrap"
                                    }
                                    headerWrapperClasses={"thead-light"}
                                    {...toolkitProps.baseProps}
                                    onTableChange={handleTableChange}
                                    {...paginationTableProps}
                                    defaultSorted={[
                                      {
                                        dataField: "createdAt",
                                        order: "desc",
                                      },
                                    ]}
                                    sort={{
                                      sortCaret: order =>
                                        order === "asc" ? (
                                          <span className="caret">
                                            <i className="bx bx-caret-up" />
                                          </span>
                                        ) : order === "desc" ? (
                                          <span className="caret">
                                            <i className="bx bx-caret-down" />
                                          </span>
                                        ) : null,
                                    }}
                                    selectRow={selectRow({
                                      selected,
                                      onSelect,
                                      onSelectAll,
                                    })}
                                  />

                                  {loading && (
                                    <div className="spinner">
                                      <Spinner color="primary" />
                                    </div>
                                  )}
                                </div>
                              </Col>
                            </Row>
                            <Row className="align-items-md-center mt-30">
                              <Col className="pagination pagination-rounded justify-content-end mb-2 inner-custom-pagination">
                                <PaginationListStandalone
                                  {...paginationProps}
                                />
                              </Col>
                            </Row>
                          </React.Fragment>
                        )}
                      </ToolkitProvider>
                    )}
                  </PaginationProvider>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  )
}

Roles.propTypes = {
  roles: PropTypes.array,
  totalRoles: PropTypes.number,
  onGetRoles: PropTypes.func,
  onDeleteRole: PropTypes.func,
  onPutRolesStatus: PropTypes.func,
}

const mapStateToProps = ({ Settings, roles }) => ({
  settings: Settings.settings,
  loading: roles.loading,
  roles: roles.roles,
  totalRoles: roles.totalRoles,
})

const mapDispatchToProps = dispatch => ({
  onGetRoles: data => dispatch(getRoles(data)),
  onDeleteRole: (data, callback) => dispatch(deleteRole(data, callback)),
  onPutRolesStatus: (data, callback) =>
    dispatch(putRolesStatus(data, callback)),
})

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(withTranslation()(Roles))
)
