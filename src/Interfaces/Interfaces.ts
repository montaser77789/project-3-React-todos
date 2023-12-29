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