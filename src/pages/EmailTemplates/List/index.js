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
  Spinner,
} from "reactstrap"

//i18n
import { withTranslation } from "react-i18next"

//Import Breadcrumb
import Breadcrumbs from "components/Common/Breadcrumb2"
import { getEmailTemplates } from "store/actions"
import ListColumns from "./ListColumns"

// Components
import NotFound from "pages/Utility/pages-404-content"

const EmailTemplates = ({
  history,
  emailTemplates,
  totalEmailTemplates,
  onGetEmailTemplates,
  loading,
  ...props
}) => {
  if (
    !props.settings?.hideThings?.find(
      element => element.type === "isEmailTemplates"
    )?.value
  ) {
    return <NotFound />
  }

  const [filter, setFilter] = useState({
    orderBy: "date_created_utc",
    order: -1,
    page: 0,
    limit: 50,
  })
  const [emailTemplatesList, setEmailTemplatesList] = useState([])
  const pageOptions = {
    sizePerPage: 20,
    totalSize: totalEmailTemplates,
    custom: true,
    onPageChange: page => setFilter(prevState => ({ ...prevState, page })),
  }

  useEffect(() => {
    onGetEmailTemplates(filter)
    setEmailTemplatesList(emailTemplates)
  }, [onGetEmailTemplates, JSON.stringify(filter)])

  useEffect(() => {
    setEmailTemplatesList(emailTemplates || [])
  }, [emailTemplates])

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <Breadcrumbs
            title="Email Templates"
            breadcrumbItem={props.t("Email Templates")}
            breadcrumbItems={[
              { title: props.t("email_templates"), link: "/email-templates" },
            ]}
          />

          <Row className="spinner-content">
            {emailTemplatesList?.map(item => (
              <Col md={6} lg={12} xl={6}>
                <Card>
                  <CardBody>
                    <CardTitle className="text-capitalize">
                      {item._id}
                    </CardTitle>

                    {item?.templates?.map(template => (
                      <Row key={template._id} className="py-2 border-bottom">
                        <Col xs={12} sm={5} md={4}>
                          <Link
                            to={`/email-templates/${template._id}/edit`}
                            className="p-0 waves-effect waves-light btn-sm font-weight-bold font-size-13"
                          >
                            {template.title}
                          </Link>
                        </Col>

                        <Col xs={12} sm={7} md={8}>
                          {template.description}
                        </Col>
                      </Row>
                    ))}
                  </CardBody>
                </Card>
              </Col>
            ))}

            {loading && (
              <div className="spinner">
                <Spinner color="primary" />
              </div>
            )}
          </Row>
        </Container>
      </div>
    </React.Fragment>
  )

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <Breadcrumbs
            title="Email Templates"
            breadcrumbItem="Email Templates"
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
                        data={emailTemplatesList || []}
                        columns={ListColumns(history)}
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

EmailTemplates.propTypes = {
  emailTemplates: PropTypes.array,
  totalEmailTemplates: PropTypes.number,
  onGetEmailTemplates: PropTypes.func,
}

const mapStateToProps = ({ Settings, emailtemplates }) => ({
  settings: Settings.settings,
  loading: emailtemplates.loading,
  emailTemplates: emailtemplates.emailTemplates,
  totalEmailTemplates: emailtemplates.totalEmailTemplates,
})

const mapDispatchToProps = dispatch => ({
  onGetEmailTemplates: data => dispatch(getEmailTemplates(data)),
})

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(withTranslation()(EmailTemplates))
)
