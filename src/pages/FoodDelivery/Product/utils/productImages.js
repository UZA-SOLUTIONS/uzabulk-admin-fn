export const productImageUrl = value => {
  if (!value) return ""
  if (typeof value === "string") {
    if (/^https?:\/\//i.test(value) || value.startsWith("/")) return value
    return ""
  }
  return value.link || value.url || ""
}

export const productImageKey = value => {
  if (!value) return ""
  if (typeof value === "string") return value
  return value.link || value.url || value._id || ""
}

export const filesFromProductImages = (featured, images = []) => {
  const items = []
  const featuredKey = productImageKey(featured)
  const featuredUrl = productImageUrl(featured) || featuredKey
  if (featuredKey) {
    items.push({
      preview: featuredUrl,
      name: featuredUrl,
      url: featuredKey,
    })
  }

  ;(Array.isArray(images) ? images : []).forEach(image => {
    const key = productImageKey(image)
    if (!key || key === featuredKey) return
    const url = productImageUrl(image) || key
    items.push({
      preview: url,
      name: url,
      url: key,
    })
  })

  return items
}

export const truncateText = (value = "", max = 80) => {
  const text = String(value || "")
  if (text.length <= max) return text
  return `${text.slice(0, max)}…`
}
