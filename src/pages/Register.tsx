import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import { useForm, SubmitHandler } from "react-hook-form";
import InputErrormesg from "../components/ui/Inputerrormessage";
import { data_register } from "../data";
import { yupResolver } from "@hookform/resolvers/yup";
import { RegisterSchema } from "../validation";

////   ///////  HANDELERS   ///////

const RegisterPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>({
    resolver: yupResolver(RegisterSchema),
  });
  const onSubmit: SubmitHandler<IFormInput> = (data) => console.log(data);
  interface IFormInput {
    username: string;
    email: string;
    password: string;
  }

  ///////  RENDERS   ///////
  const handleRegister = data_register.map(({name,placeholder,type,validation},index)=>(
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
      <h2 className="text-center mb-4 text-3xl font-semibold">
        Register to get access!
      </h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        
        {handleRegister}
        <Button fullWidth>Register</Button>
      </form>
    </div>
  );
};

export default RegisterPage;
