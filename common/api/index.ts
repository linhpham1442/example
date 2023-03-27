import { fetchApi } from "@/common/utils";
import { METHOD } from "@/common/utils/constants";
import queryString from "query-string";

export default {};

export const getYoutubeTracking =
  (type: string, isCache: boolean = false) =>
  () =>
    fetchApi<any>(`/ytb-tracking/get?${queryString.stringify({ type })}`, {}, METHOD.GET, {}, isCache);

export const getYoutubeTrackingTrafficSource =
  (type: string, isCache: boolean = false) =>
  () =>
    fetchApi<any>(`/ytb-tracking-traffic-source/get?${queryString.stringify({ type })}`, {}, METHOD.GET, {}, isCache);

export const getYoutubeTrackingAudience =
  (type: string, isCache: boolean = false) =>
  () =>
    fetchApi<any>(`/ytb-tracking-audience/get?${queryString.stringify({ type })}`, {}, METHOD.GET, {}, isCache);
