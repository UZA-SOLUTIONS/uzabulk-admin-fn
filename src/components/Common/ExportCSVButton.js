import { connect } from "react-redux"
import { withRouter, Link } from "react-router-dom"
import { withTranslation } from "react-i18next"
import { Button } from "reactstrap"
import { API_VERSION, BASE_URL } from "helpers/api_helper"

function ExportCsvButton({ url, token, ...props }) {
  return (
    <div className="d-inline-block">
      <form action={BASE_URL + API_VERSION + url} method="post" target="_blank">
        <input type="hidden" name="bearerToken" value={token || ""} />
        <Button
          type="submit"
          color="secondary"
          outline={true}
          className="btn-rounded waves-effect waves-light mb-2 mr-2"
        >
          <i className="dripicons-export mr-1" /> {props.t("export")}
        </Button>
      </form>
    </div>
  )
}

const mapStateToProps = ({ Login }) => ({ token: Login.authToken })

const mapDispatchToProps = dispatch => ({})

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(withTranslation()(ExportCsvButton))
)
