import React, { useEffect, useState, Fragment } from "react"
import { connect } from "react-redux"
import { withRouter, Link } from "react-router-dom"
import Loading_png from "../../../assets/images/loading.gif"
import Domain_found from "../../../assets/images/verification-img.png"
import Domain_not_found from "../../../assets/images/error-img.png"

import {
  Button,
  Alert,
  Card,
  CardBody,
  Col,
  Container,
  Row,
  FormText,
} from "reactstrap"

//i18n
import { withTranslation } from "react-i18next"

//Import Breadcrumb
import Breadcrumbs from "components/Common/Breadcrumb"

import { isUrl } from "../../../helpers/validations"
import API_MSG from "../../../helpers/Message.json"
import { searchDomain, buyDomain, clearDomain } from "store/actions"

// Components
import NotFound from "pages/Utility/pages-404-content"

const Domains = props => {
  if (
    !props.settings?.hideThings?.find(element => element.type === "isDomain")
      ?.value
  )
    return <NotFound />

  const [domains, setDomains] = useState()
  const [alert, setAlert] = useState({
    class: "success",
    message: null,
  })
  const [search, setSearch] = useState(false)
  const [isSearch, setIsSearch] = useState(false)
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(false)
  const [isAvail, setAvail] = useState(false)
  const [notAvail, setNotAvail] = useState(false)
  const [disabled, setDisabled] = useState(false)

  const handleChange = e => {
    const { value } = e.target
    setDomains(value)

    if (value === "") {
      setSearch({})
      setIsSearch(false)
      setError(false)
      setLoading(false)
      setAvail(false)
      setNotAvail(false)
      setDisabled(true)
      return
    }
    setDisabled(false)
  }
  const searchDomains = e => {
    e.preventDefault()
    setError("")
    setIsSearch(false)
    setDisabled(true)
    if (!isUrl(domains)) {
      setError("Please enter valid domain name")
      return
    }
    setLoading(true)
    props.searchDomain(domains)
    setTimeout(() => {
      setIsSearch(true)
      setDisabled(false)
    }, 500)
  }
  useEffect(() => {
    const { domain, error } = props.domain
    setSearch({ ...domain })

    if (domain && domain.available) {
      setAvail(true)
      setNotAvail(false)
    }
    if (domain && !domain.available) {
      setNotAvail(true)
      setAvail(false)
    }
    setLoading(false)
  }, [props.domain])

  const payForDomain = e => {
    e.preventDefault()
    const data = {
      domain: search.domain,
      price: search.price,
    }
    props.buyDomain(data)
  }

  useEffect(() => {
    const { message, status_code, status } = props.buy

    if (status_code && status_code === 200) {
      setAlert({
        class: "success",
        message: API_MSG[message],
      })
    }
    if (status_code && status_code !== 200) {
      setAlert({
        class: "danger",
        message: API_MSG[message],
      })
    }
    props.clearDomain()
  }, [props.buy])

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <Breadcrumbs
            title="Customers"
            isCenter={true}
            breadcrumbItem={props.t("search_domain")}
          />

          <Row className="justify-content-center">
            <Col xs={12} md={{ size: 6, order: 3 }}>
              <Card>
                <CardBody>
                  <div className="text-center">
                    <form
                      className="app-search d-none d-lg-block"
                      method="post"
                      onSubmit={e => searchDomains(e)}
                    >
                      <Row>
                        <Col md={10} xs={12}>
                          <div className="position-relative">
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Search..."
                              onChange={e => handleChange(e)}
                              style={{ borderRadius: 5 }}
                            />
                            <span className="bx bx-search-alt" />
                          </div>
                          <FormText style={{ color: "red" }}>{error}</FormText>
                        </Col>
                        <Col md={2} xs={12}>
                          <Button color="primary">{props.t("search")}</Button>
                        </Col>
                      </Row>
                    </form>

                    {alert.message ? (
                      <Fragment>
                        <Alert color={alert.class} role="alert">
                          {alert.message}
                        </Alert>
                      </Fragment>
                    ) : (
                      <Fragment>
                        <Row className="justify-content-center">
                          <Col lg="10">
                            <h4 className="mt-4 font-weight-semibold">
                              {`${domains || ""} ${
                                isSearch && search.available
                                  ? props.t("is_available")
                                  : ""
                              }`}
                            </h4>

                            {!loading && isSearch && isAvail && (
                              <div className="mt-4">
                                <h4>
                                  <sup>
                                    <small>$</small>
                                  </sup>
                                  {search.price}
                                  <span className="font-size-13">
                                    {" "}
                                    {props.t("per_year")}
                                  </span>
                                </h4>
                                <Button
                                  type="button"
                                  color="primary"
                                  onClick={payForDomain}
                                  disabled={disabled}
                                >
                                  {props.t("buy_domain")}
                                </Button>
                              </div>
                            )}

                            {!loading && isSearch && notAvail && (
                              <div className="mt-4">
                                <Alert color="danger" role="alert">
                                  {props.t("domain_not_available")}
                                </Alert>
                              </div>
                            )}
                          </Col>
                        </Row>

                        <Row className="justify-content-center mt-5 mb-2">
                          <Col sm="8" xs="8">
                            {loading && (
                              <img
                                src={Loading_png}
                                alt=""
                                className="img-fluid"
                                style={{ width: "33%" }}
                              />
                            )}
                          </Col>
                          <Col sm="8" xs="8">
                            {!loading && isSearch && (isAvail || notAvail) && (
                              <img
                                src={isAvail ? Domain_found : Domain_not_found}
                                alt=""
                                className="img-fluid"
                              />
                            )}
                          </Col>
                        </Row>
                      </Fragment>
                    )}
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  )
}

const mapStateToProps = ({ domain, Settings }) => {
  return {
    domain: domain,
    buy: domain.buy,
    settings: Settings.settings,
  }
}

const mapDispatchToProps = dispatch => ({
  searchDomain: name => dispatch(searchDomain(name)),
  buyDomain: data => dispatch(buyDomain(data)),
  clearDomain: () => dispatch(clearDomain()),
})

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(withTranslation()(Domains))
)
