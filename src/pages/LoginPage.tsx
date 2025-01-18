
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginRequest } from "../api/auth";
import { useStore } from "../store/authStore";
import { Button, Input } from "@mantine/core";
import  Loading  from '../components/Loading';
import { toast, Toaster } from "sonner";

export const LoginPage = () => {
  
  const { signIn } = useStore();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  //esta funcion se ejecuta cuando se envia el formulario
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target;
    setData({
      ...data,
      [name]: value,
    });
  } 

  const handleSubmit = async (e:React.FormEvent<HTMLFormElement>) => {
    setLoading(true);
    e.preventDefault();
    const result = await loginRequest(data.email, data.password);
   
    if (result) {
      toast.success("Inicio de sesion exitoso");
      setTimeout(() =>{
        
      setLoading(false);
      signIn(result);
      navigate("/dashboard"); 
        
       
      }, 1000);
    }
     
  }


  return (
    <form onSubmit={handleSubmit} action="" className="flex flex-col gap-4">
      <Input name="email" onChange={handleChange} placeholder="email" type="email" required />
      <Input name="password" onChange={handleChange} placeholder="password" type="password" required />
      <Button type="submit" >Login</Button>
      <Loading visible={loading} />
      <Toaster
    />
    </form>
      
  )
}
