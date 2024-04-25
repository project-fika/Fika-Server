export interface IGetBodyResponseData<Type> {
    err: number;
    errmsg: any;
    (data: Type): Type;
}
