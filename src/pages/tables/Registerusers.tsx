import {Table, Pagination , useMantineColorScheme, Checkbox } from "@mantine/core";
import clsx from "clsx";
import { AddUser, DeleteUser, ExportUser, UpdateUser} from "../../components/registerusersCrud";
import { getUsers } from "../../api/auth"; 
import { useEffect, useState } from "react";
import Loading from "../../components/Loading";
import { useLocation } from "react-router-dom";

interface Role {
  _id: string;
  name: string;
}
interface User {
    _id: string;
    username: string;
    email: string;
    roles:  Role[]; // Asumiendo que roles es un array de strings
    imgURL?: string; // imgURL es opcional
    createdAt: string;
    updatedAt: string;
}
function chunk<T>(array: T[], size: number): T[][] {
  if (!array.length) return [];
  const head = array.slice(0, size);
  const tail = array.slice(size);
  return [head, ...chunk(tail, size)];
}
export const Registerusers = () => {

  const [loading, setLoading] = useState(false);
  const location = useLocation();// Obtiene la ubicación actual
  const { colorScheme } = useMantineColorScheme();
  const theme = colorScheme === "dark";
  const [users, setUsers] = useState<User[]>([]); 
  //pagination
  const [activePage, setActivePage] = useState(1); // Página activa
  const pageSize = 4; // Tamaño de cada página

  const handleUserDelete = (userId: string) => {
    setUsers((prevUsers) => prevUsers.filter((user) => user._id !== userId));
  };

  const getRoleNames = (roles: Role[]): string => {
    return roles.map((role) => role.name).join(", "); // Extrae los nombres y los une en una cadena
  };

  const handleUserAdd = async (newUser: User) => {
    console.log("Nuevo usuario agregado:", newUser); // Verifica los datos antes de agregarlos
    try {
      setUsers((prevUsers) => [...prevUsers, newUser]); // Añadir el nuevo usuario al estado
    } catch (error) {
      console.error("Error al actualizar la lista de usuarios:", error);
    }
  };
  
  const handleUserUpdate = async (updatedUser: { 
    _id: string; 
    userId: string; 
    username: string; 
    email: string; 
    roles: Role[]; }) => {
    console.log("Usuario actualizado:", updatedUser); // Verifica los datos antes de actualizarlos
  }
  
  useEffect(() => {
    async function FeatchData() {
      try {
        close();
        setLoading(true);
        const { data } = await getUsers();
        setUsers(data); 
        const timer = setTimeout(() => {
          setLoading(false);
        } , 700);
        return () => clearTimeout(timer); 
      } catch (error) {
        console.error("Error al obtener los datos:", error);
      }
    }
    FeatchData();
    }, [location]); 

    const paginatedUsers = chunk(users, pageSize);

    const rows = paginatedUsers[activePage - 1]?.map((element, index) => (
      
      <Table.Tr key={element._id}>
        <Table.Td>
          <Checkbox  onChange={() => {}} />
        </Table.Td>
        <Table.Td className="text-center" >{index + 1}</Table.Td>
        <Table.Td>{element.username}</Table.Td>
        <Table.Td>{element.email}</Table.Td>
        <Table.Td>{getRoleNames(element.roles)}</Table.Td>
        <Table.Td>{element.createdAt}</Table.Td>
        <Table.Td>{element.updatedAt}</Table.Td>
        <Table.Td>
          <div className="w-28 h-full flex items-center justify-center">
            <img
              className="w-12 h-12 rounded-full object-cover"
              src={
                element.imgURL
                ? element.imgURL
                : "https://definicion.de/wp-content/uploads/2019/07/perfil-de-usuario.png"
              }
              alt="User"
            />
          </div>
        </Table.Td>
    
        <Table.Td>
          <div className="space-x-3 flex justify-center">
            <DeleteUser 
              userId={element._id} 
              onDelete={() => handleUserDelete(element._id)} 
            />
            <UpdateUser
              userId={element._id}
              username={element.username}
              email={element.email}
              roles={element.roles}
              onUpdate={(updatedUser: { _id: string; userId: string; username: string; email: string; roles: Role[]; }) => handleUserUpdate(updatedUser)}
            />
          </div>
        </Table.Td>
      </Table.Tr>
    ));
      const handleDownload = () => {
          const data = {
              "customer": {
                  "userId": "20250117110345",
                  "personalInformation": {
                      "name": "Angel Andres ",
                      "lastName": "Tapia Hevia",
                      "secondLastName": "",
                      "age": 0,
                      "civilStatus": "",
                      "profession": ""
                  },
                  "identificationDocument": {
                      "documentType": "RUT",
                      "documentNumber": 17444061,
                      "verificationNumber": "1"
                  }
              },
              "datosDeCompra": {
                  "proyecto": {
                      "id": "5703421868900352",
                      "nombre": "Proyecto Green Concept"
                  },
                  "fechaPromesa": "2025-01-06",
                  "montoCompra": "3173.19",
                  "divisa": "UF",
                  "depto": {
                      "nroDepto": "302"
                  },
                  "estacionamiento": {
                      "nroEstacionamiento": null
                  },
                  "bodega": {
                      "nroBodega": "52"
                  }
              },
              "formaDePago": {
                  "divisa": "UF",
                  "pieEnCuotas": "203.05",
                  "contraPromesa": "27.33",
                  "cuoton": "95.83",
                  "cuotasPostEntrega": 0,
                  "aporteBoreal": "308.43",
                  "promocion": 0,
                  "creditoHipotecario": "2538.55"
              },
              "fechaDeRegistro": "2025-01-17T09:10:11-05:00",
              "fechaDeActualizacion": "2025-01-17T09:10:11-05:00",
              "timestamp": 1737123011324,
              "mandate": {
                  "internalId": 231,
                  "id": "20250117111221"
              },
              "venta": {
                  "id": "5723572647493632"
              }
          }
          fetch('http://localhost:5000/proyect/generate/pdf', {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json'
              },
              body: JSON.stringify(data)
          })
          .then(response => response.blob())
          .then(blob => {
              const url = window.URL.createObjectURL(blob);
              const a = document.createElement('a');
              a.style.display = 'none';
              a.href = url;
              a.download = 'archivo.pdf';
              document.body.appendChild(a);
              a.click();
              window.URL.revokeObjectURL(url);
          })
          .catch(error => console.error('Error:', error));
      };
  return (
	<div className={clsx( "text-3xl h-full p-5 ", theme 
  ? "bg-[#1a1b1e]" 
  : "text-black bg-[#f1f1f1]")}>
    {/* botones y modales  */}
    <div className={clsx ("", 
      theme 
      ? "text-3xl w-full p-4 bg-[#393b41] " 
      : "text-3xl w-full p-4 border-gray-300 border-[1px] bg-[#f1f1f1]")}>
      <div className={clsx ( "text-3xl space-x-6 flex  items-center p-2 justify-end w-full ", 
      theme   
        ? "text-white bg-[#1a1b1e] " 
        : "text-black text-3xl w-full p-2 border-gray-300 border-[1px] bg-white" )}>
        <ExportUser />
        <AddUser onAdd={handleUserAdd} /> 
        <button 
          onClick={handleDownload}
          className="bg-[#FF7A00] text-white rounded-md 
          hover:bg-[#FF7A00] hover:text-white text-sm px-2 py-2">
            Importar
        </button>
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
        <Table.ScrollContainer minWidth={500}>
        <Table withTableBorder withColumnBorders highlightOnHover>
          <Table.Thead>
            <Table.Tr>
              <Table.Th></Table.Th>
              <Table.Th>Id</Table.Th>
              <Table.Th>Nombre de usuario</Table.Th>
              <Table.Th>Email</Table.Th>
              <Table.Th>Rol</Table.Th>
              <Table.Th>Fecha de creacion</Table.Th>
              <Table.Th>Fecha de actualizacion</Table.Th>
              <Table.Th>Foto de perfil</Table.Th>
              <Table.Th>Acciones</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>{rows}</Table.Tbody>
        </Table>
      </Table.ScrollContainer>
      <div className="w-full flex items-center justify-end">
        <Pagination
        total={paginatedUsers.length}
        value={activePage}
        onChange={setActivePage}
        mt="sm"
      />
      </div>
      </div>
    </div>
    </div>
    <Loading visible={loading}  />
  </div>
  ) 
}



  