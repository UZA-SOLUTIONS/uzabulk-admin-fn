import React from "react"
import { withRouter } from "react-router-dom"
import { connect } from "react-redux"

// Translation
import { withTranslation } from "react-i18next"

//Import Breadcrumb
import AddPromoCodeComp from "pages/FoodDelivery/PromoCodes/AddEdit"

const AddPromoCode = props => {
  return <AddPromoCodeComp {...props} isGloble={true} />
}

AddPromoCode.propTypes = {}

const mapStateToProps = ({}) => ({})

const mapDispatchToProps = dispatch => ({})

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(withTranslation()(AddPromoCode))
)
