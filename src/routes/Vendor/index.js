import React from "react"
import { Redirect } from "react-router-dom"

import {
  ADMIN_SUB_SERVICES_ROUTE,
  GET_SERVICE_NAME,
  VENDOR_SERVICES_ROUTE,
} from "helpers/contants"

import StoreTypemiddleware from "../middleware/StoreTypemiddleware"

// //Customer Pages
import CustomersList from "pages/Customers/CustomersList/index"
import AddCustomer from "pages/Customers/AddCustomer"
import EditCustomer from "pages/Customers/EditCustomer"
import CustomerProfile from "pages/Customers/CustomerProfile"
import AddAddress from "pages/Customers/AddAddress"

import Reviews from "pages/Reviews/List"

import Transactions from "pages/Accounting/Withdrawal/List"
import VendorDocument from "pages/FoodDelivery/Restaurant/AddEditDocument"

import Reports from "pages/Reports/orders/order"
import OrderStatusModal from "pages/FoodDelivery/Order/Profile/OrderStatusModal"

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

const COMMON_ROUTES = (item, path, component, vendorId, store) => {
  console.log(item, "duggu")
  if (item.key === "settings") {
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
            path: `/${path}/settings`,
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
  ]
}

const routes = storeTypes => {
  const userRoutes = []

  const addRoutes = (store, component, isVendor) => item => {
    console.log(component, "")
    let path = item.key

    if (item.isDynamic) {
      const name = GET_SERVICE_NAME({
        storeType: store?.storeType,
        name: item.key,
        label: store?.label,
      })
      path = `${name?.toLowerCase()}s`
      console.log(path, "PATH")
    }

    // if (item.isDynamic) {
    //   path += "s"
    // }

    if (store && path !== "reviews") {
      path = store?.storeType?.toLowerCase() + `/${path}`
    }
    console.log(item.key, path, "ITEM7KEY")
    switch (item.key) {
      case "customers":
        userRoutes.push(...CUSTOMER_ROUTES(item))
        break

      case "system-access":
        Object.values(item.subItems)?.map(addRoutes(store, component, isVendor))
        break

      case "accounting":
        Object.values(item.subItems)?.map(addRoutes(store, component, isVendor))
        break

      case "configuration":
        Object.values(item.subItems)?.map(addRoutes(store, component, isVendor))
        break

      case "reviews":
        userRoutes.push({
          path: `/${path}`,
          exact: true,
          component: Reviews,
        })
        break
      case "vendor":
      case "restaurant":
        userRoutes.push(
          ...COMMON_ROUTES(item, path, component, isVendor, store)
        )
        // console.log(path, "PATH");
        userRoutes.push({
          path: `/${path}/:vendor/transactions`,
          exact: true,
          component: component
            ? () => (
                <StoreTypemiddleware component={Transactions} store={store} />
              )
            : Transactions,
        })
        userRoutes.push({
          path: `/${path}/document/:documentId`,
          exact: true,
          component: component
            ? () => (
                <StoreTypemiddleware component={VendorDocument} store={store} />
              )
            : VendorDocument,
        })
        break

      case "drivers":
        userRoutes.push(
          ...COMMON_ROUTES(item, path, component, isVendor, store)
        )
        userRoutes.push({
          path: `/${path}/:driver/transactions`,
          exact: true,
          component: component
            ? () => (
                <StoreTypemiddleware component={Transactions} store={store} />
              )
            : Transactions,
        })

        // userRoutes.push({
        //   path: `/${path}/:driver/profile`,
        //   exact: true,
        //   component: component
        //     ? () => (
        //         <StoreTypemiddleware component={DriverProfile} store={store} />
        //       )
        //     : DriverProfile,
        // })

        break

      default:
        userRoutes.push(
          ...COMMON_ROUTES(item, path, component, isVendor, store)
        )
        break
    }
  }

  userRoutes.push({ path: "/reports/orders", component: Reports })

  storeTypes?.map(store => {
    Object.values(ADMIN_SUB_SERVICES_ROUTE)
      ?.filter(item => item.pageLocation && !item.notInVendor)
      ?.map(addRoutes(store, true))

    /* Object.values(VENDOR_SERVICES_ROUTE)
      ?.filter(item => item.pageLocation)
      ?.map(addRoutes(store, true, false)) */
  })

  userRoutes.push({
    path: "/:anyroute",
    component: () => <Redirect to={`/dashboard`} />,
  })

  // this route should be at the end of all other routes
  userRoutes.push({ path: "/", component: () => <Redirect to="/dashboard" /> })

  return userRoutes
}

export default routes
