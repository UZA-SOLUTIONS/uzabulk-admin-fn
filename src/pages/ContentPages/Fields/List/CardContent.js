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
    _id,
    currentUrl,
    title,
    subCategories,
    provided,
    toggleConfirmModal,
    status,
    accesses,
    type,
    contentPage,
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
            _id={category._id}
            title={category.label}
            subCategories={category.subcategories}
            status={category.status}
            type={category.type}
          />
        )}
      />
    )
  }

  return (
    <div className="position-relative">
      <Card className="mb-0">
        <CardTitle className="border p-3 mb-0 rounded-top">
          <Row>
            <Col xs={6} className="text-capitalize text-truncate">
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
              {/*props.t(title)*/}

              <span
                className="ml-2 font-size-14 text-muted"
                id={type + "-" + _id + "type"}
              >
                {type}
              </span>

              <UncontrolledTooltip
                placement="bottom"
                target={type + "-" + _id + "type"}
              >
                {props.t(type)}
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

              <UncontrolledDropdown className="float-right">
                <DropdownToggle
                  href="#"
                  className="arrow-none external-event"
                  tag="i"
                >
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
                  {accesses?.canDelete &&
                    type !== "form" &&
                    type !== "faq" &&
                    contentPage?.type !== "BLOG" && (
                      <DropdownItem
                        href="#"
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
                  _id={category._id}
                  title={category.label}
                  subCategories={category.subcategories}
                  status={category.status}
                  type={category.type}
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
}

export default withTranslation()(CardContent)
