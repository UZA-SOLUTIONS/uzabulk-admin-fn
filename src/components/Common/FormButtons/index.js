import React from "react"
import { withTranslation } from "react-i18next"
import PropTypes from "prop-types"

const FormButton = props => {
  return (
    <div
      className={`mt-4 d-flex flex-wrap${props.class ? " " + props.class : ""}`}
    >
      {props.needSubmit && (
        <>
          <button
            id={props.submitId}
            disabled={props.submitDisabled}
            type={props.submitType}
            className="btn btn-primary w-md mb-2 mr-3"
            onClick={props.onSubmit}
          >
            {props.t("submit")}
          </button>

          {props.submitContent}
        </>
      )}

      {props.extraButton}

      {props.needBack && (
        <button
          type="button"
          className="btn outline btn-outline-secondary w-md mb-2"
          onClick={props.goBack}
        >
          <i className="mdi mdi-arrow-left mr-1"></i>
          {props.t("back")}
        </button>
      )}

      {props.loader}
    </div>
  )
}

FormButton.propTypes = {
  needSubmit: PropTypes.bool,
  submitDisabled: PropTypes.bool,
  needBack: PropTypes.bool,
  submitType: PropTypes.string,
  onSubmit: PropTypes.func,
  goBack: PropTypes.func,
}

FormButton.defaultProps = {
  needSubmit: true,
  needBack: true,
  submitDisabled: false,
  submitType: "submit",
  goBack: () => {},
  onSubmit: () => {},
  class: "",
  submitId: "submittooltip",
}

export default withTranslation()(FormButton)
