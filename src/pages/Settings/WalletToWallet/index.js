import React from 'react'
import { Col, FormGroup, Input, InputGroup, InputGroupAddon, InputGroupText, Label, Row } from 'reactstrap'

const WalletToWallet = (props) => {

    const { t, status, handleChange } = props;

    return (
        <Row>

            <Col md={4}> <h4>{props.t("wallet_to_wallet")}</h4> </Col>
            <Col md={8}>
                <Row>

                    <Col md={6}>
                        <FormGroup>
                            <Label>{props.t("status")}</Label>
                            <div className="status-switch square-switch">

                                <input
                                    type="checkbox"
                                    id="square-switch-refer-wallet_to_wallet"
                                    switch="none"
                                    checked={status}
                                    onChange={() => handleChange("isEnabledWalletToWallet")({
                                        target: {
                                            value: !status
                                        }
                                    })}
                                />
                                <label
                                    htmlFor="square-switch-refer-wallet_to_wallet"
                                    data-on-label="On"
                                    data-off-label="Off"
                                />
                            </div>
                        </FormGroup>
                    </Col>

                </Row>
            </Col>
        </Row>
    )
}

export default WalletToWallet