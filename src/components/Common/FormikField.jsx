import { withTranslation } from "react-i18next";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom"

const { Field, ErrorMessage } = require("formik");
const { FormGroup } = require("react-bootstrap");
const { Label } = require("reactstrap");

const FormikFiled = ({ t, label = "", name, placeholder = "", type = "text", inputClass = "", className = "" }) => {
    return (
        <>
            <FormGroup className={className}>
                <Label htmlFor={name}>{t(label)}</Label>
                <Field name={name} type={type} className={`form-control ${inputClass}`} placeholder={t(placeholder)} />
                <ErrorMessage name={name} component={"p"} className="text-danger" />
            </FormGroup>
        </>
    );
}

export default withRouter(connect()(withTranslation()(FormikFiled)));