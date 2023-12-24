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