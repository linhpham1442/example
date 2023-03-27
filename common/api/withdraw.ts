import { fetchApi } from "@/common/utils";
import { METHOD } from "@/common/utils/constants";
import queryString from "query-string";

export const createWithdraw =
  (body: any, isCache: boolean = false) =>
  () =>
    fetchApi<any>(`/withdraw/create`, body, METHOD.POST, {}, isCache);

export const verifyWithdraw =
  (body: any, isCache: boolean = false) =>
  () =>
    fetchApi<any>(`/withdraw/verify-otp`, body, METHOD.POST, {}, isCache);

export const regenerateOtp =
  (body: any, isCache: boolean = false) =>
  () =>
    fetchApi<any>(`/withdraw/regenerate-otp`, body, METHOD.POST, {}, isCache);
