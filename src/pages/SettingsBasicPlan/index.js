import React, { useEffect, useState } from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import { withRouter } from "react-router-dom"

import {
  Button,
  Card,
  CardBody,
  Col,
  Container,
  Row,
  Spinner,
  Alert,
} from "reactstrap"

//i18n
import { withTranslation } from "react-i18next"
import { ROLES } from "helpers/contants"

// Settings
import StoreSettings from "pages/Settings"
import OrderSettings from "pages/FoodDelivery/Settings"
import DeliverySettings from "pages/FoodDelivery/Restaurant/Settings"

const Settings = props => {
  const [activeStoreType, setactiveStoreType] = useState({})

  useEffect(() => {
    if (props?.settings?.storeTypeEnabled) {
      setactiveStoreType(props?.settings?.storeTypeEnabled[0] || {})
    }
  }, [props?.settings])

  return (
    <>
      <OrderSettings
        custom={true}
        activeStoreType={activeStoreType}
        activeStoreId={activeStoreType?._id}
      />

      {props?.currentPlan?.billingPlan?.type !== "premium" && <DeliverySettings
        custom={true}
        activeStoreType={activeStoreType}
        activeStoreId={activeStoreType?._id}
      />}
    </>
  )
}

Settings.propTypes = {}

const mapStateToProps = ({ Settings, Billing }) => ({
  settings: Settings.settings,
  currentPlan: Billing.currentPlan
})

const mapDispatchToProps = dispatch => ({})

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(withTranslation()(Settings))
)
