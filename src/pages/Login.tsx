import { useState } from "react";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import InputErrormesg from "../components/ui/Inputerrormessage";
import { data_login } from "../data";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import axioInstance from "../components/config/config.instance";
import { errormsg, successmsg } from "../toastifiy";
import { AxiosError } from "axios";
import { IerrorResponse } from "../Interfaces/Interfaces";
import { LoginSchema } from "../validation";


const LoginPage = () => {

  const [isloading,setisloading]=useState(false)
 
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>({
    resolver: yupResolver(LoginSchema),
  });
  const onSubmit: SubmitHandler<IFormInput> = async(data) => {
    setisloading(true)
   
    console.log(data)
    try {
     const {status ,data:resData} =  await axioInstance.post("/auth/local",data);
     if(status ==200) {
      successmsg({ msg: 'You will navigate to the home page after 2 second to login' });
      
      setTimeout(()=>{
        location.replace("/")
      },2000)
      localStorage.setItem("loggedInUser",JSON.stringify(resData))
      console.log(resData);
    
    }
    } catch (error) {
      const objerror = error as AxiosError<IerrorResponse>
      objerror.response?.data?.error.message
      errormsg({msg : `${objerror.response?.data?.error.message }`  });
      console.log(    objerror.response?.data?.error.message        );
    }finally{
      setisloading(false)
    }
  };
  interface IFormInput {
    identifier: string;
    password: string;
  }

    ///////  RENDERS   ///////
    const handleLogin = data_login.map(({name,placeholder,type,validation},index)=>(
      <div key={index}>
            <Input
              {...register(name, validation)}
              placeholder = {placeholder}
              type={type}
            />
            {errors[name] && <InputErrormesg msg={errors[name]?.message}/>}
          
          </div>
  
    ))
  return (
    <div className="max-w-md mx-auto">
      <h2 className="text-center mb-4 text-3xl font-semibold">Login to get access!</h2>
      <form  onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {handleLogin}

        <Button fullWidth isloading={isloading} > {isloading? "loading..":"Login"} </Button>
      </form>
    </div>
  );
};

export default LoginPage;
