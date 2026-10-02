declare module "qrcode/lib/browser" {
  export * from "qrcode";
  import QRCode from "qrcode";
  export default QRCode;
}
