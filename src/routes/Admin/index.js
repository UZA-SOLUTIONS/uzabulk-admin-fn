import React from "react"
import { Redirect } from "react-router-dom"

import {
  GET_SERVICE_NAME,
  ADMIN_SERVICE_ROUTE,
  ADMIN_SUB_SERVICES_ROUTE,
  VENDOR_SERVICES_ROUTE,
} from "helpers/contants"

import StoreTypemiddleware from "../middleware/StoreTypemiddleware"

// Pricing Pages
import Pricing from "pages/Billing/Pricing"

// //Category pages
import CategoryList from "pages/Category/CategoryList/index"
import AddEditCategory from "pages/Category/AddEdit"

// //Customer Pages
import CustomersList from "pages/Customers/CustomersList/index"
import AddCustomer from "pages/Customers/AddCustomer"
import EditCustomer from "pages/Customers/EditCustomer"
import CustomerProfile from "pages/Customers/CustomerProfile"
import AddAddress from "pages/Customers/AddAddress"
import CustomerDocument from "pages/Customers/AddEditDocument"

//SETTING PAGE
import MainSetting from "pages/Settings/index"
import BankAccountList from "pages/PayThreeSixty/BankAccount/List/index"
import BankAccountAdd from "pages/PayThreeSixty/BankAccount/AddEdit/index"
import MerchantList from "pages/PayThreeSixty/Merchant/List/index"
import MerchantAdd from "pages/PayThreeSixty/Merchant/AddEdit/index"

import Dispute from "pages/Dispute/List"
import Transactions from "pages/Accounting/Withdrawal/List"
import Reviews from "pages/Reviews/List"
import UserAllOrders from "pages/UserAllOrders/List"
import VendorDocument from "pages/FoodDelivery/Restaurant/AddEditDocument"

import VehicleList from "pages/VehicleList/List"

// Get Started
import GetStarted from "pages/GetStarted"
import Domains from "pages/GetStarted/domains"

const CUSTOMER_ROUTES = item => [
  { path: `/${item.key}`, exact: true, component: CustomersList },
  { path: `/${item.key}/add`, exact: true, component: AddCustomer },
  {
    path: `/${item.key}/:id/edit`,
    exact: true,
    component: EditCustomer,
  },
  {
    path: `/${item.key}/:id/profile`,
    exact: true,
    component: CustomerProfile,
  },
  {
    path: `/${item.key}/:id/address`,
    exact: true,
    component: AddAddress,
  },
  {
    path: `/${item.key}/:id/address/:addressId`,
    exact: true,
    component: AddAddress,
  },
]

const CATEGORY_ROUTES = item => [
  { path: `/${item.key}`, exact: true, component: CategoryList },
  { path: `/${item.key}/save`, exact: true, component: AddEditCategory },
  { path: `/${item.key}/save/:id`, exact: true, component: AddEditCategory },
]

// const SETTING_ROUTES = item => [
//   { path: `/${item.key}`, exact: true, component: MainSetting },
//   { path: `/${item.key}/bankaccount`, exact: true, component: BankAccountList },
//   { path: `/${item.key}/bankaccount/add`, exact: true, component: BankAccountAdd },
//   { path: `/${item.key}/merchant`, exact: true, component: MerchantList },
//   { path: `/${item.key}/merchant/add`, exact: true, component: MerchantAdd },
// ]

/* const ROUTE = (path, component, link) => {
  return {
    path,
        exact: true,
        component: component
          ? () => (
              <StoreTypemiddleware
                component={require(link).default}
              />
            )
          : require(link).default,
  }
} */

/* Commong Flow for creating routes */
/* @params
 * item: Object of contants Route
 * path: String Route url path
 * component: Boolean for storestyle
 * vendorId: Boolean for vendor service route
 * store: Object Storetype
 */
const COMMON_ROUTES = (item, path, component, vendorId, store) => {
  // console.log(item, "PATh", "sidhantrrttrtrtr");
  /* Manage  */


  console.log("path", path)

  switch (item.key) {
    case "settings":
    case "tax-settings":
    case "theme-settings":
    case "order-settings":
    case "trip-settings":
    case "delivery-settings":
    case "bird-eye-view":
    case "reports/orders":
    case "reports/bookings":
    case "reports/users":
      return [
        {
          path: `/${path}`,
          exact: true,
          component: component
            ? () => (
              <StoreTypemiddleware
                component={require(`pages/${item.pageLocation}`).default}
                store={store}
              />
            )
            : require(`pages/${item.pageLocation}`).default,
        },
      ]
  }

  return [
    {
      path: `/${path}${vendorId ? "/:vendorId" : ""}`,
      exact: true,
      component: component
        ? () => (
          <StoreTypemiddleware
            component={require(`pages/${item.pageLocation}/List`).default}
            store={store}
          />
        )
        : require(`pages/${item.pageLocation}/List`).default,
    },
    ...(!item.noAdd
      ? [
        {
          path: `/${path}/add${vendorId ? "/:vendorId" : ""}`,
          exact: true,
          component: component
            ? () => (
              <StoreTypemiddleware
                component={
                  require(`pages/${item.pageLocation}/AddEdit`).default
                }
                store={store}
              />
            )
            : require(`pages/${item.pageLocation}/AddEdit`).default,
        },
      ]
      : []),
    ...(!item.noEdit
      ? [
        {
          path: `/${path}/:id/edit${vendorId ? "/:vendorId" : ""}`,
          exact: true,
          component: component
            ? () => (
              <StoreTypemiddleware
                component={
                  require(`pages/${item.pageLocation}/AddEdit`).default
                }
                store={store}
              />
            )
            : require(`pages/${item.pageLocation}/AddEdit`).default,
        },
      ]
      : []),

    ...(item.hasProfile
      ? [
        {
          path: `/${path}/:id/profile${vendorId ? "/:vendorId" : ""}`,
          exact: true,
          component: component
            ? () => (
              <StoreTypemiddleware
                component={
                  require(`pages/${item.pageLocation}/Profile`).default
                }
                store={store}
              />
            )
            : require(`pages/${item.pageLocation}/Profile`).default,
        },
      ]
      : []),
    ...(item.hasSettings
      ? [
        {
          path: `/${path}/:id/settings`,
          exact: true,
          component: component
            ? () => (
              <StoreTypemiddleware
                component={
                  require(`pages/${item.pageLocation}/Settings`).default
                }
                store={store}
              />
            )
            : require(`pages/${item.pageLocation}/Settings`).default,
        },
      ]
      : []),
    ...(item.hasDetails
      ? [
        {
          path: `/${path}/details/:id`,
          exact: true,
          component: component
            ? () => (
              <StoreTypemiddleware
                component={
                  require(`pages/${item.pageLocation}/Details`).default
                }
                store={store}
              />
            )
            : require(`pages/${item.pageLocation}/Details`).default,
        },
      ]
      : []),
  ]
}

const routes = storeTypes => {
  const userRoutes = []

  /* Dynamic create routes & add it in array/stack */
  const addRoutes = (store, component, isVendor) => item => {
    let path = item.key

    if (item.isDynamic) {
      const name = GET_SERVICE_NAME({
        storeType: store?.storeType,
        name: item.key,
        label: store?.label,
      })

      path = `${name?.toLowerCase()}s`
    }

    /* Prefix for store type (Like: food/, grocery/, etc...) */
    if (store) {
      path = store?.storeType?.toLowerCase() + `/${path}`
    }

    /* Manage Sub Items */
    if (item.subItems) {
      return Object.values(item.subItems)?.map(
        addRoutes(store, component, isVendor)
      )
    }
    /* Some customer logic for specific route */
    // console.log(item.key, "item.key");
    // console.log("genious ", store)
    switch (item.key) {
      // case "settings":
      //   userRoutes.push(...SETTING_ROUTES(item))

      //   break
      case "reviews":
        userRoutes.push({
          path: `/${path}`,
          exact: true,
          component: component
            ? () => (
              <StoreTypemiddleware
                component={Reviews}
                accessLevel={item.permissions}
                store={store}
              />
            )
            : Reviews,
        })
        break

      case "user-order":
        userRoutes.push({
          path: `/${path}`,
          exact: true,
          component: component
            ? () => (
              <StoreTypemiddleware
                component={UserAllOrders}
                accessLevel={item.permissions}
                store={store}
              />
            )
            : UserAllOrders,
        })
        break

      case "customers":
        /* User Custom Customer Routes */
        userRoutes.push(...CUSTOMER_ROUTES(item))
        userRoutes.push({
          path: `/${path}/:customers/transactions`,
          exact: true,
          component: component
            ? () => (
              <StoreTypemiddleware
                component={Transactions}
                accessLevel={item.permissions}
                store={store}
              />
            )
            : Transactions,
        })
        userRoutes.push({
          path: `/${path}/:id/document/:documentId`,
          exact: true,
          component: component
            ? () => (
              <StoreTypemiddleware
                component={CustomerDocument}
                accessLevel={item.permissions}
                store={store}
              />
            )
            : CustomerDocument,
        })
        break

      case "categories":
        /* User Custom Customer Routes */
        userRoutes.push(...CATEGORY_ROUTES(item))
        break

      // case "":
      // break

      /* Documents add on for Vendor & Restaurant */
      case "cuisine":
        userRoutes.push(
          ...COMMON_ROUTES(item, path, component, isVendor, store)
        )
        break

      case "vendor":
        userRoutes.push(
          ...COMMON_ROUTES(item, path, component, isVendor, store)
        )
        userRoutes.push({
          path: `/${path}/:id/document/:documentId`,
          exact: true,
          component: component
            ? () => (
              <StoreTypemiddleware component={VendorDocument} store={store} />
            )
            : VendorDocument,
        })
        break

      case "restaurant":
        userRoutes.push(
          ...COMMON_ROUTES(item, path, component, isVendor, store)
        )
        userRoutes.push({
          path: `/${path}/:id/document/:documentId`,
          exact: true,
          component: component
            ? () => (
              <StoreTypemiddleware component={VendorDocument} store={store} />
            )
            : VendorDocument,
        })
        break

      case "order":
        if (store && store?.storeType?.toLowerCase() === "taxi") {
          path = store?.storeType?.toLowerCase() + `/trips`
        }

        userRoutes.push(
          ...COMMON_ROUTES(item, path, component, isVendor, store)
        )
        break

      default:
        userRoutes.push(
          ...COMMON_ROUTES(item, path, component, isVendor, store)
        )
        break
    }
  }

  userRoutes.push(
    ...[
      { path: "/GetStarted", exact: true, component: GetStarted },
      { path: "/domains", exact: true, component: Domains },
      { path: "/upgrade", exact: true, component: Pricing },
    ]
  )

  /* Create Routes for Admin */
  Object.values(ADMIN_SERVICE_ROUTE)
    ?.filter(item => item.pageLocation)
    ?.map(addRoutes())

  /* Create Routes for Store Type (Like: food/, grocery/, etc...) */
  storeTypes?.map(store => {
    /* Create Sub Menu Routes (Like: food/restaurants, food/orders, etc...) */
    /* Filter Routes: Ignore direct route of vendor services if storetype is not single vendor */
    /* Single Vendor Service Routes are (food/promo-codes, food/transactions, grocery/attributes, etc...) */
    Object.values(ADMIN_SUB_SERVICES_ROUTE)
      ?.filter(item => {
        console.log(item, "checkRoutes")
        let filter =
          store?.storeVendorType !== "SINGLE"
            ? !item.onlyVendor && item.pageLocation
            : item.pageLocation

        if (
          (item.notForStore &&
            item.notForStore.includes(store.storeType?.toUpperCase())) ||
          (item.onlyForStore &&
            !item.onlyForStore.includes(store.storeType?.toUpperCase()))
        ) {
          filter = false
        }
        return filter
      })
      ?.map(addRoutes(store, true))

    /* Ignore vendor services for single vendor. Its already in ADMIN_SUB_SERVICES_ROUTE onlyVendor */
    if (store?.storeVendorType !== "SINGLE") {
      Object.values(VENDOR_SERVICES_ROUTE)
        ?.filter(item => !item?.isNotRequired && item.pageLocation)
        ?.map(addRoutes(store, true, true))
    }
  })

  userRoutes.push({
    path: "/:anyroute",
    component: () => <Redirect to={`/dashboard`} />,
  })

  // this route should be at the end of all other routes
  userRoutes.push({ path: "/", component: () => <Redirect to="/dashboard" /> })
  console.log("userRoutes", userRoutes)
  return userRoutes
}

export default routes
