import React, { useEffect, useState, Fragment } from "react"
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
  getContentPage,
  deleteContentPageField,
  putContentPageFieldSort,
} from "store/actions"
import ConfirmModal from "./ConfirmModal"

import CardContent from "./CardContent"

import EditContent from "../../AddEdit"
import { isEmpty } from "lodash"
import { SLUGS_NAME } from "helpers/contants"

// a little function to help us with reordering the result
const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list)
  const [removed] = result.splice(startIndex, 1)
  result.splice(endIndex, 0, removed)

  return result
}

const ContentPages = ({
  accessLevel,
  role,
  history,
  contentPage,
  onGetContentPage,
  onDeleteContentPageField,
  onPutContentPageSort,
  loading,
  settings,
  ...props
}) => {
  console.log("holy ", settings)
  const { contentPageId } = useParams()
  const { content_name } = queryString.parse(props?.location?.search)

  const [isWeb, setisWeb] = useState(
    props.match.path.includes("/content-pages")
  )
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
  const [contentPagesList, setContentPagesList] = useState([])

  useEffect(() => {
    let _isWeb = props.match.path.includes("/content-pages")
    setisWeb(_isWeb)
  }, [props.match.path])

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
    onGetContentPage(contentPageId)
  }, [contentPageId])

  useEffect(() => {
    setContentPagesList(contentPage?.sections || [])
  }, [contentPage])

  const toggleConfirmModal = fdCategoryId => {
    setConfirmModal(prevState => ({
      isOpen: !prevState.isOpen,
      fdCategoryId,
    }))
  }

  const removeConfirm = () => {
    const { fdCategoryId, isOpen } = confirmModal

    const onComplete = () => {
      onGetContentPage(contentPageId)
    }

    setConfirmModal({ isOpen: !isOpen, fdCategoryId: null })
    onDeleteContentPageField({ _id: fdCategoryId }, onComplete)
  }

  const onCategoryDragEnd = list => result => {
    if (!accesses?.canEdit) return
    const { destination, draggableId, source } = result
    if (!destination) {
      return
    }

    const items = reorder(list, source.index, destination.index)

    if (destination.droppableId === "no_parent") {
      setContentPagesList(items)
    } else {
      const _list = contentPagesList

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
      setContentPagesList(_list)
    }

    onPutContentPageSort(
      {
        sortOrder: items?.map((item, index) => ({
          _id: item._id,
          sortOrder: index + 1,
        })),
      },
      contentPageId
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
                title: props.t(isWeb ? "content_pages" : "app_settings"),
                link: isWeb ? "/content-pages" : "/app-settings",
              },
              {
                title:
                  (contentPage?.title || content_name || "") +
                  " " +
                  props.t("sections"),
              },
            ]}
          />
          {isEmpty(contentPage) &&
          loading &&
          [SLUGS_NAME.tulumEats]?.includes(settings?.slug) ? (
            <Row>
              <Col xs={12} className="spinner-content">
                <div className="spinner">
                  <Spinner color="primary" />
                </div>
              </Col>
            </Row>
          ) : (
            <Fragment>
              {!(
                contentPage?.type === "FAQ" &&
                [SLUGS_NAME.tulumEats]?.includes(settings?.slug)
              ) && (
                <Row className="mb-2">
                  <Col sm={12} md={7}>
                    <div className="text-right">
                      {accesses.canAdd && (
                        <Button
                          type="button"
                          color="success"
                          className="btn-rounded waves-effect waves-light mb-2 mr-2"
                          onClick={() =>
                            history.push(
                              `/${
                                isWeb ? "content-pages" : "app-settings"
                              }/${contentPageId}/sections/add${
                                props?.location?.search
                              }`
                            )
                          }
                        >
                          <i className="mdi mdi-plus mr-1" />
                          {props.t("add")} {props.t("new")} {props.t("section")}
                        </Button>
                      )}
                    </div>
                  </Col>
                </Row>
              )}

              <Row>
                {!(
                  contentPage?.type === "FAQ" &&
                  [SLUGS_NAME.tulumEats]?.includes(settings?.slug)
                ) && (
                  <Col sm={12} md={7} className="spinner-content">
                    <CardContent
                      currentUrl={`${
                        isWeb ? "content-pages" : "app-settings"
                      }/${contentPageId}/sections`}
                      subCategories={contentPagesList}
                      onDragEnd={onCategoryDragEnd}
                      toggleConfirmModal={toggleConfirmModal}
                      accesses={accesses}
                      contentPage={contentPage}
                    />

                    {!loading && contentPagesList?.length <= 0 && (
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
                )}

                <Col
                  sm={12}
                  md={
                    !(
                      contentPage?.type === "FAQ" &&
                      [SLUGS_NAME.tulumEats]?.includes(settings?.slug)
                    )
                      ? 5
                      : 12
                  }
                >
                  <EditContent fields={true} />
                </Col>
              </Row>
            </Fragment>
          )}
        </Container>
      </div>
    </React.Fragment>
  )
}

ContentPages.propTypes = {
  contentPage: PropTypes.array,
  onGetContentPage: PropTypes.func,
  onDeleteContentPageField: PropTypes.func,
  onPutContentPageSort: PropTypes.func,
}

const mapStateToProps = ({ contentpages, Settings }) => ({
  loading: contentpages.loading,
  contentPage: contentpages.contentPage,
  settings: Settings.settings,
})

const mapDispatchToProps = dispatch => ({
  onGetContentPage: id => dispatch(getContentPage(id)),
  onDeleteContentPageField: (data, callback) =>
    dispatch(deleteContentPageField(data, callback)),
  onPutContentPageSort: (data, id) =>
    dispatch(putContentPageFieldSort(data, id)),
})

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(withTranslation()(ContentPages))
)
