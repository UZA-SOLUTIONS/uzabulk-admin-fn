export default function getDynamicImage(value, defaultImage) {
  var image = null;
  if (value && typeof value === "object") {
    try {
      image = URL.createObjectURL(value);
    } catch (err) {
      console.error("Profile Image Object not valid for url");
    }
  } else if (value && typeof value === "string" && value !== "none") {
    image = value;
  } else {
    image = defaultImage;
  }
  return image;
}
