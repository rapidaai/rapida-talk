import { IResponse } from "@app/types";
import { NextResponse } from 'next/server';

/**
 *  A common response for all the api request
 * @param success 
 * @param message 
 * @param data 
 * @returns 
 */
export function getResponse(success: boolean, message: string | null = null, data: any = undefined): IResponse<any> {
  return {success: success, errorMessage: message, data: data}
}


/**
 * a wrapper for using response with response object
 * @param data 
 * @returns 
 */
export function onSuccessResponse(data: any, status: number = 200): NextResponse {
  return NextResponse.json(getResponse(true, "", data), {
    status: status,
  })
}

/**
 *  on error with error message
 * @param errMessage 
 * @returns 
 */
export function onErrorResponse(errMessage: string, status: number = 400): NextResponse {
  return NextResponse.json(getResponse(true, errMessage), {
    status: status,
  })
}