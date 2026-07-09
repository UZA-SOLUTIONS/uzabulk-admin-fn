import React, { useState, useEffect } from "react"
import { connect } from 'react-redux'
import { withTranslation } from "react-i18next"
import _ from "lodash"
import Loader from "components/Common/Loader"
import { Map, Marker, GoogleApiWrapper } from "google-maps-react"

import { DISPATCH_ICON } from "helpers/url_helper"

const LoadingContainer = () => (
  <div>
    <Loader style={{ height: "100%" }} />
  </div>
)

const MapView = ({ dispatchList, ...props }) => {
  const [loading, setLoading] = useState(true)
  const [selectedPlace, setSelectedPlace] = useState(null)
  const [infoOpen, setInfoOpen] = useState(false)
  // const [centerValue, setcenterValue] = useState(null)
  const [defaultLocation, setdefaultLocation] = useState({
    lat: 0,
    lng: 0,
  })
  // 30.7333° N, 76.7794° E
  const [initialCenter, setInitialCenter] = useState({
    lat: 0,
    lng: 0,
  })


  // console.log(props?.dispatchList[0]?.pickUp.location.coordinates, "LIST");
  // useEffect(() => {
  //   {dispatchList?.data?.map(data => 
  //   console.log(data?.orderStatus, "dispatchList")) }
  // }, [dispatchList])

  // console.log(initialCenter, "initialCenterpp")
  useEffect(() => {
    setTimeout(() => {
      setLoading(false)
    }, 1500)
  }, [])

  useEffect(() => {
    setdefaultLocation(() => ({
      lng: props?.userLocation?.coordinates[0],
      lat: props?.userLocation?.coordinates[1],
    }))
  }, [])
  // console.log(dispatchList, "dispatchList")
  useEffect(() => {
    {
      dispatchList?.map(data =>
        data?.orderStatus == "inroute" ? (data?.storeType?.storeType == "FOOD" ? (
          setInitialCenter({
            lat: data?.billingDetails?.addressLocation?.coordinates[1],
            lng: data?.billingDetails?.addressLocation?.coordinates[0],
          })
        ) : (
          setInitialCenter({
            lng: data?.dropOff?.location?.coordinates[0],
            lat: data?.dropOff?.location?.coordinates[1],
          })
        )
        ) : data?.storeType?.storeType == "FOOD" ? (
          setInitialCenter({
            lng: data?.vendorDetails?.userLocation?.coordinates[0],
            lat: data?.vendorDetails?.userLocation?.coordinates[1],
          })
        ) : (
          setInitialCenter({
            lng: data?.pickUp?.location?.coordinates[0],
            lat: data?.pickUp?.location?.coordinates[1],
          })
        )
      )
    }
  }, [dispatchList])

  useEffect(() => {
    try {
      if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(function (position) {
          setdefaultLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          })
        })
      }
    } catch (error) {
      console.log("error", error)
    }
  }, [])
  // console.log(initialCenter, "initialCenter", defaultLocation);

  return (
    <React.Fragment>
      <Map
        google={props.google}
        className={props.className}
        zoom={18}
        center={defaultLocation}
        initialCenter={initialCenter}
      >
        {dispatchList?.map(data =>
          data?.orderStatus == "inroute" ? (
            data?.storeType?.storeType == "FOOD" ? (
              <Marker
                name={data?.customerDetails?.name}
                icon={{
                  url: DISPATCH_ICON,
                  scaledSize: new window.google.maps.Size(50, 50),
                }}
                position={{
                  lng: data?.billingDetails?.addressLocation?.coordinates[0],
                  lat: data?.billingDetails?.addressLocation?.coordinates[1],
                }}
              />
            ) : (
              <Marker
                name={data?.customerDetails?.name}
                icon={{
                  url: DISPATCH_ICON,
                  scaledSize: new window.google.maps.Size(50, 50),
                }}
                position={{
                  lng: data?.dropOff?.location?.coordinates[0],
                  lat: data?.dropOff?.location?.coordinates[1],
                }}
              />
            )
          ) : data?.storeType?.storeType == "FOOD" ? (
            <Marker
              name={data?.customerDetails?.name}
              icon={{
                url: DISPATCH_ICON,
                scaledSize: new window.google.maps.Size(50, 50),
              }}
              position={{
                lng: data?.vendorDetails?.userLocation?.coordinates[0],
                lat: data?.vendorDetails?.userLocation?.coordinates[1],
              }}
            />
          ) : (
            <Marker
              name={data?.customerDetails?.name}
              icon={{
                url: DISPATCH_ICON,
                scaledSize: new window.google.maps.Size(50, 50),
              }}
              position={{
                lng: data?.pickUp?.location?.coordinates[0],
                lat: data?.pickUp?.location?.coordinates[1],
              }}
            />
          )
        )}
      </Map>
    </React.Fragment>
  )
}

const mapStateToProps = ({Settings}) => ({
  googleMapKey:process.env.NODE_ENV === "development"
  ? "AIzaSyAxlXaOet7nyJcEJQw_SXFuK2EnRMw0zbg"
  : Settings?.settings?.googleMapKey?.web,
})

const mapDispatchToProps = dispatch => {
  return {
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(
  GoogleApiWrapper(props => ({
    apiKey: props.googleMapKey,
    LoadingContainer: LoadingContainer,
    v: "3",
  }))(withTranslation()(MapView))
)

