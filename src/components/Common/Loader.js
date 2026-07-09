import React from "react"
import loadingGif from "../../assets/images/loading.gif"

const Loader = props => {
  return (
    <div className="loader-img" style={{ ...props, ...props.style }}>
      <img src={loadingGif} style={{ width: "35px", height: "35px" }} />
    </div>
  )
}

Loader.defaultProps = {
  height: 265,
  width: "100%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
}
export default Loader
