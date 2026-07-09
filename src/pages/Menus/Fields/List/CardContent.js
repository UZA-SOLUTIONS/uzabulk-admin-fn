import React, { useState } from "react"
import PropTypes from "prop-types"
import { Link } from "react-router-dom"

import {
  Card,
  CardBody,
  CardTitle,
  Col,
  Row,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Collapse,
  Badge,
  UncontrolledTooltip,
} from "reactstrap"

//i18n
import { withTranslation } from "react-i18next"

import Dragable from "./Dragable"

const CardContent = props => {
  const {
    onDragEnd,
    category,
    _id,
    currentUrl,
    title,
    subCategories,
    provided,
    toggleConfirmModal,
    status,
    accesses,
    query,
    activeStoreType,
  } = props
  const [open, setOpen] = useState(false)

  if (!_id) {
    return (
      <Dragable
        onDragEnd={onDragEnd(subCategories)}
        droppableId={"no_parent"}
        items={subCategories}
        renderItem={({ category, provided }) => (
          <CardContent
            {...props}
            provided={provided}
            category={category}
            _id={category._id}
            title={category.label}
            subCategories={category.child}
            status={category.status}
            query={query}
          />
        )}
      />
    )
  }

  return (
    <div className="position-relative">
      {subCategories && subCategories.length > 0 && (
        <div className="position-absolute py-3">
          <Link
            to="#"
            className="text-secondary font-size-18"
            onClick={e => {
              e.preventDefault()
              setOpen(!open)
            }}
          >
            <i
              className={
                !open ? "dripicons-chevron-right" : "dripicons-chevron-down"
              }
            />
          </Link>
        </div>
      )}

      <Card className={true ? `${"ml-4 mb-0"}` : `mb-0`}>
        <CardTitle className="border p-3 mb-0 rounded-top">
          <Row>
            <Col xs={6} className="text-truncate">
              {accesses?.canEdit && (
                <Link
                  to="#"
                  onClick={e => e.preventDefault()}
                  className="mr-3 cursor-move"
                  {...(provided
                    ? {
                        ...provided.dragHandleProps,
                      }
                    : {})}
                >
                  <i className="mdi mdi-drag-vertical" />
                </Link>
              )}
              <span id={"title" + _id + "title"}>{props.t(title)}</span>

              <UncontrolledTooltip
                placement="bottom"
                target={"title" + _id + "title"}
              >
                {props.t(title)}
              </UncontrolledTooltip>
            </Col>

            <Col xs={6} className="text-right">
              <Badge
                className={
                  "mr-3 text-capitalize font-size-12 align-self-center badge-soft-" +
                  (status === "active" ? "success" : "danger")
                }
                pill
              >
                {props.t(status)}
              </Badge>

              {
                <span className="font-weight-normal mr-3">
                  {props.t("items")}:{" "}
                  {(subCategories && subCategories.length) || 0}
                </span>
              }

              <UncontrolledDropdown className="float-right">
                <DropdownToggle href="#" className="arrow-none" tag="i">
                  <i className="mdi mdi-dots-vertical m-0 text-muted h5" />
                </DropdownToggle>
                <DropdownMenu right>
                  <DropdownItem
                    tag={Link}
                    to={`/${currentUrl}/${_id}/edit`}
                    className="text-primary font-size-15"
                  >
                    <i className="mdi mdi-pencil mr-3" id="viewtooltip" />
                    {props.t("edit")}
                  </DropdownItem>
                  {!category?.islogin &&
                    !category?.isSignUp &&
                    accesses?.canDelete && (
                      <DropdownItem
                        tag={Link}
                        to="#"
                        className="text-danger font-size-15"
                        onClick={e => {
                          e.preventDefault()
                          toggleConfirmModal(_id)
                        }}
                      >
                        <i className="mdi mdi-close mr-3" id="deletetooltip" />
                        {props.t("delete")}
                      </DropdownItem>
                    )}
                </DropdownMenu>
              </UncontrolledDropdown>
            </Col>
          </Row>
        </CardTitle>

        <Collapse isOpen={open}>
          {subCategories && subCategories.length > 0 && (
            <div className="bg-light pb-4"></div>
          )}

          <Dragable
            onDragEnd={onDragEnd(subCategories)}
            droppableId={_id}
            items={subCategories}
            renderItem={({ category, provided }) => (
              <CardBody className="bg-light py-0">
                <CardContent
                  {...props}
                  provided={provided}
                  category={category}
                  _id={category._id}
                  title={category.label}
                  subCategories={category.child}
                  status={category.status}
                  query={query}
                />
              </CardBody>
            )}
          />

          {subCategories && subCategories.length > 0 && (
            <div className="bg-light pb-4"></div>
          )}
        </Collapse>
      </Card>
    </div>
  )
}

CardContent.propTypes = {
  onDragEnd: PropTypes.func,
  _id: PropTypes.string,
  currentUrl: PropTypes.string,
  title: PropTypes.string,
  subCategories: PropTypes.array,
  provided: PropTypes.any,
  toggleConfirmModal: PropTypes.func,
  query: PropTypes.string,
}

export default withTranslation()(CardContent)
