import { Button, Modal, useMantineColorScheme } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import clsx from "clsx";

export const Gestionservicio = () => {
  const { colorScheme } = useMantineColorScheme();
  const theme = colorScheme === "dark";
  const [opened, { open, close }] = useDisclosure(false);


  return (
<div className={clsx( "text-3xl h-screen p-5 ", theme 
  ? "bg-[#1a1b1e]" 
  : "text-black bg-[#f1f1f1]")}>

    {/* botones y modales  */}
    <div className={clsx ("", 
      theme 
      ? "text-3xl w-full p-4 bg-[#393b41] " 
      : "text-3xl w-full p-4text-3xl  p-4 border-gray-300 border-[1px] bg-[#f1f1f1]")}>
      <div className={clsx ( "text-3xl space-x-6 flex  items-center justify-end w-full p-4 ", 
      theme   
        ? "text-white bg-[#1a1b1e] " 
        : "text-black text-3xl w-full p-4 border-gray-300 border-[1px] bg-white" )}>
        <Button className="flex" onClick={open}>Crear Usuario</Button>
        <Modal opened={opened} onClose={close} title="Registar Usuario" centered>
          
        </Modal>
        <Button className="flex" onClick={open}>Crear Usuario</Button>
        <Modal opened={opened} onClose={close} title="Registar Usuario" centered>
          
        </Modal>
      </div>
    </div>

    {/* tabla de usuarios */}
    <div className="text-3xl w-full h-screen mt-5 ">
    <div className={clsx ("", 
      theme 
      ? "text-3xl w-full p-4 bg-[#393b41] " 
      : "w-full text-3xl  p-4 border-gray-300 border-[1px] bg-[#f1f1f1]")}>
      <div className={clsx ( "text-3xl felx items-center justify-end w-full p-4 ", 
      theme   
        ? "text-white bg-[#1a1b1e] " 
        : "text-black text-3xl w-full p-4 border-gray-300 border-[1px] bg-white" )}>
        Registro de Servicios de la empresa
      </div>
    </div>
    </div>
  </div>
  )
}
