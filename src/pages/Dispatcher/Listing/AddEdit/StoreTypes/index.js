import React, { useEffect, useRef, useState } from "react"
import PropTypes from "prop-types"
import Select from "react-select"
import { connect } from "react-redux"
import { withRouter } from "react-router-dom"

import { getSettings } from "store/actions"
// Contants
import { SLUGS_NAME as slugname, } from "helpers/contants"

//i18n
import { withTranslation } from "react-i18next"

const Settings = ({
  categoriesLoading,
  storeTypeEnabled,
  onGetSettings,
  parentStoreType,
  setparentStoreType,
  ...props
}) => {
  const searching = useRef(null)
  const didMountRef = useRef(null)

  const [settingsList, setSettingsList] = useState([])
  const [filter, setFilter] = useState({
    orderBy: "date_created_utc",
    order: -1,
    page: 0,
    limit: 50,
    search: "",
    fields: [
      {
        fieldName: "status",
        fieldValue: "active",
      },
    ],
  })

  useEffect(() => {
    // onGetSettings(filter)
  }, [JSON.stringify(filter)])

  useEffect(() => {
    setSettingsList(prevState => [
      ...storeTypeEnabled?.filter((s) => s.storeType !== "SERVICEPROVIDER").map(({ _id, label, storeType }) => ({
        label: (slugname.zaza == props?.slug && storeType == "FOOD") ? "CANNAZON" : storeType,
        value: _id,
      })),
    ])
  }, [JSON.stringify(storeTypeEnabled)])

  return (
    <Select
      value={parentStoreType}
      options={settingsList}
      classNamePrefix="parent-selection"
      isLoading={categoriesLoading}
      onChange={setparentStoreType}
    />
  )
}

Settings.propTypes = {
  categoriesLoading: PropTypes.bool,
  storeTypeEnabled: PropTypes.array,
  onGetSettings: PropTypes.func,
}

const mapStateToProps = ({ Settings }) => ({
  categoriesLoading: Settings.loading,
  storeTypeEnabled: Settings?.settings?.storeTypeEnabled,
  slug: Settings?.settings?.slug
})

const mapDispatchToProps = dispatch => ({
  onGetSettings: data => dispatch(getSettings(data)),
})

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(withTranslation()(Settings))
)
