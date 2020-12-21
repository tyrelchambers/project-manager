import { toast } from "react-toastify";

export const copyToClipboard = (text) => {
  window.navigator.clipboard.writeText(text);
  toast.success("Text copied to clipboard");
};
