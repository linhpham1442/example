import { fetchApi } from "@/common/utils";
import { METHOD } from "@/common/utils/constants";
import queryString from "query-string";

export const getAccountHistory =
  (start_date: any = null, end_date: any = null, limit: any = null, isCache: boolean = false) =>
  () =>
    fetchApi<any>(`/account-history/list?${queryString.stringify({ start_date, end_date, limit })}`, {}, METHOD.GET, isCache);

export const getClientHistory =
  (start_date: any = null, end_date: any = null, limit: any = null, isCache: boolean = false) =>
  () =>
    fetchApi<any>(`/client-history/list?${queryString.stringify({ start_date, end_date, limit })}`, {}, METHOD.GET, isCache);

export const getProxyHistory =
  (start_date: any = null, end_date: any = null, limit: any = null, isCache: boolean = false) =>
  () =>
    fetchApi<any>(`/proxy-history/list?${queryString.stringify({ start_date, end_date, limit })}`, {}, METHOD.GET, isCache);
export const getVideoHistory =
  (start_date: any = null, end_date: any = null, limit: any = null, isCache: boolean = false) =>
  () =>
    fetchApi<any>(`/video-history/list?${queryString.stringify({ start_date, end_date, limit })}`, {}, METHOD.GET, isCache);

export const getDetailAccount =
  (page: number, page_size: number, isCache: boolean = false) =>
  () =>
    fetchApi<any>(`/detail-account/list?${queryString.stringify({ page, page_size })}`, {}, METHOD.GET, isCache);

export const getDetailClient =
  (page: number, page_size: number, isCache: boolean = false) =>
  () =>
    fetchApi<any>(`/detail-client/list?${queryString.stringify({ page, page_size })}`, {}, METHOD.GET, isCache);

export const getDetailProxy =
  (page: number, page_size: number, isCache: boolean = false) =>
  () =>
    fetchApi<any>(`/detail-proxy/list?${queryString.stringify({ page, page_size })}`, {}, METHOD.GET, isCache);

export const getDetailVideo =
  (page: number, page_size: number, isCache: boolean = false) =>
  () =>
    fetchApi<any>(`/detail-video/list?${queryString.stringify({ page, page_size })}`, {}, METHOD.GET, isCache);

export const getRevenueTotal =
  (start_date: any = null, end_date: any = null, limit: any = null, isCache: boolean = false) =>
  () =>
    fetchApi<any>(`/revenue-history/sum-revenue?${queryString.stringify({ start_date, end_date, limit })}`, {}, METHOD.GET, isCache);

export const getRevenueList =
  (start_date: any = null, end_date: any = null, limit: any = null, isCache: boolean = false) =>
  () =>
    fetchApi<any>(`/revenue-history/list?${queryString.stringify({ start_date, end_date, limit })}`, {}, METHOD.GET, isCache);

export const getViewsTotal =
  (start_date: any = null, end_date: any = null, limit: any = null, isCache: boolean = false) =>
  () =>
    fetchApi<any>(`/views-history/sum-views?${queryString.stringify({ start_date, end_date, limit })}`, {}, METHOD.GET, isCache);

export const getViewsList =
  (start_date: any = null, end_date: any = null, limit: any = null, isCache: boolean = false) =>
  () =>
    fetchApi<any>(`/views-history/list?${queryString.stringify({ start_date, end_date, limit })}`, {}, METHOD.GET, isCache);

export const getWatchTimeTotal =
  (start_date: any = null, end_date: any = null, limit: any = null, isCache: boolean = false) =>
  () =>
    fetchApi<any>(`/watch-time-history/sum-watch-time?${queryString.stringify({ start_date, end_date, limit })}`, {}, METHOD.GET, isCache);

export const getWatchTimeList =
  (start_date: any = null, end_date: any = null, limit: any = null, isCache: boolean = false) =>
  () =>
    fetchApi<any>(`/watch-time-history/list?${queryString.stringify({ start_date, end_date, limit })}`, {}, METHOD.GET, isCache);
