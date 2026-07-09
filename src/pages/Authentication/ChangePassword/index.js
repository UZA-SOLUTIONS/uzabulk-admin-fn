import React, { useEffect, useState } from "react"
import PropTypes from "prop-types"
import { withRouter } from "react-router-dom"
import { connect } from "react-redux"
import FormButton from "components/Common/FormButtons"

import {
  Card,
  CardBody,
  Col,
  Container,
  Row,
  Form,
  FormGroup,
  Label,
  Input,
  Alert,
  Spinner,
} from "reactstrap"

import { putChangePwd, putChangePwdError } from "store/actions"

//Import Breadcrumb
import Breadcrumbs from "components/Common/Breadcrumb2"

//i18n
import { withTranslation } from "react-i18next"

const AddDriver = ({ history, error, onPutChangePwd, loading, ...props }) => {
  const [fields, setFields] = useState({
    currentPassword: "",
    password: "",
    confirmPassword: "",
  })

  useEffect(() => {
    props.putChangePwdError()
  }, [])

  const handleChange = name => event => {
    setFields(prevState => ({ ...prevState, [name]: event.target.value }))
  }

  const onSubmit = event => {
    event.preventDefault()

    if (loading) return

    const callback = () => {
      history.replace("/profile")
    }

    onPutChangePwd(fields, callback)
  }

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <Breadcrumbs
            breadcrumbItem={props.t("edit") + " " + props.t("profile")}
            breadcrumbItems={[
              {
                title: props.t("change_password"),
              },
            ]}
          />

          <Row>
            <Col xs={12} md={6}>
              <Card>
                <CardBody>
                  <Form onSubmit={onSubmit} className="spinner-content">
                    {error && typeof error === "string" ? (
                      <Alert color="danger">{error}</Alert>
                    ) : null}

                    <Row>
                      <Col md={12}>
                        <FormGroup>
                          <Label for="formrow-firstname-Input">
                            {props.t("current_password")}<span className="text-danger ml-1">*</span>
                          </Label>
                          <Input
                            type="password"
                            className="form-control"
                            id="formrow-firstname-Input"
                            value={fields.currentPassword || ""}
                            onChange={handleChange("currentPassword")}
                            required
                          />
                        </FormGroup>
                      </Col>

                      <Col md={12}>
                        <FormGroup>
                          <Label for="formrow-email-Input">
                            {props.t("password")}<span className="text-danger ml-1">*</span>
                          </Label>
                          <Input
                            type="password"
                            className="form-control"
                            id="formrow-email-Input"
                            value={fields.password || ""}
                            onChange={handleChange("password")}
                            required
                          />
                        </FormGroup>
                      </Col>

                      <Col md={12}>
                        <FormGroup>
                          <Label for="formrow-confirmPassword-Input">
                            {props.t("confirm_password")}<span className="text-danger ml-1">*</span>
                          </Label>
                          <Input
                            type="password"
                            className="form-control"
                            id="formrow-confirmPassword-Input"
                            value={fields.confirmPassword || ""}
                            onChange={handleChange("confirmPassword")}
                            required
                          />
                        </FormGroup>
                      </Col>
                    </Row>

                    <FormButton goBack={() => history.goBack()} />

                    {loading && (
                      <div className="spinner">
                        <Spinner color="primary" />
                      </div>
                    )}
                  </Form>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  )
}

AddDriver.propTypes = {
  loading: PropTypes.bool,
  error: PropTypes.string,
  onPutChangePwd: PropTypes.func,
}

const mapStateToProps = ({ Profile }) => ({
  error: Profile.error,
  loading: Profile.loading,
})

const mapDispatchToProps = dispatch => ({
  onPutChangePwd: (data, callback) => dispatch(putChangePwd(data, callback)),
  putChangePwdError: data => dispatch(putChangePwdError(data)),
})

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(withTranslation()(AddDriver))
)
