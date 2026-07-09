import React, { useEffect, useState } from "react"
import PropTypes from "prop-types"
import { Link } from "react-router-dom"
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd"
import { Badge, Button, Collapse } from "reactstrap"
import { DEFAULT_STORE_TYPE, CATEGORY_FORM } from "helpers/contants"
import { getCategoryImageUrl } from "helpers/categoryList"
import { withTranslation } from "react-i18next"

const isNestedForm = activeStoreType =>
  (CATEGORY_FORM[activeStoreType?.storeType]
    ? CATEGORY_FORM[activeStoreType?.storeType]
    : DEFAULT_STORE_TYPE.CATEGORY_FORM) !== "simple"

const CategoryRow = ({
  category,
  provided,
  toggleConfirmModal,
  accesses,
  query,
  activeStoreType,
  expandAll,
  canDelete,
  depth,
  t,
  children,
}) => {
  const [open, setOpen] = useState(false)
  const subCategories = category?.subcategories || []
  const hasChildren = subCategories.length > 0
  const imageUrl = getCategoryImageUrl(category)
  const nested = isNestedForm(activeStoreType)
  const status = category?.status
  const editPath = `/categories/save/${category._id}${query || ""}`

  useEffect(() => {
    if (expandAll === true) setOpen(true)
    if (expandAll === false) setOpen(false)
  }, [expandAll])

  return (
    <div
      className={`category-card ${depth > 0 ? "category-card--nested" : ""}`}
      ref={provided?.innerRef}
      {...provided?.draggableProps}
    >
      <div className="category-card__row">
        {accesses?.canEdit && (
          <span
            className="category-card__drag"
            title={t("sort")}
            {...(provided ? provided.dragHandleProps : {})}
          >
            <i className="mdi mdi-drag-vertical" />
          </span>
        )}

        {hasChildren ? (
          <button
            type="button"
            className="category-card__expand"
            aria-expanded={open}
            onClick={() => setOpen(!open)}
          >
            <i
              className={
                open ? "mdi mdi-chevron-down" : "mdi mdi-chevron-right"
              }
            />
          </button>
        ) : (
          <span className="category-card__expand category-card__expand--placeholder" />
        )}

        {imageUrl ? (
          <img src={imageUrl} alt="" className="category-card__thumb" />
        ) : (
          <div className="category-card__thumb-placeholder">
            <i className="mdi mdi-folder-outline" />
          </div>
        )}

        <div className="category-card__body">
          <p className="category-card__title">{category.catName}</p>
          {category?.catDesc && (
            <p className="category-card__desc">{category.catDesc}</p>
          )}
          <div className="category-card__meta">
            <Badge
              color={status === "active" ? "success" : "secondary"}
              className="text-capitalize font-size-11"
              pill
            >
              {t(status)}
            </Badge>
            {category?.isFeatured && (
              <Badge color="warning" className="font-size-11" pill>
                {t("featured")}
              </Badge>
            )}
            {nested && hasChildren && (
              <span className="text-muted small">
                {t("items")}: {subCategories.length}
              </span>
            )}
          </div>
        </div>

        <div className="category-card__actions">
          {accesses?.canEdit && (
            <Button
              tag={Link}
              to={editPath}
              color="light"
              size="sm"
              className="btn-soft-primary"
              title={t("edit")}
            >
              <i className="mdi mdi-pencil-outline" />
            </Button>
          )}
          {accesses?.canDelete && canDelete && (
            <Button
              color="light"
              size="sm"
              className="btn-soft-danger"
              title={t("delete")}
              onClick={() => toggleConfirmModal(category._id)}
            >
              <i className="mdi mdi-trash-can-outline" />
            </Button>
          )}
        </div>
      </div>

      {hasChildren && (
        <Collapse isOpen={open}>
          <div className="category-card__children">{children}</div>
        </Collapse>
      )}
    </div>
  )
}

const CategoryDroppableList = ({
  droppableId,
  items,
  depth,
  renderRowChildren,
  ...rowProps
}) => (
  <Droppable droppableId={droppableId}>
    {dropProvided => (
      <div ref={dropProvided.innerRef} {...dropProvided.droppableProps}>
        {items?.map((category, index) => (
          <Draggable
            key={category._id}
            draggableId={String(category._id)}
            index={index}
            isDragDisabled={!rowProps.accesses?.canEdit}
          >
            {dragProvided => (
              <CategoryRow
                {...rowProps}
                category={category}
                provided={dragProvided}
                depth={depth}
              >
                {renderRowChildren(category, depth)}
              </CategoryRow>
            )}
          </Draggable>
        ))}
        {dropProvided.placeholder}
      </div>
    )}
  </Droppable>
)

const CardContent = ({
  subCategories,
  onDragEnd,
  toggleConfirmModal,
  accesses,
  query,
  activeStoreType,
  expandAll,
  canDelete,
  t,
}) => {
  const renderChildren = (category, depth) => {
    const subs = category?.subcategories || []
    if (!subs.length) return null
    return (
      <CategoryDroppableList
        droppableId={String(category._id)}
        items={subs}
        depth={depth + 1}
        renderRowChildren={renderChildren}
        toggleConfirmModal={toggleConfirmModal}
        accesses={accesses}
        query={query}
        activeStoreType={activeStoreType}
        expandAll={expandAll}
        canDelete={canDelete}
        t={t}
      />
    )
  }

  return (
    <div className="categories-tree">
      <DragDropContext onDragEnd={onDragEnd}>
        <CategoryDroppableList
          droppableId="no_parent"
          items={subCategories || []}
          depth={0}
          renderRowChildren={renderChildren}
          toggleConfirmModal={toggleConfirmModal}
          accesses={accesses}
          query={query}
          activeStoreType={activeStoreType}
          expandAll={expandAll}
          canDelete={canDelete}
          t={t}
        />
      </DragDropContext>
    </div>
  )
}

CardContent.propTypes = {
  onDragEnd: PropTypes.func.isRequired,
  subCategories: PropTypes.array,
  toggleConfirmModal: PropTypes.func,
  query: PropTypes.string,
  expandAll: PropTypes.bool,
  canDelete: PropTypes.bool,
}

export default withTranslation()(CardContent)
