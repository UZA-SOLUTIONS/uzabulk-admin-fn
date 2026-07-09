import { useSelector } from "react-redux"
import { useCallback, useMemo } from "react"
import { ROLES } from "./contants"

export function usePermissions(storeType) {
  const user = useSelector(s => s?.Login?.user)
  const role = user?.role || ""
  const accessLevelPermissions = user?.accessLevel?.permissions || []

  const permissions = useMemo(() => {
    const permissions = {}

    accessLevelPermissions?.forEach(item => {
      item?.permissions?.forEach(permission => {
        permissions[`${item.type}.${permission.label}`] = permission.value
      })

      if (role === ROLES.subVendor) {
        const storeType = user?.storeType?.[0]?.storeType
        console.log(storeType, "storeType")
        item?.storeTypes?.forEach(itm => {
          if (itm?.storeType === storeType) {
            itm?.navigation?.forEach(nav => {
              nav?.permissions?.forEach(permission => {
                permissions[`STORE.${nav.type}.${permission.label}`] =
                  permission.value
              })
            })
          }
        })
      } else {
        item?.storeTypes?.forEach(itm => {
          console.log("Storetype ", storeType)
          if (itm.storeType === storeType) {
            itm?.navigation?.forEach(nav => {
              nav?.permissions?.forEach(permission => {
                permissions[`STORE.${nav.type}.${permission.label}`] =
                  permission.value
              })
            })
          }
        })
      }
    })

    console.log("Permission Matrix ", permissions)

    return permissions
  }, [accessLevelPermissions])

  const hasPermission = useCallback(
    key => {
      if (role === ROLES.staff || role === ROLES.subVendor) {
        if (typeof permissions?.[key] === "boolean") {
          return !!permissions?.[key]
        } else {
          return true
        }
      } else {
        return true
      }
    },
    [role, permissions]
  )

  return hasPermission
}
