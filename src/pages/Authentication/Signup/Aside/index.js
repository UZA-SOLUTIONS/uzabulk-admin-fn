import React from "react"

import Slider from "react-slick"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"

// import images
import user1 from "assets/images/testimonial-user1.jpg"
import user2 from "assets/images/testimonial-user2.jpg"
import user3 from "assets/images/testimonial-user3.jpg"
import user4 from "assets/images/testimonial-user4.jpg"
import user5 from "assets/images/testimonial-user5.jpg"
import user6 from "assets/images/testimonial-user6.jpg"
import qomas2 from "assets/images/qomas2.png"
import moment from "moment"

const settings = {
  dots: true,
  arrows: false,
  autoplay: true,
  lazyLoad: true,
  loop: true,
  margin: 20,
  responsiveClass: true,
  autoHeight: true,
  autoplayTimeout: 7000,
  smartSpeed: 800,
  responsive: [
    { breakpoint: 0, settings: { slidesToShow: 1 } },
    { breakpoint: 600, settings: { slidesToShow: 1 } },
    { breakpoint: 1024, settings: { slidesToShow: 1 } },
    { breakpoint: 1366, settings: { slidesToShow: 1 } },
  ],
}

const testimonials = [
  {
    profile: user1,
    name: "RACHEL",
    quote:
      "Hyperlocal Cloud has helped us to kickstart our online delivery business in just 15 minutes and their delivery admin panel has proven to be a great help in managing every section.",
  },
  {
    profile: user2,
    name: "RALF WIPER",
    quote:
      "Hyperlocal Cloud has been one of the best SaaS-based solution providers. They made it easier and smoother to operate my online food delivery app and website altogether.",
  },
  {
    profile: user3,
    name: "KATE",
    quote:
      "Hyperlocal not only provides you your own branded app but also aids to acquire your customer’s loyalty through marketing and email campaigns. Which is a mark of reliable fellowship.",
  },
  {
    profile: user4,
    name: "ROBIN WOLF",
    quote:
      "Starting an online delivery business demands liquid funds which are a bit hard for a startup business to generate. With the subscription model and one-month free trial, Hyperlocal Cloud made it quite easier to manage and generate funds at the same time.",
  },
  {
    profile: user5,
    name: "MARK DAMINGO",
    quote:
      "I was in search to build my own app without stressing over the commission rates to the 3rd party. Luckily Hyperlocal Cloud helps to eliminate the transaction fee on every order. And that has been extremely great for me.",
  },
  {
    profile: user6,
    name: "GILLIAM",
    quote:
      "We were in need of a restaurant management system as we hold the specialty for home deliveries. Hyperlocal Cloud helped us to monitor and track home deliveries that helped us make quick and effective strategic decisions.",
  },
]

const Aside = props => {
  return (
    <aside>
      <div className="top-sidebar">
        <div className="centerdiv">
          <Slider {...settings} className="owl-carousel owl-theme">
            {testimonials?.map((item, key) => (
              <div key={`_testimonial_${key}`} className="item">
                <div className="top-flex">
                  <div className="sideimg">
                    <img src={item.profile} className="img-fluid" />
                  </div>
                  <div className="sidetext">
                    <h3>{item.name}</h3>
                    {/* <p>SEO Expert</p> */}
                  </div>
                  <img src={qomas2} className="img-fluid qomas2" />
                </div>
                <h5>{item.quote}</h5>
              </div>
            ))}
          </Slider>
        </div>
      </div>
      <div className="bottom-sidebar">
        <svg
          className="waves"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 24 150 28"
          preserveAspectRatio="none"
          shape-rendering="auto"
        >
          <defs>
            <path
              id="gentle-wave"
              d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z"
            />
          </defs>
          <g className="parallax">
            <use href="#gentle-wave" x="48" y="0" fill="#00b38885" />
            <use href="#gentle-wave" x="48" y="3" fill="#00b388" />
          </g>
        </svg>

        <div className="bottom-padd">
          {props.isHyperApp && (
            <ul className="social-media">
              <li>
                <a href="https://www.facebook.com/projectName-105813554898616">
                  <i className="fab fa-facebook-f"></i>
                </a>
              </li>

              <li>
                <a href="https://www.instagram.com/projectName/">
                  <i className="fab fa-instagram"></i>
                </a>
              </li>

              <li>
                <a href="https://www.linkedin.com/company/projectName">
                  <i className="fab fa-linkedin"></i>
                </a>
              </li>
            </ul>
          )}
          <p>
            {props.t("copyright")} <b>@{moment().format("YYYY")}</b>{" "}
            {props.isHyperApp && props.t("rights_reserve_to")}
          </p>
        </div>
      </div>
    </aside>
  )
}

export default Aside
