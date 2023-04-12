import Swal from "sweetalert2";

export default function getMessage(status = "", message = "") {
  return Swal.fire({
    icon: status,
    text: message,
  });
}
