/** Count categories in a nested tree (includes subcategories). */
export const countCategoryTree = list => {
  let total = 0
  let active = 0

  const walk = items => {
    if (!items?.length) return
    items.forEach(item => {
      total += 1
      if (item?.status === "active") active += 1
      walk(item?.subcategories)
    })
  }

  walk(list)
  return { total, active, inactive: total - active }
}

/** Resolve category image URL from API field shapes. */
export const getCategoryImageUrl = category => {
  if (!category?.catImage) return null
  if (typeof category.catImage === "string") return category.catImage
  return category.catImage?.link || category.catImage?.url || null
}

/** Payload for POST /category list (CategoryMiddleware). */
export const buildCategoryListPayload = filter => ({
  action: "view",
  method: "post",
  ...filter,
})

/** Find sibling list for a droppable id in the category tree. */
export const findCategoryListByDroppableId = (tree, droppableId) => {
  if (droppableId === "no_parent") {
    return { list: tree, isRoot: true }
  }

  const walk = nodes => {
    if (!nodes?.length) return null
    for (let i = 0; i < nodes.length; i++) {
      const node = nodes[i]
      if (String(node._id) === String(droppableId)) {
        return { list: node.subcategories || [], isRoot: false, parentNodes: nodes, parentIndex: i }
      }
      const nested = walk(node.subcategories)
      if (nested) return nested
    }
    return null
  }

  return walk(tree)
}
