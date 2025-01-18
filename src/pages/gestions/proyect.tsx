import clsx from "clsx";
import { AddProyect } from "../../components/proyectCrud";
import { ButtonProgress } from "../../components/ButtonProgress";
import { useEffect, useState } from 'react';
import { IconChevronDown, IconChevronUp, IconSearch, IconSelector } from '@tabler/icons-react';
import {
  useMantineColorScheme,
  Center,
  Group,
  keys,
  ScrollArea,
  Table,
  Text,
  TextInput,
  UnstyledButton,
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

interface ThProps {
  children: React.ReactNode;
  reversed: boolean;
  sorted: boolean;
  onSort: () => void;
}

/**@Funcion Que se encarga de renderizar los encabezados de la tabla **/
/**@reversed => indica el orden de la tabla*/
/**@sorted => determina si la columna esta ordenada*/
/**@onsort => funcion que se ejecuta al hacer click en el encabezado*/
function Th({ children, reversed, sorted, onSort }: Readonly <ThProps>) {
  let Icon;
  if (sorted) {
    Icon = reversed ? IconChevronUp : IconChevronDown;
  } else {
    Icon = IconSelector;
  }
  return (
    <Table.Th className="">
      <UnstyledButton onClick={onSort} className="">
        <Group justify="space-between">
          <Text fw={500} fz="sm">
            {children}
          </Text>
          <Center className="">
            <Icon size={16} stroke={1.5} />
          </Center>
        </Group>
      </UnstyledButton>
    </Table.Th>
  );
}

//funcion para filtrar los datos 
function filterData(projects: RowData[], search: string) {
  const query = search.toLowerCase().trim();
  return projects.filter((item) =>
    keys(projects[0]).some((key) => (item[key] ?? '').toLowerCase().includes(query))
  );
}
function sortData(
  data: RowData[],
  payload: { sortBy: keyof RowData | null; reversed: boolean; search: string }
) {
const { sortBy } = payload;
if (!sortBy) {
  return filterData(data, payload.search);
}
return filterData(
  [...data].sort((a, b) => {
    if (payload.reversed) {
      return (b[sortBy] ?? '').localeCompare(a[sortBy] ?? '');
    }
    return (a[sortBy] ?? '').localeCompare(b[sortBy] ?? '');
  }),
  payload.search
);
}
export const Gestionproyect = () => {

  const [loading, setLoading] = useState(false);
  const [projects, setProjects] = useState<RowData[]>([]); 
  const location = useLocation();// Obtiene la ubicación actual

  const { colorScheme } = useMantineColorScheme();
  const theme = colorScheme === "dark";
  const [search, setSearch] = useState('');
  const [, setSortedData] = useState(projects);
  const [sortBy, setSortBy] = useState<keyof RowData | null>(null);
  const [reverseSortDirection, setReverseSortDirection] = useState(false);

  //funcion para obtener y renderizar todos los proyectos
  useEffect(() => {
    async function FeatchData() {
      try {
        close();
        setLoading(true);
        const { data } = await getProject();
        console.log(data);
        setProjects(data);
        const timer = setTimeout(() => {
          setLoading(false);
        }, 700);
        return () => clearTimeout(timer);
      } catch (error) {
        console.log("Error al obtener los datos", error);
      }
    }
    FeatchData();
  }, [location]);

  const setSorting = (field: keyof RowData) => {
    const reversed = field === sortBy ? !reverseSortDirection : false;
    setReverseSortDirection(reversed);
    setSortBy(field);
    setSortedData(sortData(projects, { sortBy: field, reversed, search  }));
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.currentTarget;
    setSearch(value);
    setSortedData(sortData(projects, { sortBy, reversed: reverseSortDirection, search: value }));
  };

  // const rows = projects.map((element) => (
  //   <Table.Tr key={element._id}>
  //     <Table.Td>{element._id}</Table.Td>
  //     <Table.Td>{element.name}</Table.Td>
  //     <Table.Td>{element.description}</Table.Td>
  //     <Table.Td>{element.category}</Table.Td>
  //     <Table.Td>{element.imgURL}</Table.Td>
  //     <Table.Td>{element.state}</Table.Td>
  //     <Table.Td>{element.createdAt}</Table.Td>
  //     <Table.Td>{element.updatedAt}</Table.Td>
  //     <Table.Td style={{ color: element.state === 'completado' ? 'green' : 'red'}}>{element.state}</Table.Td>
  //   </Table.Tr>
  // ));

  return (
    <div className={clsx( "text-3xl h-full p-5 ", theme 
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
            <ButtonProgress />
             <AddProyect />
          </div>
        </div>
    
        {/* tabla de Proyectos */}
        <div className="text-3xl w-full h-screen mt-5 ">
        <div className={clsx ("", 
          theme 
          ? "text-3xl w-full p-4 bg-[#393b41] " 
          : "w-full text-3xl  p-4 border-gray-300 border-[1px] bg-[#f1f1f1]")}>
          <div className={clsx ( "text-3xl felx items-center justify-end w-full p-4 ", 
          theme   
            ? "text-white bg-[#1a1b1e] " 
            : "text-black text-3xl w-full p-4 border-gray-300 border-[1px] bg-white" )}>
              <div>
              <ScrollArea>
                <TextInput
                  placeholder="Search by any field"
                  mb="md"
                  leftSection={<IconSearch size={16} stroke={1.5} />}
                  value={search}
                  onChange={handleSearchChange}
                />
                <Table striped withTableBorder withColumnBorders horizontalSpacing="md" verticalSpacing="xs" miw={700} layout="fixed">
                  <Table.Tbody>
                    <Table.Tr className="">
                        <Th
                          sorted={sortBy === '_id'}
                          reversed={reverseSortDirection}
                          onSort={() => setSorting('_id')}
                        >
                          Id
                        </Th>
                        <Th
                          sorted={sortBy === 'name'}
                          reversed={reverseSortDirection}
                          onSort={() => setSorting('name')}
                        >
                          Nombre
                        </Th>
                        <Th
                          sorted={sortBy === 'description'}
                          reversed={reverseSortDirection}
                          onSort={() => setSorting('description')}
                        >
                          Description
                        </Th>
                        <Th
                          sorted={sortBy === 'description'}
                          reversed={reverseSortDirection}
                          onSort={() => setSorting('description')}
                        >
                          Categoria
                        </Th>
                        <Th
                          sorted={sortBy === 'category'}
                          reversed={reverseSortDirection}
                          onSort={() => setSorting('category')}
                        >
                          Imagen
                        </Th>
                        <Th
                          sorted={sortBy === 'imgURL'}
                          reversed={reverseSortDirection}
                          onSort={() => setSorting('imgURL')}
                        >
                          Estado
                        </Th>
                        <Th
                          sorted={sortBy === 'state'}
                          reversed={reverseSortDirection}
                          onSort={() => setSorting('state')}
                        >
                          Fecha de creacion
                        </Th>
                        <Th
                          sorted={sortBy === 'createdAt'}
                          reversed={reverseSortDirection}
                          onSort={() => setSorting('createdAt')}
                        >
                          Fecha de actualizacion
                        </Th>
                        <Th
                          sorted={sortBy === 'updatedAt'}
                          reversed={reverseSortDirection}
                          onSort={() => setSorting('updatedAt')} 
                        >
                          Acciones
                        </Th>  
                    </Table.Tr>
                  </Table.Tbody>
                  <Table.Tbody>
                    {/* {rows.length > 0 ? (
                      rows
                    ) : (
                      <Table.Tr>
                        <Table.Td colSpan={Object.keys(projects[0]).length}>
                          <Text fw={500} ta="center">
                            Nothing found
                          </Text>
                        </Table.Td>
                      </Table.Tr>
                    )} */}
                  </Table.Tbody>
                </Table>
              </ScrollArea>
              </div>
          </div>
        </div>
        </div>
        <Loading visible={loading}  />
      </div>
  )
}