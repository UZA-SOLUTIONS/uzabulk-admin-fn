import React, { useEffect } from "react"
import { connect } from "react-redux"
import { withRouter, useParams } from "react-router-dom"

import { clearUserToken, superAdminLogin } from "store/actions"

const LoginByAdmin = props => {
  const { token } = useParams()
  useEffect(() => {
    localStorage.clear()
    props.clearUserToken()
    props.superAdminLogin(token)
    props?.history?.replace("/loading")
  }, [])

  return <></>
}

export default connect(null, { clearUserToken, superAdminLogin })(
  withRouter(LoginByAdmin)
)
