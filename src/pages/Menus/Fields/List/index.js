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
  getMenu,
  getMenuFields,
  deleteMenuField,
  putMenuFieldSort,
} from "store/actions"
import ConfirmModal from "./ConfirmModal"

import CardContent from "./CardContent"

import EditContent from "../../AddEdit"

// Components
import NotFound from "pages/Utility/pages-404-content"

// a little function to help us with reordering the result
const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list)
  const [removed] = result.splice(startIndex, 1)
  result.splice(endIndex, 0, removed)

  return result
}

const Menus = ({
  accessLevel,
  role,
  history,
  menu,
  menuFields,
  onGetMenu,
  onGetMenuFields,
  onDeleteMenuField,
  onPutMenuSort,
  loading,
  ...props
}) => {
  if (
    !props.settings?.hideThings?.find(
      element => element.type === "isWebsiteMenu"
    )?.value
  ) {
    return <NotFound />
  }

  const { menuId } = useParams()
  const { content_name } = queryString.parse(props?.location?.search)

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
  const [menusList, setMenusList] = useState([])

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
    onGetMenu(menuId)
    onGetMenuFields({ menuId })
  }, [menuId])

  useEffect(() => {
    setMenusList(menuFields || [])
  }, [menuFields])

  const toggleConfirmModal = fdCategoryId => {
    setConfirmModal(prevState => ({
      isOpen: !prevState.isOpen,
      fdCategoryId,
    }))
  }

  const removeConfirm = () => {
    const { fdCategoryId, isOpen } = confirmModal

    const onComplete = () => {
      onGetMenu(menuId)
      onGetMenuFields({ menuId })
    }

    setConfirmModal({ isOpen: !isOpen, fdCategoryId: null })
    onDeleteMenuField(fdCategoryId, onComplete)
  }

  const onCategoryDragEnd = list => result => {
    if (!accesses?.canEdit) return
    const { destination, draggableId, source } = result
    if (!destination) {
      return
    }

    const items = reorder(list, source.index, destination.index)

    if (destination.droppableId === "no_parent") {
      setMenusList(items)
    } else {
      const _list = menusList

      const findParent = list => {
        for (let i = 0; i < list.length; i++) {
          const item = list[i]

          if (item._id === destination.droppableId) {
            item.child = items
            break
          }

          if (item?.child?.length > 0) {
            findParent(item?.child)
          }
        }
      }

      findParent(_list)
      setMenusList(_list)
    }

    onPutMenuSort(
      {
        sortOrder: items?.map((item, index) => ({
          _id: item._id,
          sortOrder: index + 1,
        })),
      },
      menuId
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
                title: props.t("menu"),
                link: "/menus",
              },
              {
                title:
                  (menu?.title || content_name || "") +
                  " " +
                  props.t("sections"),
              },
            ]}
          />

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
                        `/${"menus"}/${menuId}/sections/add${
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

          <Row>
            <Col sm={12} md={7} className="spinner-content">
              <CardContent
                currentUrl={`${"menus"}/${menuId}/sections`}
                subCategories={menusList}
                onDragEnd={onCategoryDragEnd}
                toggleConfirmModal={toggleConfirmModal}
                accesses={accesses}
              />

              {!loading && menusList?.length <= 0 && (
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

            <Col sm={12} md={5}>
              <EditContent fields={true} />
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  )
}

Menus.propTypes = {
  menu: PropTypes.array,
  onGetMenu: PropTypes.func,
  onDeleteMenuField: PropTypes.func,
  onPutMenuSort: PropTypes.func,
}

const mapStateToProps = ({ menus, Settings }) => ({
  settings: Settings.settings,
  loading: menus.loading,
  menu: menus.menu,
  menuFields: menus.menuFields,
})

const mapDispatchToProps = dispatch => ({
  onGetMenu: id => dispatch(getMenu(id)),
  onGetMenuFields: (data, callback) => dispatch(getMenuFields(data, callback)),
  onDeleteMenuField: (data, callback) =>
    dispatch(deleteMenuField(data, callback)),
  onPutMenuSort: (data, id) => dispatch(putMenuFieldSort(data, id)),
})

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(withTranslation()(Menus))
)
