import React, { useEffect, useState } from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import { withRouter, Link } from "react-router-dom"
import { isEmpty } from "lodash"
import BootstrapTable from "react-bootstrap-table-next"
import paginationFactory, {
  PaginationListStandalone,
  PaginationProvider,
} from "react-bootstrap-table2-paginator"
import ToolkitProvider from "react-bootstrap-table2-toolkit"

import {
  Card,
  CardBody,
  CardTitle,
  Col,
  Container,
  Row,
  Button,
  Spinner,
} from "reactstrap"

//i18n
import { withTranslation } from "react-i18next"

//Import Breadcrumb
import Breadcrumbs from "components/Common/Breadcrumb2"
import { getNotifications } from "store/actions"

import ViewModal from "./ViewModal"
import ListColumns from "./ListColumns"

const Notifications = ({
  accessLevel,
  history,
  notifications,
  totalNotifications,
  onGetNotifications,
  loading,
  ...props
}) => {
  const [accesses, setaccesses] = useState({
    canAdd: false,
  })
  const [viewModal, setViewModal] = useState({
    isOpen: false,
    notificationId: null,
    row: null,
  })
  const [filter, setFilter] = useState({
    orderBy: "date_created_utc",
    order: -1,
    page: 0,
    limit: 50,
  })
  const [notificationsList, setNotificationsList] = useState([])
  const pageOptions = {
    sizePerPage: 20,
    totalSize: totalNotifications,
    custom: true,
    onPageChange: page => setFilter(prevState => ({ ...prevState, page })),
  }

  useEffect(() => {
    if (!accessLevel) {
      const data = {
        canAdd: true,
      }

      return setaccesses(data)
    }

    const data = {
      canAdd: false,
    }

    accessLevel?.map(item => {
      switch (item.label) {
        case "CREATE":
          data.canAdd = item.value
          break
      }
    })

    setaccesses(data)
  }, [JSON.stringify(accessLevel)])

  useEffect(() => {
    onGetNotifications(filter)
    setNotificationsList(notifications)
  }, [onGetNotifications, JSON.stringify(filter)])

  useEffect(() => {
    setNotificationsList(notifications || [])
  }, [notifications])

  const toggleViewModal = (notificationId, row) => {
    setViewModal(prevState => ({
      isOpen: !prevState.isOpen,
      notificationId,
      row,
    }))
  }

  return (
    <React.Fragment>
      <ViewModal
        isOpen={viewModal.isOpen}
        row={viewModal.row}
        toggle={toggleViewModal}
      />

      <div className="page-content">
        <Container fluid>
          <Breadcrumbs
            title="Notifications"
            breadcrumbItem={props.t("notifications")}
            breadcrumbItems={[
              { title: props.t("notifications"), link: "/notifications" },
            ]}
          />

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
                        data={notificationsList || []}
                        columns={ListColumns(history, toggleViewModal, props.t)}
                        bootstrap4
                        search
                      >
                        {toolkitProps => (
                          <React.Fragment>
                            <Row className="mb-2">
                              <Col>
                                <div className="text-sm-right">
                                  {accesses.canAdd && (
                                    <Button
                                      type="button"
                                      color="success"
                                      className="btn-rounded waves-effect waves-light mb-2 mr-2"
                                      onClick={() =>
                                        history.push("/notifications/add")
                                      }
                                    >
                                      <i className="mdi mdi-plus mr-1" />
                                      {props.t("send_new_notification")}
                                    </Button>
                                  )}
                                </div>
                              </Col>
                            </Row>

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
                                    {...paginationTableProps}
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

Notifications.propTypes = {
  notifications: PropTypes.array,
  totalNotifications: PropTypes.number,
  onGetNotifications: PropTypes.func,
}

const mapStateToProps = ({ notifications }) => ({
  loading: notifications.loading,
  notifications: notifications.notifications,
  totalNotifications: notifications.totalNotifications,
})

const mapDispatchToProps = dispatch => ({
  onGetNotifications: data => dispatch(getNotifications(data)),
})

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(withTranslation()(Notifications))
)
