export interface UploadFileDto {
  fileName: string,
  userId: number,
  type: string,
  orderId?: number
}