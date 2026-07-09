import * as yup from "yup"
export default function validationSchema() {
  return yup.object().shape({
    name: yup.string().required("Name is required"),
    countryCode: yup.object({
      label: yup.string().required("Country Code is required"),
    }),
    mobileNumber: yup.string().required("Mobile is required"),
    email: yup
      .string()
      .email("Enter valid email")
      .required("Email is required"),
    address: yup.string().required("Address is required"),
    lat: yup.string().required("Lat is required"),
    lng: yup.string().required("Lng is required"),
  })
}
