import clsx from "clsx";
import { Button, Modal, useMantineColorScheme } from "@mantine/core";
import { MdArrowForward } from "react-icons/md";
import { Link } from "react-router-dom";
import { useDisclosure } from '@mantine/hooks';
import { LoginPage } from "./LoginPage";

export const HomePage = ( ) => {
  const [opened, { open, close }] = useDisclosure(false);
  // console.log(opened);
  const { colorScheme } = useMantineColorScheme();
  const theme = colorScheme === "dark";
  
  return ( 
      <div
        className={clsx(
          "w-full h-screen px-0 md:px-4",
          theme
            ? "bg-[#1a1b1e]"
            : "bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#fff] via-blue-50 to-white"
        )}
      >
        <div className="w-full h-full flex flex-col items-center justify-center md:pt-24 gap-8 md:gap-6 px-4">
          <div className="w-full 2xl:max-w-3xl flex flex-col items-center justify-center gap-y-10 2xl:-mt-20">
            <span
              className={clsx(
                "hidden md:flex gap-1 py-1 px-3 border rounded-full text-sm md:text-base",
                theme
                  ? "border-gray-700 text-gray-400"
                  : "border-gray-300 text-gray-600"
              )}
            >
              Únete a un equipo donde cada detalle importa y cada estructura tiene alma.{" "}
              <Link
                // onClick={}
                className={clsx(
                  "flex gap-1 items-center font-semibold text-[18px]",
                  theme ? "text-white" : "text-slate-700"
                )}
                to={""}
              >
                Unirse
                <MdArrowForward />
              </Link>
            </span>
            <h1
              className={clsx(
                `text-4xl 2xl:text-6xl font-bold text-center`,
                theme ? "text-gray-400" : "text-slate-700"
              )}
            >
              Constructora y consultora Huaca del Norte S.A.C.!
            </h1>

            <span
              className={clsx(
                "text-center text-base md:text-[18px]",
                theme ? "text-gray-500" : "text-slate-600"
              )}
            >
              ¡Transformamos ideas en realidad. Diseñamos, construimos 
              y entregamos soluciones de ingeniería que aseguran calidad,
               sostenibilidad y satisfacción en cada proyecto!
            </span>

            <div className="flex gap-6 items-center mt-6">
              <Button onClick={open}>Iniciar Sesion</Button>

              <Link
                to="#"
                className={clsx(`flex gap-1 items-center font-semibold text-[16px]`, theme 
                  ? "text-gray-300" 
                  : "text-slate-700")}
              >
                Contact  
                <MdArrowForward />
              </Link>
            </div>
          </div>
        </div> 
        <Modal
          opened={opened}
          onClose={close}
          title="Inisiar Sesión"
          centered
       
        >
          <LoginPage   />
        </Modal>

      </div>
  );
};
