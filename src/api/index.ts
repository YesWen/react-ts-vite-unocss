/// <reference types="api" />
type S<url> = url extends `${infer _}/{${infer P}}${infer ex}` ? P | S<ex> : never;
type getParams<url> = Record<S<url>, string | number>;
type FReq<Req, Res> = (req?: Partial<Req>) => Promise<Partial<Res>>;
type M<type> = <req, res>() => <U extends string>(url: U) => FReq<getParams<U> & req, res>;
const factory = <Type extends string>(type: Type) => (() => (url) => ({ type, url })) as unknown as M<Type>;
const post = factory("POST");
const get = factory("GET");
const del = factory("DELETE");
const put = factory("PUT");

type Page = { page?: number; size?: number; last_time?: number };

export const map = {
  bannerList: get<{type:string},{code:number;data:any;msg:string}>()("api/index/bannerList"),
};
