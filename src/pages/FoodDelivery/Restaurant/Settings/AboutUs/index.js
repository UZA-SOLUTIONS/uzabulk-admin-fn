import React, { useEffect, useState } from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import { withRouter } from "react-router-dom"
import CKEditor from "react-ckeditor-component"

import {
  Row,
  Col,
  Form,
  FormGroup,
  Label,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
} from "reactstrap"

const AboutUs = props => {
  const { fields, handleChange } = props

  return (
    <Row>
      <Col md={12}>
        <FormGroup>
          <Label className="fw-bold">{props.t("About Us")}</Label>

          <CKEditor
            content={fields.aboutUs}
            events={{
              change: evt => {
                const data = evt?.editor?.getData()

                handleChange("aboutUs")({
                  target: { value: data },
                })
              },
            }}
            config={{
              height: 250,
              toolbar: [
                [
                  "Undo",
                  "Redo",
                  "Font",
                  "FontSize",
                  "Styles",
                  "Format",
                  "-",
                  "Maximize",
                  "-",
                  "Source",
                ],
                [
                  "Bold",
                  "Italic",
                  "Underline",
                  "Strike",
                  "-",
                  "RemoveFormat",
                  "-",
                  "NumberedList",
                  "BulletedList",
                ],
                [
                  "Link",
                  "Unlink",
                  "-",
                  "JustifyLeft",
                  "JustifyCenter",
                  "JustifyRight",
                  "JustifyBlock",
                  "-",
                  "Outdent",
                  "Indent",
                  "-",
                  "TextColor",
                  "BGColor",
                ],
                [
                  "Image",
                  "Table",
                  "HorizontalRule",
                  "SpecialChar",
                  "-",
                  "Blockquote",
                ],
              ],
            }}
            scriptUrl="https://cdn.ckeditor.com/4.16.0/full/ckeditor.js"
          />
        </FormGroup>
      </Col>

      <Col md={6}>
        <FormGroup>
          <Label className="fw-bold">{props.t("Website")}</Label>

          <Input
            type="text"
            value={fields?.website}
            onChange={handleChange("website")}
          />
        </FormGroup>
      </Col>
      <Col md={6}>
        <FormGroup>
          <Label className="fw-bold">{props.t("Members")}</Label>

          <Input
            type="number"
            min={0}
            value={fields?.member}
            onChange={handleChange("member")}
          />
        </FormGroup>
      </Col>
    </Row>
  )
}

AboutUs.propTypes = {}

const mapStateToProps = ({}) => ({})

const mapDispatchToProps = dispatch => ({})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AboutUs))
