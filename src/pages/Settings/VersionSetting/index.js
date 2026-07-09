import React from "react"
import {
  Col,
  FormGroup,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Label,
  Row,
} from "reactstrap"

const VersionSettings = props => {
  const { fields, versionChangeSettings, currency } = props

  return (
    <Row>
      <Col md={4}>
        {" "}
        <h4>{props.t("version_settings")}</h4>{" "}
      </Col>
      <Col md={8}>
        <Row>
          <Col md={6}>
            <FormGroup>
              <Label>
                {props.t("android_user_app_force_update")} {props.t("status")}
              </Label>
              <div className="status-switch square-switch">
                <input
                  type="checkbox"
                  id="android-user-refer-status"
                  switch="none"
                  checked={fields?.androidUser?.forceUpdateStatus}
                  onChange={() =>
                    versionChangeSettings("androidUser")("forceUpdateStatus")({
                      target: {
                        value: !fields?.androidUser?.forceUpdateStatus,
                      },
                    })
                  }
                />
                <label
                  htmlFor="android-user-refer-status"
                  data-on-label="On"
                  data-off-label="Off"
                />
              </div>
            </FormGroup>
          </Col>
          <Col md={6}>
            <FormGroup>
              <Label> {props.t("android_user_app_force_version")}</Label>
              <InputGroup>
                {/* <InputGroupAddon addonType="prepend">
                    <InputGroupText>{currency?.sign || "$"}</InputGroupText>
                  </InputGroupAddon> */}
                <Input
                  type="number"
                  step="0.1"
                  onChange={versionChangeSettings("androidUser")(
                    "forceVersion"
                  )}
                  value={fields?.androidUser?.forceVersion}
                  min="0"
                />
              </InputGroup>
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <FormGroup>
              <Label>
                {props.t("android_provider_app_force_update")}{" "}
                {props.t("status")}
              </Label>
              <div className="status-switch square-switch">
                <input
                  type="checkbox"
                  id="android-provider-status"
                  switch="none"
                  checked={fields?.androidDriver?.forceUpdateStatus}
                  onChange={() =>
                    versionChangeSettings("androidDriver")("forceUpdateStatus")(
                      {
                        target: {
                          value: !fields?.androidDriver?.forceUpdateStatus,
                        },
                      }
                    )
                  }
                />
                <label
                  htmlFor="android-provider-status"
                  data-on-label="On"
                  data-off-label="Off"
                />
              </div>
            </FormGroup>
          </Col>
          <Col md={6}>
            <FormGroup>
              <Label>
                <Label> {props.t("android_user_provider_force_version")}</Label>
              </Label>
              <InputGroup>
                {/* <InputGroupAddon addonType="prepend">
                    <InputGroupText>{currency?.sign || "$"}</InputGroupText>
                  </InputGroupAddon> */}
                <Input
                  type="number"
                  onChange={versionChangeSettings("androidDriver")(
                    "forceVersion"
                  )}
                  value={fields?.androidDriver?.forceVersion}
                  min="0"
                  step="0.1"
                />
              </InputGroup>
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <FormGroup>
              <Label>
                {props.t("ios_user_app_force_update")} {props.t("status")}
              </Label>
              <div className="status-switch square-switch">
                <input
                  type="checkbox"
                  id="ios-user-app-status"
                  switch="none"
                  checked={fields?.iosUser?.forceUpdateStatus}
                  onChange={() =>
                    versionChangeSettings("iosUser")("forceUpdateStatus")({
                      target: {
                        value: !fields?.iosUser?.forceUpdateStatus,
                      },
                    })
                  }
                />
                <label
                  htmlFor="ios-user-app-status"
                  data-on-label="On"
                  data-off-label="Off"
                />
              </div>
            </FormGroup>
          </Col>
          <Col md={6}>
            <FormGroup>
              <Label> {props.t("ios_user_app_force_version")}</Label>
              <InputGroup>
                {/* <InputGroupAddon addonType="prepend">
                    <InputGroupText>{currency?.sign || "$"}</InputGroupText>
                  </InputGroupAddon> */}
                <Input
                  type="number"
                  step="0.1"
                  onChange={versionChangeSettings("iosUser")("forceVersion")}
                  value={fields?.iosUser?.forceVersion}
                  min="0"
                />
              </InputGroup>
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <FormGroup>
              <Label>
                {props.t("ios_provider_app_force_update")} {props.t("status")}
              </Label>
              <div className="status-switch square-switch">
                <input
                  type="checkbox"
                  id="ios-provider-status"
                  switch="none"
                  checked={fields?.iosDriver?.forceUpdateStatus}
                  onChange={() =>
                    versionChangeSettings("iosDriver")("forceUpdateStatus")({
                      target: {
                        value: !fields?.iosDriver?.forceUpdateStatus,
                      },
                    })
                  }
                />
                <label
                  htmlFor="ios-provider-status"
                  data-on-label="On"
                  data-off-label="Off"
                />
              </div>
            </FormGroup>
          </Col>
          <Col md={6}>
            <FormGroup>
              <Label>
                <Label> {props.t("ios_user_provider_force_version")}</Label>
              </Label>
              <InputGroup>
                {/* <InputGroupAddon addonType="prepend">
                    <InputGroupText>{currency?.sign || "$"}</InputGroupText>
                  </InputGroupAddon> */}
                <Input
                  type="number"
                  onChange={versionChangeSettings("iosDriver")("forceVersion")}
                  value={fields?.iosDriver?.forceVersion}
                  min="0"
                  step="0.1"
                />
              </InputGroup>
            </FormGroup>
          </Col>
        </Row>
      </Col>
    </Row>
  )
}

export default VersionSettings
