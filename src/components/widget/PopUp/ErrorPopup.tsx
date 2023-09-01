import Swal from "sweetalert2";

export default function ErrorPopup({ showIcon = true, title = "Oops...", message = "Something went wrong !" }) {
  if (showIcon) {
    Swal.fire({
      icon: "error",
      title: title,
      text: message,
    });
  } else {
    Swal.fire(message);
  }
  return <></>;
}
