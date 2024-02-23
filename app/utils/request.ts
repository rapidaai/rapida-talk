import { IResponse } from "@app/types";


export function getResponse(success: boolean, message: string | null = null, data: any = undefined): IResponse {
  return {success: success, errorMessage: message, data: data}
}