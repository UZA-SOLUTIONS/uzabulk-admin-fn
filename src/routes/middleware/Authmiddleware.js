import React from "react"
import PropTypes from "prop-types"
import { Route } from "react-router-dom"

const Authmiddleware = ({ component: Component, layout: Layout, ...rest }) => (
  <Route
    {...rest}
    render={props => {
      return (
        <Layout>
          <Component {...props} />
        </Layout>
      )
    }}
  />
)

Authmiddleware.propTypes = {
  component: PropTypes.any,
  layout: PropTypes.any,
}

export default Authmiddleware
