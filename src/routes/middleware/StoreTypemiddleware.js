import React, { useEffect } from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import { Route, useParams } from "react-router-dom"

import { ROLES } from "helpers/contants"

const StoreTypemiddleware = ({
  component: Component,
  role,
  storeType,
  vendorStoreType,
  isNotStoreType,
  accessLevel,
  store,
  ...rest
}) => {
  useEffect(() => {
    /* if (role === ROLES.vendor || store?.storeVendorType === "SINGLE") {
      const element = document.getElementById("notification-guide")
      const container = document.getElementById("notification-container")

      if (element) {
        element?.classList?.remove("d-none")
      }

      if (container) {
        container.style.marginTop = "25px"
      }
    } */

    return () => {
      // console.log("reject")
    }
  }, [])

  if (isNotStoreType) {
    return (
      <Route
        {...rest}
        render={props => <Component accessLevel={accessLevel} {...props} />}
      />
    )
  }

  return (
    <Route
      {...rest}
      render={props => (
        <Component
          activeStoreType={store}
          {...(!!store ? { activeStoreId: store?._id } : {})}
          accessLevel={accessLevel}
          {...props}
        />
      )}
    />
  )
}

StoreTypemiddleware.propTypes = {
  component: PropTypes.any,
}

const mapStateToProps = ({ Login }) => ({
  role: Login?.user?.role || "",
})

const mapDispatchToProps = dispatch => ({})

export default connect(mapStateToProps, mapDispatchToProps)(StoreTypemiddleware)
