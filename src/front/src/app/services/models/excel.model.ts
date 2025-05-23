export interface ExcelResponse {
  statusCode: number;
  message: string;
  data: {
    isSuccess: boolean;
    excelSheet: {
      fileName: string;
      fileContent: string;
      contentType: string;
    };
  };
}
