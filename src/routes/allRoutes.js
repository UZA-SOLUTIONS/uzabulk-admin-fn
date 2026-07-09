import React from "react"
import { Redirect } from "react-router-dom"

import { ROLES } from "helpers/contants"

import adminRoutes from "./Admin"
import staffRoutes from "./Staff"
import vendorRoutes from "./Vendor"
import subVendorRoutes from "./subVendor"

// Authentication related pages
import Login from "../pages/Authentication/Login"
import Logout from "../pages/Authentication/Logout"
import ForgetPwd from "../pages/Authentication/ForgetPassword"
import Profile from "../pages/Authentication/UserProfile"
import ProfileEdit from "../pages/Authentication/EditProfile"
import ProfileChangePassword from "../pages/Authentication/ChangePassword"

// Dashboard
import Dashboard from "../pages/dashboard"
import PlanExpiredText from "helpers/planExpiredText.js"

const userRoutes = (
  role,
  accessLevel,
  storeTypes,
  vendorStoreTypes,
  billingPlan
) => {
  console.log("ping role", role)
  console.log("ping accessLevel", accessLevel)
  console.log("ping storeTypes", storeTypes)
  console.log("ping vendorStoreTypes", vendorStoreTypes)
  console.log("ping billingPlan", billingPlan)

  const routes = [
    // Logout
    { path: "/logout", exact: true, component: Logout },
    { path: "/edit-profile", exact: true, component: ProfileEdit },
    {
      path: "/change-password",
      exact: true,
      component: ProfileChangePassword,
    },

    ...(role === ROLES.admin ? adminRoutes(storeTypes) : []),
    ...(role === ROLES.staff
      ? staffRoutes(accessLevel?.permissions || [], storeTypes, billingPlan)
      : []),
    ...(role === ROLES.vendor ? vendorRoutes(vendorStoreTypes) : []),
    ...(role === ROLES.subVendor
      ? subVendorRoutes(vendorStoreTypes, accessLevel?.permissions || [])
      : []),
  ]

  if (role === ROLES.subVendor) {
    routes.unshift({
      path: "/dashboard",
      exact: true,
      component: () => <Redirect to="/reports/orders" />,
    })
  } else {
    routes.unshift({ path: "/dashboard", exact: true, component: Dashboard })
  }
  console.log("MAIN ROUTER :::", routes);
  return routes
}

const authRoutes = [
  { path: "/expireplan", component: PlanExpiredText },
  { path: "/login", component: Login },
  { path: "/forgot-password", component: ForgetPwd },

  { path: "/", exact: true, component: () => <Redirect to="/login" /> },
]

export { userRoutes, authRoutes }
