import React, { useEffect, useState } from "react"
import { connect, useDispatch } from "react-redux"
import { withRouter } from "react-router-dom"
import { withTranslation } from "react-i18next"
import { Card, CardBody, Container, Row, Col } from "react-bootstrap"
import { Form, Formik } from "formik"
import FormikField from "components/Common/FormikField"

const TaxSettings = (props) => {
  return (
    <div className="page-content">
      {/* <ConfirmModal
      isOpen={isDelete}
      toggle={toggleDelete}
      onConfirm={onDeleteConfirm}
    /> */}

      <Container fluid>
        <Formik>
          <Form>
            <Row>
              <Col lg={1} xl={2} className="d-xs-none d-sm-block"></Col>

              <Col lg={10} xl={8}>
                <Card className="store-settings">
                  <CardBody className="spinner-content needs-validation">

                    <div className="label-content">
                      <h4>{props.t("general_settings")}</h4>
                      <p>
                        <small>{props.t("general_settings_int")}</small>
                      </p>
                      <p>
                        <small>
                          <b> {props.t("country_timezone")}:</b>
                          <span>{props.t("country_timezone_int")}</span>
                        </small>
                      </p>
                      <p>
                        <small>
                          <b> {props.t("delivery_multi_type")}:</b>
                          <span>{props.t("delivery_multi_type_int")}</span>
                        </small>
                      </p>

                      <p>
                        <small>
                          <b>{props.t("currency")}:</b>
                          <span>{props.t("currency_int")}</span>
                        </small>
                      </p>
                      <p>
                        <small>
                          <b>{props.t("language")}:</b>
                          <span>{props.t("language_int")}</span>
                        </small>
                      </p>
                      <p>
                        <small>
                          <b>{props.t("distnce_unit")} :</b>
                          <span>{props.t("distance_unit_int")}</span>
                        </small>
                      </p>
                    </div>
                  </CardBody>
                </Card>
              </Col>
            </Row>

            <Row>
              <FormikField
                name="country"
                label="Country"
                className="col-md-3"
              />
            </Row>
          </Form>
        </Formik>
      </Container>
    </div>
  );
}

export default withRouter(connect()(withTranslation()(TaxSettings)))
