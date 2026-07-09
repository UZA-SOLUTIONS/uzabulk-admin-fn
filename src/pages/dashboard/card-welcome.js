import React, { Component } from "react"
import { Row, Col, Card, Button } from "reactstrap"
import { Link } from "react-router-dom"

//Import Images
import profileImg from "../../assets/images/profile-img.png"

class CardWelcome extends Component {
  render() {
    return (
      <Card className="">
        <Row className="welcome-board">
          <Col sm="7">
            <div className="text-primary p-3 ">
              <h5 className="text-primary text-nowrap">
                {this.props.t("welcome")} !
              </h5>
              <p className="">
                <b>
                  {this.props.isHyperApp
                    ? this.props.settings?.removeBranding
                      ? this.props.settings?.storeName
                      : this.props.t("uza")
                    : this.props.settings?.storeName}
                </b>{" "}
                {this.props.t("dashboard")}
              </p>
            </div>
          </Col>

          <Col
            sm="5"
            className="text-primary text-center px-3 pb-3 pt-0 pt-sm-3"
          >
            <Link to="/edit-profile">
              <Button color="primary" size="sm">
                {this.props.t("update_profile")}
              </Button>
            </Link>
            {/* <img src={profileImg} alt="" className="img-fluid" /> */}
          </Col>
        </Row>
      </Card>
    )
  }
}

export default CardWelcome
