import Swal from "sweetalert2";

export default function ErrorPopup({ showIcon = true, title = "Oops...", message = "Something went wrong !" }) {

  switch (title) {
    case "warning":
      Swal.fire({
        icon: "warning",
        title: title,
        text: message,
        heightAuto: false
      });
      break;
    case "success":
      Swal.fire({
        icon: "success",
        title: title,
        text: message,
        heightAuto: false
      });
      break;
    case "info":
      Swal.fire({
        icon: "info",
        title: title,
        text: message,
        heightAuto: false
      });
      break;

    default:
      Swal.fire({
        icon: "error",
        title: title,
        text: message,
        heightAuto: false
      });
      break;
  }

  return null;
}
