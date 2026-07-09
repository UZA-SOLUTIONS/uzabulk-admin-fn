import PropTypes from "prop-types"
import React, { Component } from "react"
import { withRouter } from "react-router-dom"
import { connect } from "react-redux"
import { Helmet } from "react-helmet"

class NonAuthLayout extends Component {
  constructor(props) {
    super(props)
    this.state = { mounted: false }
    this.capitalizeFirstLetter.bind(this)
  }

  capitalizeFirstLetter = string => {
    return string.charAt(1).toUpperCase() + string.slice(2)
  }

  componentDidMount() {
    this.setState({ mounted: true })
    let currentage = this.capitalizeFirstLetter(this.props.location.pathname)

    if (this.props.isHyperApp) {
      document.title = currentage + ""
    } else if (!!this.props.publicDomainData) {
      document.title =
        currentage + " | " + (this.props.publicDomainData?.storeName || "")
    }

    document.querySelector("body").classList.add("auth-body")
  }

  componentDidUpdate(prevProps) {
    if (prevProps.publicDomainData !== this.props.publicDomainData) {
      let currentage = this.capitalizeFirstLetter(this.props.location.pathname)

      if (this.props.isHyperApp) {
        document.title = currentage + ""
      } else if (!!this.props.publicDomainData) {
        document.title =
          currentage + " | " + (this.props.publicDomainData?.storeName || "")
      }
    }
  }

  componentWillUnmount() {
    document.querySelector("body").classList.remove("auth-body")
  }
  render() {
    const { publicDomainData, isHyperApp } = this.props

    return (
      <React.Fragment>
        {isHyperApp && (
          <Helmet>
            <meta name="author" content="UZA" />
            <link rel="canonical" href={window.location.origin} />
            <meta name="description" content="UZA" />

            <meta
              name="keywords"
              content="UZA | FOOD | GROCERY | LIQUOR | SERVICES"
            />
            <meta
              name="description"
              content="UZA | FOOD | GROCERY | LIQUOR | SERVICES"
            />
            <meta property="og:url" content={process.env.REACT_APP_URL} />
            <meta property="og:site_name" content="UZA" />
            <meta property="og:type" content="article" />
            <meta property="og:title" content="UZA" />
            {/* <meta
              property="og:image"
              content="https://uzastagings3.s3.us-east-2.amazonaws.com/1632991694322image973Z.png"
            /> */}
            <meta
              property="og:description"
              content="UZA | FOOD | GROCERY | LIQUOR | SERVICES"
            />
            <meta name="twitter:card" content="summary" />
            <meta name="twitter:site" content="@UZA" />
            <meta name="twitter:title" content="UZA" />
            <meta
              name="twitter:description"
              content="UZA | FOOD | GROCERY | LIQUOR | SERVICES"
            />
            {/* <meta
              name="twitter:image"
              content="https://uzastagings3.s3.us-east-2.amazonaws.com/1632991694322image973Z.png"
            /> */}
          </Helmet>
        )}

        {publicDomainData?.storeName && (
          <Helmet>
            <meta name="author" content={publicDomainData.storeName} />

            <link rel="canonical" href={window.location.origin} />
            <meta name="description" content={publicDomainData.storeName} />
            <link
              rel="apple-touch-icon"
              href={publicDomainData.favIcon?.link}
            />

            <meta property="og:url" content={window.location.origin} />
            <meta
              property="og:site_name"
              content={publicDomainData.storeName}
            />
            <meta property="og:type" content="article" />
            <meta property="og:title" content={publicDomainData.storeName} />
            <meta property="og:image" content={publicDomainData.logo?.link} />
            <meta
              property="og:description"
              content={publicDomainData.storeName}
            />

            <meta name="twitter:card" content="summary" />
            <meta
              name="twitter:site"
              content={`@${publicDomainData.storeName}`}
            />
            <meta name="twitter:title" content={publicDomainData.storeName} />
            <meta
              name="twitter:description"
              content={publicDomainData.storeName}
            />
            <meta name="twitter:image" content={publicDomainData.logo?.link} />
          </Helmet>
        )}

        {this.props.children}
      </React.Fragment>
    )
  }
}

NonAuthLayout.propTypes = {
  children: PropTypes.any,
  location: PropTypes.object,
}

const mapStatetoProps = ({ Login }) => ({
  isHyperApp: Login.isHyperApp,
  publicDomainData: Login.publicDomainData,
})

export default connect(mapStatetoProps)(withRouter(NonAuthLayout))
