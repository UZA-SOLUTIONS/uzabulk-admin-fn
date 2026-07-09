import React from "react"
import { Redirect } from "react-router-dom"

import {
  ADMIN_SERVICE_ROUTE,
  ADMIN_SUB_SERVICES_ROUTE,
  VENDOR_SERVICES_ROUTE,
} from "helpers/contants"

import StoreTypemiddleware from "../middleware/StoreTypemiddleware"

// //Customer Pages
import CustomersList from "../../pages/Customers/CustomersList/index"
import AddCustomer from "../../pages/Customers/AddCustomer"
import EditCustomer from "../../pages/Customers/EditCustomer"
import CustomerProfile from "../../pages/Customers/CustomerProfile"
import AddAddress from "../../pages/Customers/AddAddress"
import UserAllOrders from "pages/UserAllOrders/List"

import Reviews from "pages/Reviews/List"

import Transactions from "pages/Accounting/Withdrawal/List"
import VendorDocument from "pages/FoodDelivery/Restaurant/AddEditDocument"
// Get Started
import GetStarted from "pages/GetStarted"
import Domains from "pages/GetStarted/domains"

const CUSTOMER_ROUTES = (item, permissions) => [
  {
    path: `/${item.key}`,
    exact: true,
    component: () => (
      <StoreTypemiddleware
        isNotStoreType={true}
        accessLevel={permissions}
        component={CustomersList}
      />
    ),
  },
  {
    path: `/${item.key}/add`,
    exact: true,
    component: () => (
      <StoreTypemiddleware
        isNotStoreType={true}
        accessLevel={permissions}
        component={AddCustomer}
      />
    ),
  },
  {
    path: `/${item.key}/:id/edit`,
    exact: true,
    component: () => (
      <StoreTypemiddleware
        isNotStoreType={true}
        accessLevel={permissions}
        component={EditCustomer}
      />
    ),
  },
  {
    path: `/${item.key}/:id/profile`,
    exact: true,
    component: () => (
      <StoreTypemiddleware
        isNotStoreType={true}
        accessLevel={permissions}
        component={CustomerProfile}
      />
    ),
  },
  {
    path: `/${item.key}/:id/address`,
    exact: true,
    component: () => (
      <StoreTypemiddleware
        isNotStoreType={true}
        accessLevel={permissions}
        component={AddAddress}
      />
    ),
  },
  {
    path: `/${item.key}/:id/address/:addressId`,
    exact: true,
    component: () => (
      <StoreTypemiddleware
        isNotStoreType={true}
        accessLevel={permissions}
        component={AddAddress}
      />
    ),
  },
]

const COMMON_ROUTES = (item, path, component, vendorId, permissions, store) => {
  switch (item.key) {
    case "settings":
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
          component: () =>
            component ? (
              <StoreTypemiddleware
                accessLevel={permissions}
                component={require(`pages/${item.pageLocation}`).default}
                store={store}
              />
            ) : (
              <StoreTypemiddleware
                isNotStoreType={true}
                accessLevel={permissions}
                component={require(`pages/${item.pageLocation}`).default}
                store={store}
              />
            ),
        },
      ]
  }

  return [
    {
      path: `/${path}${vendorId ? "/:vendorId" : ""}`,
      exact: true,
      component: () =>
        component ? (
          <StoreTypemiddleware
            accessLevel={permissions}
            component={require(`pages/${item.pageLocation}/List`).default}
            store={store}
          />
        ) : (
          <StoreTypemiddleware
            isNotStoreType={true}
            accessLevel={permissions}
            component={require(`pages/${item.pageLocation}/List`).default}
            store={store}
          />
        ),
    },
    ...(!item.noAdd
      ? [
          {
            path: `/${path}/add${vendorId ? "/:vendorId" : ""}`,
            exact: true,
            component: () =>
              component ? (
                <StoreTypemiddleware
                  accessLevel={permissions}
                  component={
                    require(`pages/${item.pageLocation}/AddEdit`).default
                  }
                  store={store}
                />
              ) : (
                <StoreTypemiddleware
                  isNotStoreType={true}
                  accessLevel={permissions}
                  component={
                    require(`pages/${item.pageLocation}/AddEdit`).default
                  }
                  store={store}
                />
              ),
          },
        ]
      : []),
    ...(!item.noEdit
      ? [
          {
            path: `/${path}/:id/edit${vendorId ? "/:vendorId" : ""}`,
            exact: true,
            component: () =>
              component ? (
                <StoreTypemiddleware
                  accessLevel={permissions}
                  component={
                    require(`pages/${item.pageLocation}/AddEdit`).default
                  }
                  store={store}
                />
              ) : (
                <StoreTypemiddleware
                  isNotStoreType={true}
                  accessLevel={permissions}
                  component={
                    require(`pages/${item.pageLocation}/AddEdit`).default
                  }
                  store={store}
                />
              ),
          },
        ]
      : []),
    ...(item.hasProfile
      ? [
          {
            path: `/${path}/:id/profile${vendorId ? "/:vendorId" : ""}`,
            exact: true,
            component: () =>
              component ? (
                <StoreTypemiddleware
                  accessLevel={permissions}
                  component={
                    require(`pages/${item.pageLocation}/Profile`).default
                  }
                  store={store}
                />
              ) : (
                <StoreTypemiddleware
                  isNotStoreType={true}
                  accessLevel={permissions}
                  component={
                    require(`pages/${item.pageLocation}/Profile`).default
                  }
                  store={store}
                />
              ),
          },
        ]
      : []),
    ...(item.hasSettings
      ? [
          {
            path: `/${path}/:id/settings`,
            exact: true,
            component: () =>
              component ? (
                <StoreTypemiddleware
                  accessLevel={permissions}
                  component={
                    require(`pages/${item.pageLocation}/Settings`).default
                  }
                  store={store}
                />
              ) : (
                <StoreTypemiddleware
                  isNotStoreType={true}
                  accessLevel={permissions}
                  component={
                    require(`pages/${item.pageLocation}/Settings`).default
                  }
                  store={store}
                />
              ),
          },
        ]
      : []),
  ]
}

const permissionsFilter = item => {
  if (item?.type === "storetypes") return true

  if (item?.type === "userOrder") return true

  const _index = item?.permissions?.findIndex(i =>
    ["VIEW", "view", "List", "list"].includes(i.label)
  )

  if (_index !== -1) {
    if (!item?.permissions) {
      return true
    }

    return item?.permissions[_index]?.value
  }

  return false
}

const userRoutes = (accessLevel, storeTypes, billingPlan) => {
  console.log(accessLevel, "fgfgfg")
  const routes = []

  /* Default Routes */
  routes.push(
    ...[
      { path: "/GetStarted", exact: true, component: GetStarted },
      { path: "/domains", exact: true, component: Domains },
    ]
  )

  /* Routes */
  const routesHelper = ({
    permissions,
    serviceRoute,
    _store,
    component,
    isVendor,
    isExtra = false,
  }) => {
    const mapRoutes = []

    routes.push({
      path: `/user-order`,
      exact: true,
      component: UserAllOrders,
    })
    routes.push({
      path: `/reviews`,
      exact: true,
      component: Reviews,
    })

    permissions?.filter(permissionsFilter)?.map(item => {
      if (!isExtra) {
        if (item.type === "docTemplate") {
          mapRoutes.push(item)
          mapRoutes.push({ ...item, type: "docTemplateFields" })
          return
        }

        if (item.type === "contentPages") {
          mapRoutes.push(item)
          mapRoutes.push({ ...item, type: "contentPagesFields" })
          return
        }
        switch (item.type) {
          case "geofencing":
          case "gallery":
          case "faq":
          case "contentPages":
          case "emailTemplate":
          case "globalSetting":
            mapRoutes.push(item)
            return
        }
      }

      if (item.type === "restaurants" || item.type === "vendors") {
        routesHelper({
          permissions: Object.entries(VENDOR_SERVICES_ROUTE)?.map(
            ([key, value]) => ({
              ...value,
              type: key,
              permissions: item.permissions,
            })
          ),
          serviceRoute: ADMIN_SUB_SERVICES_ROUTE,
          _store: _store,
          component: true,
          isVendor: _store?.storeVendorType !== "SINGLE",
        })
      }

      if (item.type === "storetypes") {
        let storeTypeSetting = item?.storeTypes[0]?.navigation.filter(
          nav => nav.type === "storeTypeSetting"
        )[0]

        if (!!storeTypeSetting) {
          if (["TAXI", "PICKUPDROP"].includes(item?.storeTypes[0]?.storeType)) {
            mapRoutes.push({
              ...storeTypeSetting,
              label: "Trip Setting",
              type: "tripSetting",
              storeType: item?.storeTypes[0]?.storeType,
            })
          } else {
            mapRoutes.push({
              ...storeTypeSetting,
              label: "Order Setting",
              type: "orderSetting",
              storeType: item?.storeTypes[0]?.storeType,
            })
          }
        }

        let restaurants = item?.storeTypes[0]?.navigation.filter(
          nav => nav.type === "restaurants"
        )[0]

        restaurants &&
          mapRoutes.push({
            ...restaurants,
            label: "Delivery Setting",
            type: "deliverySetting",
          })

        if (mapRoutes?.length > 0) {
          routesHelper({
            permissions: mapRoutes,
            serviceRoute: serviceRoute?.configuration?.subItems,
            _store,
            component,
            isVendor,
            isExtra: true,
          })
        }

        item?.storeTypes?.map(store => {
          let filterStoreType = storeTypes.filter(
            _store =>
              `${_store?.storeType?.toLowerCase()}` ===
              `${store?.storeType?.toLowerCase()}`
          )

          if (filterStoreType?.length <= 0) return

          routesHelper({
            _store: filterStoreType[0],
            permissions: store.navigation,
            serviceRoute: ADMIN_SUB_SERVICES_ROUTE,
            component: true,
          })
        })

        return
      }

      const _item = serviceRoute[item.type]

      if (!_item) return

      let path = _item.key

      if (_item.isDynamic) {
        path += "s"
      }

      if (_store && !["reviews", "userOrder"].includes(item.type)) {
        path = _store?.storeType?.toLowerCase() + `/${path}`

        if (
          billingPlan?.type !== "ultimate" &&
          ["cuisine", "brand"].includes(_item.key)
        ) {
          path = _item.key + "s"
        }
      }

      switch (item.type) {
        case "customers":
          routes.push(...CUSTOMER_ROUTES(_item, item.permissions))
          routes.push({
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

          return

        case "subAdmins":
          return routes.push(
            ...COMMON_ROUTES(
              {
                title: "Sub-Admins",
                key: "sub-admins",
                pageLocation: "SystemAccess/SubAdmin",
              },
              "sub-admins",
              component,
              isVendor,
              item.permissions,
              _store
            )
          )

        case "accounting":
        case "reports":
          return routesHelper({
            permissions: Object.entries(_item?.subItems)?.map(
              ([key, value]) => ({
                ...value,
                type: key,
                permissions: item.permissions,
              })
            ),
            serviceRoute: _item?.subItems,
          })
        case "dispatch":
          return routesHelper({
            permissions: Object.entries(_item?.subItems)?.map(
              ([key, value]) => ({
                ...value,
                type: key,
                permissions: item.permissions,
              })
            ),
            serviceRoute: _item?.subItems,
          })
        case "marketing":
          return routesHelper({
            permissions: Object.entries(_item?.subItems)?.map(
              ([key, value]) => ({
                ...value,
                type: key,
                permissions: item.permissions,
              })
            ),
            serviceRoute: _item?.subItems,
          })

        case "userOrder":
          return routes.push({
            path: `/${path}`,
            exact: true,
            component: component
              ? () => (
                  <StoreTypemiddleware
                    accessLevel={item.permissions}
                    component={UserAllOrders}
                    store={_store}
                  />
                )
              : () => (
                  <StoreTypemiddleware
                    isNotStoreType={true}
                    accessLevel={item.permissions}
                    component={UserAllOrders}
                    store={_store}
                  />
                ),
          })

        case "reviews":
          return routes.push({
            path: `/${path}`,
            exact: true,
            component: component
              ? () => (
                  <StoreTypemiddleware
                    accessLevel={item.permissions}
                    component={Reviews}
                    store={_store}
                  />
                )
              : () => (
                  <StoreTypemiddleware
                    isNotStoreType={true}
                    accessLevel={item.permissions}
                    component={Reviews}
                    store={_store}
                  />
                ),
          })

        case "vendors":
        case "restaurants":
          routes.push(
            ...COMMON_ROUTES(
              _item,
              path,
              component,
              isVendor,
              item.permissions,
              _store
            )
          )
          routes.push({
            path: `/${path}/:id/document/:documentId`,
            exact: true,
            component: component
              ? () => (
                  <StoreTypemiddleware
                    component={VendorDocument}
                    store={_store}
                  />
                )
              : VendorDocument,
          })
          return

        case "order":
          if (_store && _store.storeType?.toLowerCase() === "taxi") {
            path = "taxi/trips"
          }

        case "drivers":
          routes.push(
            ...COMMON_ROUTES(
              _item,
              path,
              component,
              isVendor,
              item.permissions,
              _store
            )
          )

          routes.push({
            path: `/${path}/:driver/transactions`,
            exact: true,
            component: component
              ? () => (
                  <StoreTypemiddleware
                    accessLevel={item.permissions}
                    component={Transactions}
                    store={_store}
                  />
                )
              : () => (
                  <StoreTypemiddleware
                    isNotStoreType={true}
                    accessLevel={item.permissions}
                    component={Transactions}
                    store={_store}
                  />
                ),
          })

          return

        default:
          routes.push(
            ...COMMON_ROUTES(
              _item,
              path,
              component,
              isVendor,
              item.permissions,
              _store
            )
          )
          break
      }
    })
  }

  routesHelper({ permissions: accessLevel, serviceRoute: ADMIN_SERVICE_ROUTE })

  routes.push({
    path: "/:anyroute",
    component: () => <Redirect to={`/dashboard`} />,
  })

  routes.push({
    path: "/",
    component: () => <Redirect to={`/dashboard`} />,
  })

  return routes
}

export default userRoutes
