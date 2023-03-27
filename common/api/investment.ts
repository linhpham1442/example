import { METHOD } from "@/common/utils/constants";
import { fetchApi } from "@/common/utils";

export const getInvestmentPackage = (isCache: boolean = false) => {
  return fetchApi<any>(`packages/get-list-package`, null, METHOD.GET, {}, isCache)
}