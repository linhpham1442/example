import { fetchApi } from "@/common/utils";
import { METHOD } from "@/common/utils/constants";
import queryString from "query-string";

export const getListDeposit = (page: number, page_size: number, status: string, isCache: boolean = false) => {
  return fetchApi<any>(`/admin/list-all-deposit?${queryString.stringify({ page, page_size, status })}`, null, METHOD.GET, {}, isCache);
};

export const confirmDepositOrder = (id: any, isCache: boolean = false) => {
  return fetchApi<any>(`/admin/charge-balance/${id}`, {}, METHOD.PUT, {}, isCache);
};
