/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { HiChevronRight, HiChevronLeft} from "react-icons/hi";
import clsx from "clsx";
import { ActionIcon, rem, Stack, Tooltip, UnstyledButton, useMantineColorScheme } from "@mantine/core";
import { Logo } from "./Logo";
import { IconCalendarStats, IconDeviceDesktopAnalytics, IconGauge, IconMoon, IconSettings, IconSun, IconUser } from "@tabler/icons-react";
import { BsPencilSquare } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

const MENUS = [
  { icon: IconGauge, label: "Dashboard", to: "dashboard" },
  { icon: IconDeviceDesktopAnalytics, label: "Miembros", to: "members" },
  { icon: IconCalendarStats, label: "Proyectos", to: "gestionProyectos" },
  { icon: IconUser, label: "Servicios", to: "gestionServicios" },
  { icon: BsPencilSquare, label: "Contactos", to: "gestionContactos" },
  { icon: IconSettings, label: "Calendario", to : "calendario" },
  { icon: IconSettings, label: "Registro", to: "registerUsers" },
  { icon: IconSettings, label: "Configuración", to: "configuracion" },
];
const NavbarLink = ({ icon: Icon, label, active, onClick, isCollapsed }: any) => {
  return (
    <Tooltip
      label={label}
      position="right"
      style={{ userSelect: "none" }}
      transitionProps={{ duration: 0 }}
    >
      <UnstyledButton
        onClick={onClick}
        style={active 
        ? { 
          backgroundColor: "#1d58d8",  
          color: "white", 
          display: "flex", 
          padding: "10px 12px",
          borderRadius: "5px",
          alignItems: "center",
        } 
        : {
          display: "flex", 
          padding: "10px 12px",
          borderRadius: "5px",
          alignItems: "center",
        }}
        className="hover:bg-[#dbe6fe] hover:text-black"
    
        data-active={active || undefined}
      >
        <div>
          <Icon style={{ width: rem(20), height: rem(20) }} stroke={1.5}  />
        </div>
        <div
          className={clsx(
            "flex-1 transition-opacity duration-300",
            isCollapsed ? "opacity-0 w-0 " : "opacity-100 w-auto"
          )}
        >
          {label}
        </div>
      </UnstyledButton>
    </Tooltip>
  );
};


export const Sidebar = () => {

  const navigate = useNavigate();
  const { colorScheme, setColorScheme } = useMantineColorScheme();
  const [ isCollapsed, setIsCollapsed ] = useState(false);
  //const isAuth = useAuthStore(state => state.isAuthenticated);
  const path = location.pathname?.slice(1);

  const theme = colorScheme === "dark";

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  }
  
  const handleClick = (to: string) => {  //esta funcion redirige al usuario a la ruta correspondiente
    navigate(to);
  };

  const links = MENUS.map((link, index) => (
    <NavbarLink
      {...link}
      key={index}
      active={link.to === path}
      onClick={() => handleClick(link.to)}
      isCollapsed={isCollapsed}
    />
  ));

  return ( (

  <div className={clsx("w-full h-full ", theme ? "bg-[#393b41]" : "bg-[#f8f8f8]")}> 

    <div className={ clsx("transition-all duration-700 z-50",isCollapsed 
      ? "w-20 z-50 transition-all duration-700" 
      : "w-56 z-50  transition-all duration-700")}>
      <div className="flex w-full justify-end cursor-pointer ml-3 mt-5" >
        <button 
            onClick={toggleSidebar}
            className="bg-black hover:bg-gray-900 z-30
            text-white font-bold py-1 px-1 rounded-full  flex w-fulljustify-center">
              {
                isCollapsed ? (
                  <HiChevronRight />
                ) : (
                  <HiChevronLeft />
                )
              }
        </button>
      </div>

      <div className="flex flex-col w-full -mt-5">
        <div className={clsx( "flex flex-col items-center", isCollapsed 
          ? "px-1"
          : "px-1 " )}>
          <img 
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQEoenMTdtU3_KWiI_1O6XKwYi4TNTHAFsDWw&s" 
          className={clsx("transition-all duration-700", isCollapsed 
          ? "w-12 h-12 shadow rounded-xl" 
          : "w-20 h-16 shadow rounded-xl")} 
          alt="" />
          <div className={isCollapsed 
            ? "hidden transition-all duration-700 " 
            : "block "}>
            <Logo  />
          </div>
        </div>
        <span className="w-full h-[1px] mt-4 shadow "></span>
        <div className="flex flex-col w-full px-5 ">
        <div className="w-full flex flex-col text-center overflow-hidden bg--500">
        
          <Stack  gap={10}>
          <h1 className="text-md font-semibold ">Menu</h1>
            {links}
          </Stack>
        </div>
          
        <div className="flex  w-full justify-center ">
           <ActionIcon
            onClick={() =>
              setColorScheme(colorScheme === "light" ? "dark" : "light")
            }
            variant='default'
            size='xl'
            style={{ width: rem(90), height: rem(16), borderRadius: rem(20) }}
            aria-label='Toggle color scheme'
            className='w-full rounded-full mt-10 shadow '
          >
            {colorScheme === "dark" ? (
              <IconSun stroke={0.3} />
            ) : (
              <IconMoon stroke={0.3} />
            )}
          </ActionIcon>
        </div>
         
        </div>
      </div>
    </div>
  </div>
  ) 
  )}
