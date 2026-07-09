import { toast } from "react-toastify";

export default function notifyErrors(errors) {
  Object.keys(errors).forEach((error) => {
    if (typeof errors[error] === "object") {
      notifyErrors(errors[error]);
    } else {
      toast.error(errors[error]);
    }
  });
}
