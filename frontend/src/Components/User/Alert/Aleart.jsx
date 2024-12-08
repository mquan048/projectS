import { toast } from "react-toastify";
import Swal from "sweetalert2";

export const showErrorToast = (message) => {
  toast.error(message, {
    position: "top-right",
    autoClose: 1500,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: true,
    progress: undefined,
  });
};

export const showSucessToast = (message) => {
  toast.success(message, {
    position: "top-right",
    autoClose: 1500,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });
};

export function showFail(text) {
  Swal.fire({
    icon: "error",
    title: "Oops...",
    text: text,
  });
}

export function showSucess(text) {
  Swal.fire({
    title: "Sucess!",
    icon: "success",
    text: text,
  });
}
