import { fetchApi } from "@/common/utils";
import { METHOD } from "@/common/utils/constants";
import queryString from "query-string";

export const getMyDeposit = (isCache: boolean = false) => {

  return fetchApi<any>(`/deposit/list`, null, METHOD.GET, {}, isCache)
}

export const createDepositOrder = (body: any, isCache: boolean = false) => {
  return fetchApi<any>(`/deposit/create`, body, METHOD.POST, {}, isCache)
}