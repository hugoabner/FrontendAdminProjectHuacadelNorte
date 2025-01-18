import {  Button, Menu, rem, useMantineColorScheme, TextInput } from "@mantine/core"
import { Link, useNavigate } from "react-router-dom";
import { FaUser} from "react-icons/fa";
import { AiOutlineLogout } from "react-icons/ai";
import { IconTrash, IconSearch} from "@tabler/icons-react";
import clsx from "clsx";
import { useStore } from "../store/authStore";
import Notification from "./notify/Notification";

function UserMenu () {
  const { colorScheme } = useMantineColorScheme();
  const theme = colorScheme === "light";
  const { signOut } = useStore();
  
  const user = useStore((state) => state.user.user);
  const { username, email, roles, imgURL } = user;

  const navigate = useNavigate();

  const handleLogout = () => {
    signOut() ;
    console.log('Cierre de sesión exitoso');
    navigate('/loginHomePage');
  };
  return( 
    <Menu shadow='md' width={200} position="bottom-end" >
      <Menu.Target>
        <Button
        style={{  color: "white", backgroundColor: "black", height: "50px",  borderRadius: "5px" }}
      className={clsx(`${theme ? "text-gray-400" :  ""
        } flex items-center`)}
    >
      <div className={
        clsx(`${theme ? "" : ""
        } flex items-center space-x-4 `)
      }>
        <div className="bg-gray-300 rounded-full flex items-center justify-center">
          { imgURL ?  

          <img
            src={imgURL}
            alt='Profile'
            className='w-9 h-9 rounded-full p-[0.3px] '
          />

          :
          <img
            src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png"
            alt='Profile'
            className='w-9 h-9 rounded-full p-[0.3px] '
          />
          }
           
        </div>
          <div className='flex flex-col items-start ml-1  font-medium '>
            <span className="text-[14px]">{username}</span> 
            <p className="text-[12px]">{email}</p>
            <span className="text-[12px]">{roles}</span>
          </div>
      </div>
       
        </Button>
      </Menu.Target>
      <Menu.Dropdown className="mt-3">
        <Link to="/profile">
        <Menu.Item 
          leftSection={<FaUser style={{ width: rem(14), height: rem(14) }} />}
        >
          Profile
        </Menu.Item>
        </Link>
        <Menu.Item
          leftSection={
            <AiOutlineLogout style={{ width: rem(14), height: rem(14) }} />
          }
          onClick={handleLogout} 
        >
          Cerrar Sesion 
        </Menu.Item>
        <Menu.Divider />
        <Menu.Label>Danger Zone</Menu.Label>
        <Menu.Item
          color='red'
          leftSection={
            <IconTrash style={{ width: rem(14), height: rem(14) }} />
          }
          onClick={handleLogout}
        >
          Delete account
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
}

export const Navigation = () => {

  const { colorScheme } = useMantineColorScheme();
  const theme = colorScheme === "dark";

  return (
    <div className={clsx(
      "w-full mx-auto flex justify-between flex-row px-4 md:px-6 py-3 items-center gap-4 ",
      theme
        ? "bg-[#1a1b1e] "
        : "bg-[#dcdcdc]"
    ) }>
      <div className="w-full">
        <div className='flex items-center w-full justify-end gap-5'>
          {/* Barra de busqueda */}
          <TextInput
              radius="lg"
              size="sm"
              placeholder="Search questions"
              rightSectionWidth={42}
              leftSection={<IconSearch size={18} stroke={1.5} />}
              className=""
            />
          {/* Icono de notificacion */}
          <Notification />
          {/* Perfil del usuario */}
          <div className={clsx("", theme 
            ? "bg-[#1a1b1e] border-[0.5px] border-gray-600 text-white" 
            : " text-black")}>
            <UserMenu />
            
          </div>
        </div>
      </div>
    </div>
  )
} 
