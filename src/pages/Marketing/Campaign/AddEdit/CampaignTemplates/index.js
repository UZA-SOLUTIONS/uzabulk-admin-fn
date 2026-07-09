import React, { useEffect, useRef, useState } from "react"
import PropTypes from "prop-types"
import Select from "react-select"
import { connect } from "react-redux"
import { withRouter } from "react-router-dom"

import { getCampaignTemplates } from "store/actions"

const CampaignTemplate = ({
  campaignTemplatesLoading,
  campaignTemplates,
  onGetCampaignTemplates,
  parentCampaignTemplate,
  setparentCampaignTemplate,
  fields,
  ...props
}) => {
  const searching = useRef(null)
  const didMountRef = useRef(null)

  const [campaignTemplatesList, setCampaignTemplatesList] = useState([
    parentCampaignTemplate,
  ])
  const [filter, setFilter] = useState({
    orderBy: "date_created_utc",
    order: -1,
    page: 0,
    limit: 20,
    search: "",
    fields: [
      {
        fieldName: "status",
        fieldValue: "active",
      },
      {
        fieldName: "type",
        fieldValue: props.type,
      },
    ],
  })

  useEffect(() => {
    onGetCampaignTemplates(filter)
  }, [JSON.stringify(filter)])

  useEffect(() => {
    setFilter(prevState => ({
      ...prevState,
      fields: [
        {
          fieldName: "status",
          fieldValue: "active",
        },
        {
          fieldName: "type",
          fieldValue: props.type,
        },
      ],
    }))
  }, [props.type])

  useEffect(() => {
    if (campaignTemplates) {
      setCampaignTemplatesList(prevState => [
        ...campaignTemplates.map(({ _id, name }) => ({
          label: name,
          value: _id,
        })),
      ])
    }
  }, [JSON.stringify(campaignTemplates)])

  return (
    <Select
      value={parentCampaignTemplate}
      options={campaignTemplatesList}
      classNamePrefix="parent-selection"
      isLoading={campaignTemplatesLoading}
      onChange={setparentCampaignTemplate}
      onInputChange={text => {
        return
        if (searching.current) {
          clearTimeout(searching.current)
        }

        searching.current = setTimeout(() => {
          setFilter(prevFilter => ({
            ...prevFilter,
            search: text,
          }))

          searching.current = null
          clearTimeout(searching.current)
        }, 1000)
      }}
    />
  )
}

CampaignTemplate.propTypes = {
  campaignTemplatesLoading: PropTypes.bool,
  campaignTemplates: PropTypes.array,
  onGetCampaignTemplates: PropTypes.func,
}

const mapStateToProps = ({ CampaignTemplate }) => ({
  campaignTemplatesLoading: CampaignTemplate.loading,
  campaignTemplates: CampaignTemplate.campaignTemplates,
})

const mapDispatchToProps = dispatch => ({
  onGetCampaignTemplates: data => dispatch(getCampaignTemplates(data)),
})

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(CampaignTemplate)
)
