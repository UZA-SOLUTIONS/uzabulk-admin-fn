import React from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import { withRouter } from "react-router-dom"

// Translation
import { withTranslation } from "react-i18next"

import PromoCodesComp from "pages/FoodDelivery/PromoCodes/List"

const PromoCodes = props => {
  return <PromoCodesComp {...props} isGloble={true} />
}

PromoCodes.propTypes = {}

const mapStateToProps = ({}) => ({})

const mapDispatchToProps = dispatch => ({})

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(withTranslation()(PromoCodes))
)
