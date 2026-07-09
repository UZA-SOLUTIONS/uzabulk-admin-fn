import React, { useEffect, useState } from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import { withRouter, Link } from "react-router-dom"
import { isEmpty } from "lodash"
import BootstrapTable from "react-bootstrap-table-next"
import paginationFactory, {
  PaginationListStandalone,
  PaginationProvider,
} from "react-bootstrap-table2-paginator"
import ToolkitProvider, { Search } from "react-bootstrap-table2-toolkit"
import AnimateHeight from "react-animate-height"

import {
  Button,
  Card,
  CardBody,
  Col,
  Container,
  Row,
  Spinner,
} from "reactstrap"

import SearchInput from "components/Common/SearchInput"

//i18n
import { withTranslation } from "react-i18next"

//Import Breadcrumb
import Breadcrumbs from "components/Common/Breadcrumb2"
import { getGalleries, deleteGallery, putGalleriesStatus } from "store/actions"
import ListColumns, { selectRow } from "./ListColumns"
import ConfirmModal from "./ConfirmModal"
import PreviewModal from "./Preview"

// Components
import NotFound from "pages/Utility/pages-404-content"
import CustomPagination from "components/Common/CustomPagination"

const Galleries = ({
  accessLevel,
  history,
  galleries,
  totalGalleries,
  onGetGalleries,
  onDeleteGallery,
  onPutGalleriesStatus,
  loading,
  ...props
}) => {
  if (
    !props.settings?.hideThings?.find(element => element.type === "isGallery")
      ?.value
  ) {
    return <NotFound />
  }

  const [accesses, setaccesses] = useState({
    canAdd: false,
    canEdit: false,
    canDelete: false,
    canBlock: false,
  })
  const [selected, setSelected] = useState([])
  const [confirmModal, setConfirmModal] = useState({
    isOpen: false,
    galleryId: null,
  })
  const [previewModal, setPreviewModal] = useState({
    isOpen: false,
    preview: null,
  })
  const [filter, setFilter] = useState({
    orderBy: "date_created_utc",
    order: -1,
    page: 1,
    limit: 20,
    search: "",
    fields: [
      {
        fieldName: "",
        fieldValue: "",
      },
    ],
  })
  const [searchText, setSearchText] = useState("")
  const [galleriesList, setGalleriesList] = useState([])
  const pageOptions = {
    sizePerPage: 20,
    totalSize: totalGalleries,
    custom: true,
    onPageChange: page => setFilter(prevState => ({ ...prevState, page })),
  }
  const { SearchBar } = Search

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
    onGetGalleries(filter)
    setGalleriesList(galleries)
  }, [onGetGalleries, JSON.stringify(filter)])

  useEffect(() => {
    setGalleriesList(galleries || [])
  }, [galleries])

  // eslint-disable-next-line no-unused-vars
  const handleTableChange = (type, { searchText, sortField, sortOrder }) => {
    if (type === "search") {
      setSearchText(searchText)
    }

    if (type === "sort") {
      if (sortField == "createdAt") {
        sortField = "date_created_utc"
      }

      if (sortOrder == "desc") {
        sortOrder = -1
      } else if (sortOrder == "asc") {
        sortOrder = 1
      }

      setFilter(prevState => ({
        ...prevState,
        orderBy: sortField,
        order: sortOrder,
      }))
    }
  }

  const toggleConfirmModal = galleryId => {
    setConfirmModal(prevState => ({ isOpen: !prevState.isOpen, galleryId }))
  }

  const togglePreviewModal = preview => {
    setPreviewModal(prevState => ({ isOpen: !prevState.isOpen, preview }))
  }

  const removeConfirm = () => {
    const { galleryId, isOpen } = confirmModal

    const onComplete = () => {
      setPreviewModal(prevState => ({ isOpen: false, preview: null }))
      onGetGalleries(filter)
    }
    onDeleteGallery({ _id: galleryId }, onComplete)
    setConfirmModal({ isOpen: !isOpen, galleryId: null })
  }

  const onStatusChange = value => {
    const fieldName = !!value ? "status" : ""
    const fieldValue = value

    setFilter(prevState => ({
      ...prevState,
      fields: [{ fieldName, fieldValue }],
    }))
  }

  const onSearch = event => {
    event.preventDefault()

    setFilter(prevState => ({ ...prevState, search: searchText, page: 1 }))
  }

  const onSelect = (row, isSelect) => {
    if (isSelect) {
      setSelected(prevSelected => [...prevSelected, row._id])
    } else {
      setSelected(prevSelected => prevSelected.filter(x => x !== row._id))
    }
  }

  const onSelectAll = (isSelect, rows) => {
    const ids = rows.map(r => r._id)
    if (isSelect) {
      setSelected(ids)
    } else {
      setSelected([])
    }
  }

  const handleGalleryStatusChange = status => {
    const callback = () => {
      setSelected([])
      onGetGalleries(filter)
    }

    onPutGalleriesStatus({ _id: selected, status }, callback)
  }

  return (
    <React.Fragment>
      <ConfirmModal
        isOpen={confirmModal.isOpen}
        toggle={toggleConfirmModal}
        onConfirm={removeConfirm}
        previewtoggle={togglePreviewModal}
      />

      <PreviewModal {...previewModal} accesses={accesses} toggle={togglePreviewModal} confirm={toggleConfirmModal} />

      <div className="page-content">
        <Container fluid>
          <Breadcrumbs
            title="Galleries"
            breadcrumbItem={props.t("gallery")}
            breadcrumbItems={[{ title: props.t("gallery") }]}
          />

          <Row>
            <Col className="" xs={12} md={7} lg={8} xl={7}>
              {" "}
            </Col>

            <Col className="" xs={12} md={5} lg={4} xl={5}>
              <div className="text-sm-right">
                {accesses.canAdd && (
                  <Button
                    type="button"
                    color="success"
                    className="btn-rounded waves-effect waves-light mb-2 mr-2"
                    onClick={() => history.push("/gallery/add")}
                  >
                    <i className="mdi mdi-plus mr-1" />
                    {props.t("add_gallery")}
                  </Button>
                )}
              </div>
            </Col>
          </Row>

          <Row>
            {galleriesList?.map(gallery => (
              <Col key={gallery._id} sm={3} md={4} lg={3} xl={4}>
                <Card>
                  <CardBody>
                    <Link
                      to="#"
                      onClick={e => {
                        e.preventDefault()
                        togglePreviewModal(gallery)
                      }}
                    >
                      <img
                        src={gallery.link}
                        alt=""
                        className="rounded img-fluid"
                      />
                    </Link>
                  </CardBody>
                </Card>
              </Col>
            ))}
          </Row>

          <Row className="align-items-md-center mt-30">
            <Col
              sm={12}
              className="pagination pagination-rounded justify-content-end mb-2 inner-custom-pagination"
            >
              <CustomPagination
                totalCount={pageOptions.totalSize}
                limit={filter.limit}
                page={filter?.page}
                setFilter={setFilter}
              />
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  )
}

Galleries.propTypes = {
  galleries: PropTypes.array,
  totalGalleries: PropTypes.number,
  onGetGalleries: PropTypes.func,
  onDeleteGallery: PropTypes.func,
  onPutGalleriesStatus: PropTypes.func,
}

const mapStateToProps = ({ gallery, Settings }) => ({
  settings: Settings.settings,
  loading: gallery.loading,
  galleries: gallery.galleries,
  totalGalleries: gallery.totalGalleries,
})

const mapDispatchToProps = dispatch => ({
  onGetGalleries: data => dispatch(getGalleries(data)),
  onDeleteGallery: (data, callback) => dispatch(deleteGallery(data, callback)),
  onPutGalleriesStatus: (data, callback) =>
    dispatch(putGalleriesStatus(data, callback)),
})

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(withTranslation()(Galleries))
)
