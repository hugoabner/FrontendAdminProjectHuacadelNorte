import { useMantineColorScheme } from "@mantine/core";
import clsx from "clsx"
import { StatesCards } from "./stats";
import { Toaster } from "sonner";

export const DashboardPage = () => {

  const { colorScheme } = useMantineColorScheme();
  const theme = colorScheme === "dark";

  return (
	<div className={clsx( "text-3xl h-screen p-5", theme 
  ? "bg-[#1a1b1e]" 
  : "text-black bg-[#f1f1f1]")}>

    <div className={clsx("", theme 
      ? "text-3xl w-full p-4 bg-[#393b41] " 
      : "text-3xl w-full p-4 border-gray-300 border-[1px] bg-[#f1f1f1]",)}>
      <StatesCards />
    </div>

    {/* Graficos de estadisticas */}
    <div className="text-3xl w-full h-screen mt-5 ">
      <div className={clsx ("", 
        theme 
          ? "text-3xl w-full p-4 bg-[#393b41] " 
          : "w-full text-3xl  p-4 border-gray-300 border-[1px] bg-[#f1f1f1]")}>
          <div className={clsx ( "text-3xl felx items-center justify-end w-full p-4 ", 
            theme   
              ? "text-white bg-[#1a1b1e] " 
              : "text-black text-3xl w-full p-4 border-gray-300 border-[1px] bg-white" )}>
              Aquie vendran los graficos estadisticos
          </div>
      </div>
    </div>
    <Toaster />
  </div>
  )
}
