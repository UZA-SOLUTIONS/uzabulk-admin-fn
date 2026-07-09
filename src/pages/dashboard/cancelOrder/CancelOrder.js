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
import OrderColumns from "./CancelOrderColumn"

const CancelOrder = props => {
  const { loading, data, currency, slug } = props
  return (
    <React.Fragment>
      <Card>
        <CardBody>
          <CardTitle>{props?.t("recent_cancel_order")}</CardTitle>

          <ToolkitProvider
            keyField="_id"
            data={data || []}
            // columns={OrderColumns(props.t)}
            columns={OrderColumns({
              currentUrl: "",
              t: props?.t,
              sign: currency,
              slug: slug,
            })}
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

CancelOrder.propTypes = {
  t: PropTypes.any,
  data: PropTypes.array,
}

const mapStateToProps = ({}) => ({})

const mapDispatchToProps = dispatch => ({})

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(withTranslation()(CancelOrder))
)
