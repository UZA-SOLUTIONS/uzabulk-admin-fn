import React, { useEffect, useState } from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import { withRouter, useParams } from "react-router-dom"
import queryString from "query-string"

import {
  Button,
  Card,
  CardBody,
  Col,
  Container,
  Row,
  Spinner,
} from "reactstrap"

//Import Breadcrumb
import Breadcrumbs from "components/Common/Breadcrumb2"

//i18n
import { withTranslation } from "react-i18next"

import {
  getDocTemplate,
  deleteDocTemplateField,
  putDocTemplateFieldSort,
} from "store/actions"
import ConfirmModal from "./ConfirmModal"

// Components
import NotFound from "pages/Utility/pages-404-content"
import CardContent from "./CardContent"

// a little function to help us with reordering the result
const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list)
  const [removed] = result.splice(startIndex, 1)
  result.splice(endIndex, 0, removed)

  return result
}

const DocTemplates = ({
  accessLevel,
  role,
  history,
  documentTemplate,
  onGetDocTemplate,
  onDeleteDocTemplateField,
  onPutDocTemplateSort,
  loading,
  ...props
}) => {
  if (
    !props.settings?.hideThings?.find(
      element => element.type === "isDocumentTemplates"
    )?.value
  ) {
    return <NotFound />
  }

  const { templateId } = useParams()
  const { template_name } = queryString.parse(props?.location?.search)

  const [accesses, setaccesses] = useState({
    canAdd: false,
    canEdit: false,
    canDelete: false,
    canBlock: false,
  })
  const [confirmModal, setConfirmModal] = useState({
    isOpen: false,
    fdCategoryId: null,
  })
  const [documentTemplatesList, setDocTemplatesList] = useState([])

  useEffect(() => {
    if (!accessLevel) {
      const data = {
        canAdd: true,
        canEdit: true,
        canDelete: true,
        canBlock: true,
      }

      return setaccesses(data)
    }

    const data = {
      canAdd: false,
      canEdit: false,
      canDelete: false,
      canBlock: false,
    }

    accessLevel?.map(item => {
      switch (item.label) {
        case "CREATE":
          data.canAdd = item.value
          break

        case "UPDATE":
          data.canEdit = item.value
          break

        case "DELETE":
          data.canDelete = item.value
          break

        case "BLOCK":
          data.canBlock = item.value
          break
      }
    })

    setaccesses(data)
  }, [JSON.stringify(accessLevel)])

  useEffect(() => {
    onGetDocTemplate(templateId)
  }, [templateId])

  useEffect(() => {
    setDocTemplatesList(documentTemplate?.fields || [])
  }, [documentTemplate])

  const toggleConfirmModal = fdCategoryId => {
    setConfirmModal(prevState => ({
      isOpen: !prevState.isOpen,
      fdCategoryId,
    }))
  }

  const removeConfirm = () => {
    const { fdCategoryId, isOpen } = confirmModal

    const onComplete = () => {
      onGetDocTemplate(templateId)
    }

    setConfirmModal({ isOpen: !isOpen, fdCategoryId: null })
    onDeleteDocTemplateField({ _id: fdCategoryId }, onComplete)
  }

  const onCategoryDragEnd = list => result => {
    if (!accesses?.canEdit) return
    const { destination, draggableId, source } = result
    if (!destination) {
      return
    }

    const items = reorder(list, source.index, destination.index)

    if (destination.droppableId === "no_parent") {
      setDocTemplatesList(items)
    } else {
      const _list = documentTemplatesList

      const findParent = list => {
        for (let i = 0; i < list.length; i++) {
          const item = list[i]

          if (item._id === destination.droppableId) {
            item.subcategories = items
            break
          }

          if (item?.subcategories?.length > 0) {
            findParent(item?.subcategories)
          }
        }
      }

      findParent(_list)
      setDocTemplatesList(_list)
    }

    onPutDocTemplateSort(
      {
        sortOrder: items?.map((item, index) => ({
          _id: item._id,
          sortOrder: index + 1,
        })),
      },
      templateId
    )
  }

  return (
    <React.Fragment>
      <ConfirmModal
        isOpen={confirmModal.isOpen}
        toggle={toggleConfirmModal}
        onConfirm={removeConfirm}
      />

      <div className="page-content">
        <Container fluid>
          <Breadcrumbs
            breadcrumbItem={props.t("Document Fields")}
            breadcrumbItems={[
              {
                title: props.t("document_templates"),
                link: "/document-templates",
              },
              { title: (template_name || "") + " " + props.t("fields") },
            ]}
          />

          <Row>
            <Col xs={12} md={7} xl={6}>
              <Row className="mb-2">
                <Col sm="5"></Col>

                <Col sm="7">
                  <div className="text-sm-right">
                    {accesses.canAdd && (
                      <Button
                        type="button"
                        color="success"
                        className="btn-rounded waves-effect waves-light mb-2 mr-2"
                        onClick={() =>
                          history.push(
                            `/document-templates/${templateId}/fields/add${props?.location?.search}`
                          )
                        }
                      >
                        <i className="mdi mdi-plus mr-1" />
                        {props.t("add")} {props.t("new")} {props.t("field")}
                      </Button>
                    )}
                  </div>
                </Col>
              </Row>
            </Col>
          </Row>

          <Row>
            <Col sm={12} md={7} className="spinner-content">
              <CardContent
                currentUrl={`document-templates/${templateId}/fields`}
                subCategories={documentTemplatesList}
                onDragEnd={onCategoryDragEnd}
                toggleConfirmModal={toggleConfirmModal}
                accesses={accesses}
              />

              {!loading && documentTemplatesList?.length <= 0 && (
                <Card>
                  <CardBody>{props.t("no_field_found")}</CardBody>
                </Card>
              )}

              {loading && (
                <div className="spinner">
                  <Spinner color="primary" />
                </div>
              )}
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  )
}

DocTemplates.propTypes = {
  documentTemplate: PropTypes.array,
  onGetDocTemplate: PropTypes.func,
  onDeleteDocTemplateField: PropTypes.func,
  onPutDocTemplateSort: PropTypes.func,
}

const mapStateToProps = ({ Settings, documentTemplates }) => ({
  settings: Settings.settings,
  loading: documentTemplates.loading,
  documentTemplate: documentTemplates.documentTemplate,
})

const mapDispatchToProps = dispatch => ({
  onGetDocTemplate: id => dispatch(getDocTemplate(id)),
  onDeleteDocTemplateField: (data, callback) =>
    dispatch(deleteDocTemplateField(data, callback)),
  onPutDocTemplateSort: (data, id) =>
    dispatch(putDocTemplateFieldSort(data, id)),
})

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(withTranslation()(DocTemplates))
)
