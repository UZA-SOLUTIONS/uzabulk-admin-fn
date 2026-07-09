import React from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import { withRouter } from "react-router-dom"
import BootstrapTable from "react-bootstrap-table-next"
import ToolkitProvider from "react-bootstrap-table2-toolkit"

//i18n
import { withTranslation } from "react-i18next"

import { Card, CardTitle, CardBody, Col, Row, Spinner } from "reactstrap"

//Import Breadcrumb
import CustomersColumns from "./CustomersColumns"

const Customers = props => {
  const { loading, data, isCustomer } = props

  return (
    <React.Fragment>
      <Card>
        <CardBody>
          <CardTitle>{isCustomer ? props?.t("latest_customers") : props?.t("latest_drivers")}</CardTitle>

          <ToolkitProvider
            keyField="_id"
            data={data || []}
            columns={CustomersColumns(props.t)}
            bootstrap4
            search
          >
            {toolkitProps => (
              <React.Fragment>
                <Row>
                  <Col xl="12">
                    <div className="table-responsive spinner-content">
                      <BootstrapTable
                        responsive
                        remote
                        bordered={false}
                        striped={false}
                        classes={"table table-centered table-nowrap"}
                        headerWrapperClasses={"thead-light"}
                        {...toolkitProps.baseProps}
                      />

                      {loading && (
                        <div className="spinner">
                          <Spinner color="primary" />
                        </div>
                      )}
                    </div>
                  </Col>
                </Row>
              </React.Fragment>
            )}
          </ToolkitProvider>
        </CardBody>
      </Card>
    </React.Fragment>
  )
}

Customers.propTypes = {
  t: PropTypes.any,
  data: PropTypes.array,
}

const mapStateToProps = ({ }) => ({})

const mapDispatchToProps = dispatch => ({})

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(withTranslation()(Customers))
)
