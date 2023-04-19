export const API_ROOT_PATH =
  process.env.NODE_ENV === "production"
    ? "https://myflat-deliciouspakwan-com-backend.onrender.com/api"
    : "http://localhost:5000/api";

export function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
