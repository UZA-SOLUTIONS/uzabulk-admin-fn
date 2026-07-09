import React from 'react'
import { Badge, Button, Col, FormGroup, Input, Label, Row } from 'reactstrap'
import { connect } from "react-redux"

const PaySplit = (props) => {

    const { pay360Split, handleChange, setFields, getBankAccount } = props

    // console.log(pay360Split, "pay360Split");

    const paysplitchange = (name) => (e) => {
        // console.log(name, "name", e.target, "e");
        setFields((pre) => ({
            ...pre,
            pay360Split: { ...pre.pay360Split, [name]: e.target.value }
        }))
    }
    // const getAccount = () => {
    //     ongetMerchantAccount()
    // }
    return (
        <React.Fragment>
            <Row >
                <Col lg={4}>
                    <h4>
                        {props.t("pay_360_split")}
                    </h4>
                </Col>
                <Col lg={8}>
                    <FormGroup>
                        <h6>{props.t("status")}</h6>
                        <div className='switch-md square-switch'>

                            <input type="checkbox" checked={pay360Split?.status} switch="none" id="pay360split" onChange={() => paysplitchange("status")({
                                target: {
                                    value: !pay360Split?.status
                                }
                            })} />
                            <label htmlFor="pay360split"
                                data-on-label="On"
                                data-off-label="Off"
                            />
                        </div>


                    </FormGroup>


                    {pay360Split?.status &&
                        <>
                            <FormGroup>

                                <Label>Account Number</Label>
                                <Input type="text" value={pay360Split?.accountId} onChange={paysplitchange("accountId")} />
                                <Button className='mt-3 mb-3' onClick={getBankAccount} >Get Account Address</Button>
                            </FormGroup>

                            <FormGroup>

                                <Label>Merchant Id</Label> : {" ", pay360Split?.merchantId}
                                {/* <Input type="text"
                                    // value={pay360Split?.merchantId} 
                                    // onChange={paysplitchange("merchantId")}
                                    value={pay360Split?.merchantId}
                                /> */}
                            </FormGroup>
                            <FormGroup>

                                <Label>Account Status</Label> :
                                <Badge
                                    className={
                                        "text-capitalize font-size-13 badge-soft-" +
                                        (pay360Split?.accountStatus == "ACTIVE"
                                            ? "success" : "danger")
                                    }
                                    color="success"
                                >
                                    {" ", pay360Split?.accountStatus}
                                </Badge>
                            </FormGroup>

                        </>

                    }
                </Col>

            </Row>

        </React.Fragment >
    )
}
// const mapStateToProps = ({ }) => ({

// })
// const mapDispatchToProps = (dispatch) => ({
//     ongetMerchantAccount: () => dispatch(getMerchantAccount())
// })
// export default connect(mapStateToProps, mapDispatchToProps)(PaySplit)

export default PaySplit