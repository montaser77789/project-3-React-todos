export interface IregisterInput {
    placeholder:string,
    name:"username" | "email" | "password",
    type:string,
    validation:{
        required?: string,
        minLength?:number,
        pattern?:RegExp ,
}
}

export interface IloginInput {
    placeholder:string,
    name: "identifier" | "password",
    type:string,
    validation:{
        required?: string,
        minLength?:number,
        pattern?:RegExp ,
}}
export interface IerrorResponse {
    error :{
        message?:string
    };
}
export interface Idata {
        id:number,
        title:string,
        description:string
   
}
export interface ItodoCreate {
    title:string,
    description:string

}