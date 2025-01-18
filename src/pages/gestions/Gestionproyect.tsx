import clsx from "clsx";
import { AddProyect, DeleteProject, ExportProyect } from "../../components/proyectCrud";
import { useEffect, useState } from 'react';
import {
  useMantineColorScheme,
  Table,
  Checkbox,
  Badge,
} from '@mantine/core';
import { getProject } from "../../api/auth"; 
import { useLocation } from "react-router-dom";
import Loading from "../../components/Loading";

interface RowData {
  _id: string;
  name: string;
  description: string;
  category: string;
  imgURL?: string;
  state: string;
  createdAt: string;
  updatedAt: string;

}

export const Gestionproyect = () => {
  const [loading, setLoading] = useState(false);
  const [projects, setProjects] = useState<RowData[]>([ ]);
  const location = useLocation(); // Para detectar cambios en la ubicación.

  const { colorScheme } = useMantineColorScheme();
  const theme = colorScheme === "dark";

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const {data} = await getProject();
        const project = data.proyects 
        console.log("desde el useEfect", project);
        setProjects(project);
      } catch (error) {
        console.error("Error al obtener los datos:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [location]);

  const rows = projects.map((project, index) => (
    <Table.Tr key={project._id}>
      <Table.Td>
        <Checkbox onChange={() => {}} aria-label="Seleccionar proyecto" />
      </Table.Td>
      <Table.Td>{index + 1}</Table.Td>
      <Table.Td>{project.name}</Table.Td>
      <Table.Td>{project.category}</Table.Td>
      <Table.Td>{project.createdAt}</Table.Td>
      <Table.Td>{project.updatedAt}</Table.Td>
      <Table.Td>
        <img
          className="w-12 h-12 rounded-full object-cover"
          src={
            project.imgURL ?? 
            "https://definicion.de/wp-content/uploads/2019/07/perfil-de-usuario.png"
          }
          alt="Imagen del proyecto"
        />
      </Table.Td>
      <Table.Td>
        <Badge color={project.state === "completado" ? "green" : "red"} variant="light">
          {project.state}
        </Badge>
      </Table.Td>
      <Table.Td>
        <DeleteProject />
      </Table.Td>
    </Table.Tr>
  ));

  return (
    <div
      className={clsx(
        "text-3xl h-full p-5",
        theme ? "bg-[#1a1b1e]" : "bg-[#f1f1f1] text-black"
      )}
    >
      {/* Botones y modales */}

      <div className={clsx ("", 
      theme 
      ? "text-3xl w-full p-4 bg-[#393b41] " 
      : "text-3xl w-full p-4 border-gray-300 border-[1px] bg-[#f1f1f1]")}>
      <div className={clsx ( "text-3xl space-x-3 flex  items-center p-2 justify-end w-full ", 
        theme   
          ? "text-white bg-[#1a1b1e] " 
          : "text-black text-3xl w-full p-2 border-gray-300 border-[1px] bg-white" )}>
           <ExportProyect />
           <AddProyect />
          
        </div>
      </div>

      

      {/* Tabla de Proyectos */}
      <div className="text-3xl w-full mt-5">
        <div className={clsx(
            "text-3xl w-full p-4",
            theme 
            ? "bg-[#393b41]" 
            : "bg-[#f1f1f1] border border-gray-300"
          )}
        >
        <div className={clsx ( "text-3xl felx items-center justify-end w-full p-4 ", 
        theme   
          ? "text-white bg-[#1a1b1e] " 
          : "text-black text-3xl w-full p-4 border-gray-300 border-[1px] bg-white" )}>
          <Table.ScrollContainer minWidth={500}>
            <Table withTableBorder withColumnBorders highlightOnHover>
              <Table.Thead>
                <Table.Tr>
                  <Table.Th></Table.Th>
                  <Table.Th>ID</Table.Th>
                  <Table.Th>Nombre</Table.Th>
                  <Table.Th>Categoría</Table.Th>
                  <Table.Th>Fecha de Creación</Table.Th>
                  <Table.Th>Fecha de Actualización</Table.Th>
                  <Table.Th>Imagen</Table.Th>
                  <Table.Th>Estado</Table.Th>
                  <Table.Th>Acciones</Table.Th>
                </Table.Tr>
              </Table.Thead>
              <Table.Tbody>{rows}</Table.Tbody>
            </Table>
          </Table.ScrollContainer>
          </div>
        </div>
      </div>

      {/* Carga */}
      <Loading visible={loading} />
    </div>
  );
};
