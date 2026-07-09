import React, { useEffect, useState } from "react"
import { connect } from "react-redux"
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  Button,
} from "reactstrap"
import { withTranslation } from "react-i18next"
import { enableNotification } from "store/actions"

const isSupported = () =>
  "Notification" in window &&
  "serviceWorker" in navigator &&
  "PushManager" in window

const SESSION_HINT_KEY = "notificationEnableHintShown"

const NotificationEnableButton = props => {
  const {
    t,
    notificationGranted,
    enableNotification,
    loading,
    meLoading,
    storeLoading,
  } = props
  const [menuOpen, setMenuOpen] = useState(false)

  const ready = !loading && !meLoading && !storeLoading

  useEffect(() => {
    if (!ready || !isSupported() || notificationGranted) return
    if (!sessionStorage.getItem(SESSION_HINT_KEY)) {
      sessionStorage.setItem(SESSION_HINT_KEY, "1")
      setMenuOpen(true)
    }
  }, [ready, notificationGranted])

  if (!isSupported() || !ready || notificationGranted) {
    return null
  }

  return (
    <Dropdown
      isOpen={menuOpen}
      toggle={() => setMenuOpen(!menuOpen)}
      className="d-inline-block ml-1"
    >
      <DropdownToggle
        className="btn header-item noti-icon waves-effect position-relative"
        tag="button"
        type="button"
        aria-haspopup="true"
        aria-expanded={menuOpen}
        title={t("notification_updates_popup_title")}
      >
        <i className="bx bx-bell" />
        <span
          className="badge badge-danger rounded-pill position-absolute"
          style={{
            top: 6,
            right: 6,
            fontSize: 8,
            padding: "2px 4px",
            lineHeight: 1,
          }}
        >
          !
        </span>
      </DropdownToggle>
      <DropdownMenu className="dropdown-menu-md p-0 mt-1" right>
        <div className="px-3 py-3">
          <h6 className="mb-2">{t("notification_updates_popup_title")}</h6>
          <p className="text-muted small mb-3">
            {t("notification_updates_popup_body")}
          </p>
          <Button
            color="primary"
            size="sm"
            className="w-100"
            onClick={e => {
              e.preventDefault()
              enableNotification()
              setMenuOpen(false)
            }}
          >
            {t("enable_notification_text")}
          </Button>
        </div>
      </DropdownMenu>
    </Dropdown>
  )
}

const mapStateToProps = state => ({
  notificationGranted: state.Login?.notificationGranted,
  loading: state.Login?.loading,
  meLoading: state.Login?.meLoading,
  storeLoading: state.Settings?.storeLoading,
})

export default connect(mapStateToProps, { enableNotification })(
  withTranslation()(NotificationEnableButton)
)
