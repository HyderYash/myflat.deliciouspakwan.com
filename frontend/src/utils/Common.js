let url = "";
if (process.env.NODE_ENV === "production") {
  url = "https://myflat-deliciouspakwan-com-backend.onrender.com/api";
} else {
  url = "http://localhost:5000/api";
}
export const API_ROOT_PATH = url;

export function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
