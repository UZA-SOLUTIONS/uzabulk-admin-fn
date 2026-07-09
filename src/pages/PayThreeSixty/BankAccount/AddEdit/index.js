import React, { useEffect, useRef, useState } from "react"
import PropTypes from "prop-types"
import { withRouter, useParams, Link } from "react-router-dom"
import { connect } from "react-redux"
import AnimateHeight from "react-animate-height"
import queryString from "query-string"
import FormButton from "components/Common/FormButtons"

import {
    Card,
    CardBody,
    Col,
    Container,
    Row,
    Form,
    FormGroup,
    Label,
    Input,
    Alert,
    Spinner,
    UncontrolledTooltip,
    CardTitle,
} from "reactstrap"

import { GET_SERVICE_NAME, ROLES } from "helpers/contants"

import { addBankAccount, addFdAttribute, getFdAttribute, putFdAttribute } from "store/actions"

//Import Breadcrumb
import Breadcrumbs from "components/Common/Breadcrumb2"

//i18n
import { withTranslation } from "react-i18next"

const AddBankAccount = ({
    accessLevel,
    role,
    vendorId,
    history,
    error,
    onAddFdAttribute,
    onGetFdAttribute,
    onPutFdAttribute,
    fdAttribute,
    loading,
    activeStoreId,
    activeStoreType,
    onAddBankAccount,
    ...props
}) => {
    const { id, vendorId: _vendorIdParam } = useParams()
    const { vendor_name } = queryString.parse(props?.location?.search)

    const didMountRef = useRef(null)

    const [vendorIdParam, setvendorIdPara] = useState()
    const [accesses, setaccesses] = useState({
        canAdd: false,
        canEdit: false,
    })
    const [fields, setFields] = useState({
        supplierId: "",
        displayName: "",
        accountHolder: "",
        sortCode: "",
        accountNumber: ""
    })
    const [terms, setTerms] = useState([""])

    useEffect(() => {
        if (!accessLevel) {
            const data = {
                canAdd: true,
                canEdit: true,
            }

            return setaccesses(data)
        }

        const data = {
            canAdd: false,
            canEdit: false,
        }

        accessLevel?.map(item => {
            switch (item.label) {
                case "CREATE":
                    data.canAdd = item.value
                    break

                case "UPDATE":
                    data.canEdit = item.value
                    break
            }
        })

        setaccesses(data)
    }, [JSON.stringify(accessLevel)])

    useEffect(() => {
        if (id) {
            if (!activeStoreId) return
            onGetFdAttribute(activeStoreId, id)
        }
    }, [id, activeStoreId])

    useEffect(() => {
        let vendor = ""
        // console.log(role, "OO");

        switch (role) {
            case ROLES.admin:
            case ROLES.staff:
                vendor =
                    activeStoreType?.storeVendorType === "SINGLE"
                        ? activeStoreType?.singleVendorId
                        : _vendorIdParam
                break

            case ROLES.vendor:
                vendor = vendorId
                break

            default:
                break
        }

        if (vendor) {
            console.log(vendor, "Oo");
            setFields({ ...fields, storeTypeId: activeStoreId, vendor })
        }

        setvendorIdPara(vendor)
    }, [activeStoreId, role, vendorId, _vendorIdParam])

    useEffect(() => {
        if (didMountRef.current) {
            try {
                setFields({
                    _id: fdAttribute._id,
                    name: fdAttribute.name || "",
                    type: fdAttribute.type || "select",
                    status: fdAttribute.status || "active",
                    terms:
                        fdAttribute.terms && fdAttribute.terms?.length > 0
                            ? fdAttribute.terms?.map(term => term.name)
                            : [""],
                })

                if (fdAttribute.terms?.length > 0) {
                    setTerms(fdAttribute.terms?.map(term => term.name))
                } else {
                    setTerms([""])
                }
            } catch (err) {
                console.log("parsing error ", err)
            }
        } else didMountRef.current = true
    }, [JSON.stringify(fdAttribute)])

    const handleChange = name => event => {
        setFields(prevState => ({ ...prevState, [name]: event.target.value }))
    }

    const addNewOption = event => {
        event.preventDefault()

        setTerms(prevOptions => [...prevOptions, ""])
        setFields(prevFields => ({
            ...prevFields,
            terms: [...prevFields.terms, ""],
        }))
    }

    function removeOption(e, index) {
        e.preventDefault()

        setTerms(prevOptions => [
            ...prevOptions.slice(0, index),
            ...prevOptions.slice(index + 1),
        ])
        setFields(prevFields => ({
            ...prevFields,
            terms: [
                ...prevFields.terms.slice(0, index),
                ...prevFields.terms.slice(index + 1),
            ],
        }))
    }

    const handleOptionChange =
        (name, index) =>
            ({ target }) => {
                let option = fields.terms[index]

                if (!option) {
                    option = ""
                }

                option = target.value

                const options = [
                    ...fields.terms.slice(0, index),
                    option,
                    ...fields.terms.slice(index + 1),
                ]

                setFields(prevState => ({ ...prevState, terms: options }))
            }
    // console.log(history, "v110119931101199311011993");

    const callback = (history) => {
        history.goBack()
    }

    const onSubmit = event => {
        event.preventDefault()
        onAddBankAccount(fields, callback)
        // if (loading) return

        // if (id) {
        //     if (!accesses.canEdit) return
        //     onPutFdAttribute(
        //         { _id: fdAttribute._id, ...fields, storeTypeId: activeStoreId },
        //         history
        //     )
        // } else {
        //     if (!accesses.canAdd) return
        //     onAddFdAttribute({ ...fields, storeTypeId: activeStoreId }, history)
        // }
    }

    const content = (
        <Card>
            <CardBody>
                <Form onSubmit={onSubmit} className="spinner-content">
                    {error && typeof error === "string" ? (
                        <Alert color="danger">{error}</Alert>
                    ) : null}

                    <Row>
                        <Col md={6}>
                            <FormGroup>
                                <Label htmlFor="formrow-firstname-Input">
                                    {props.t("supplier_id")}<span className="text-danger ml-1">*</span>
                                </Label>
                                <Input
                                    type="text"
                                    className="form-control"
                                    id="formrow-firstname-Input"
                                    // value={fields.name || ""}
                                    onChange={handleChange("supplierId")}
                                    required
                                />
                            </FormGroup>
                        </Col>
                        <Col md={6}>
                            <FormGroup>
                                <Label htmlFor="formrow-firstname-Input">
                                    {props.t("display_name")}<span className="text-danger ml-1">*</span>
                                </Label>
                                <Input
                                    type="text"
                                    className="form-control"
                                    id="formrow-firstname-Input"
                                    // value={fields.name || ""}
                                    onChange={handleChange("displayName")}
                                    required
                                />
                            </FormGroup>
                        </Col>
                    </Row>

                    <Row>
                        <Col md={6}>
                            <FormGroup>
                                <Label htmlFor="formrow-firstname-Input">
                                    {props.t("account_holder")}<span className="text-danger ml-1">*</span>
                                </Label>
                                <Input
                                    type="text"
                                    className="form-control"
                                    id="formrow-firstname-Input"
                                    // value={fields.name || ""}
                                    onChange={handleChange("accountHolder")}
                                    required
                                />
                            </FormGroup>
                        </Col>
                        <Col md={6}>
                            <FormGroup>
                                <Label htmlFor="formrow-firstname-Input">
                                    {props.t("sort_code")}<span className="text-danger ml-1">*</span>
                                </Label>
                                <Input
                                    type="text"
                                    className="form-control"
                                    id="formrow-firstname-Input"
                                    // value={fields.name || ""}
                                    onChange={handleChange("sortCode")}
                                    required
                                />
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={12}>
                            <FormGroup>
                                <Label htmlFor="formrow-firstname-Input">
                                    {props.t("account_number")}<span className="text-danger ml-1">*</span>
                                </Label>
                                <Input
                                    type="text"
                                    className="form-control"
                                    id="formrow-firstname-Input"
                                    // value={fields.name || ""}
                                    onChange={handleChange("accountNumber")}
                                    required
                                />
                            </FormGroup>
                        </Col>

                    </Row>


                    <FormButton
                        needSubmit={id ? accesses.canEdit : accesses.canAdd}
                        goBack={() => history.goBack()}
                    />

                    {loading && (
                        <div className="spinner">
                            <Spinner color="primary" />
                        </div>
                    )}
                </Form>
            </CardBody>
        </Card>
    )

    return (
        <React.Fragment>
            <div className="page-content">
                <Container fluid>
                    <Row>
                        <Col sm={1} lg={2}></Col>
                        <Col sm={10} lg={8}>
                            <Breadcrumbs
                                breadcrumbItem={`${!id ? "Add" : "Edit"} Attribute`}
                                breadcrumbItems={[

                                    {
                                        title: props.t("settings"),
                                        link: `/settings`,
                                    },
                                    {
                                        title: props.t("bank_account"),
                                        link: `/settings/bankaccount`
                                    },
                                    {
                                        title: props.t("add"),
                                    }
                                ]}
                            />
                        </Col>
                        <Col sm={1} lg={2}></Col>
                    </Row>

                    <Row>
                        <Col sm={1} lg={2}></Col>
                        <Col sm={10} lg={8}>
                            {content}
                        </Col>
                        <Col sm={1} lg={2}></Col>
                    </Row>
                </Container>
            </div>
        </React.Fragment>
    )
}

AddBankAccount.propTypes = {
    role: PropTypes.string,
    vendorId: PropTypes.string,
    loading: PropTypes.bool,
    error: PropTypes.string,
    fdAttribute: PropTypes.object,
    onAddFdAttribute: PropTypes.func,
    onGetFdAttribute: PropTypes.func,
    onPutFdAttribute: PropTypes.func,
}

const mapStateToProps = ({ Login, FD_Attributes }) => ({
    role: Login?.user?.role || "",
    vendorId: Login?.user?._id || "",
    vendor_name: Login?.user?.name,
    error: FD_Attributes.error,
    loading: FD_Attributes.loading,
    fdAttribute: FD_Attributes.fdAttribute,
})

const mapDispatchToProps = dispatch => ({
    // onAddFdAttribute: (data, history) => dispatch(addFdAttribute(data, history)),
    // onGetFdAttribute: (storeType, id) => dispatch(getFdAttribute(storeType, id)),
    // onPutFdAttribute: (data, history) => dispatch(putFdAttribute(data, history)),
    onAddBankAccount: (data, callback) => dispatch(addBankAccount(data, callback))
})

export default withRouter(
    connect(mapStateToProps, mapDispatchToProps)(withTranslation()(AddBankAccount))
)
