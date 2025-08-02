declare module 'dynamsoft-javascript-barcode' {
  export interface TextResult {
    barcodeFormat: number;
    barcodeFormatString: string;
    barcodeText: string;
    [key: string]: any;
  }
}
