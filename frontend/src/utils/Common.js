let url = "";
if (process.env.NODE_ENV === "production") {
  url = "/.netlify/functions/app/api";
} else {
  url = "http://localhost:5000/.netlify/functions/app/api";
}
export const API_ROOT_PATH = url;

export function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
