import * as yup from "yup"
export default function validationSchema() {
  return yup.object().shape({
    name: yup.string().required("Name is required"),
    price: yup.number().required("Price is required"),
    vendor: yup
      .object()
      .shape({ value: yup.string().required("Vendor is required") }),
    vehicleType: yup
      .object()
      .shape({ value: yup.string().required("Vehicle Type is required") }),
    description: yup.string().required("Description is required"),
    duration: yup.string().required("Duration is required"),
  })
}
