import { IloginInput, IregisterInput } from "../Interfaces/Interfaces";

export const data_register : IregisterInput[] =[
    {
        placeholder:"Username",
        name:"username",
        type:"text",
        validation:{
            required: "true"
            , minLength: 5

        }
    },
    {
        placeholder:"email",
        name:"email",
        type:"email",
        validation:{
            required: "true",
            pattern: /^[^@]+@[^@'.]+\.[^@'.]{2,}$/ ,
        }
    },
    {
        placeholder:"password",
        name:"password",
        type:"password",
        validation:{
            required: "true"
            , minLength: 5
        }
    }
]

export const data_login : IloginInput[] =[

    {
        placeholder:"email",
        name:"identifier",
        type:"email",
        validation:{
            required: "true",
            pattern: /^[^@]+@[^@'.]+\.[^@'.]{2,}$/ ,
        }
    },
    {
        placeholder:"password",
        name:"password",
        type:"password",
        validation:{
            required: "true"
            , minLength: 5
        }
    }
]