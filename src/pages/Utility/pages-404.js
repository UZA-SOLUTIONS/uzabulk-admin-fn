import React from "react"
import { Link } from "react-router-dom"
import { Container, Row, Col } from "reactstrap"

import VerticalLayout from "components/VerticalLayout/"

import { withTranslation } from "react-i18next"

//Import
import Content from "./pages-404-content"

const Pages404 = props => {
  return (
    <VerticalLayout>
      <Content />
    </VerticalLayout>
  )
}

export default withTranslation()(Pages404)
