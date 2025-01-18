
import { ActionIcon, Button, Modal, Select, TextInput, Tooltip } from "@mantine/core"
import { useDisclosure } from "@mantine/hooks";
import { useEffect, useState } from "react";
import { updateUser } from "../../api/auth";
import { CiEdit } from "react-icons/ci";

interface Role {
  _id: string;
  name: string;
}
interface UpdateUserProps {
  userId: string;
  username: string;
  email: string;
  roles:  Role[]; // Puede ser string o array según tu implementación
  onUpdate: (updatedUser: {
    _id: string; userId: string; username: string; email: string; roles: Role[];}) => void;
}
const UpdateUser =  ({ userId, username, email, roles, onUpdate }: UpdateUserProps) => {

  const [opened, { open, close }] = useDisclosure(false);

  const availableRoles = [
    { _id: '1', name: 'admin' },
    { _id: '2', name: 'user' },
    { _id: '3', name: 'moderator' },
  ];

  const [formData, setFormData] = useState({
    username,
    email,
    roles: roles || [], // Inicializa con los roles actuales o un array vacío
  });

  //para renderizar los datos en el modal de updateUser
  useEffect(() => {
    setFormData({ username, email, roles });
  }, [username, email, roles]);

  //actualiza los campos de formulario
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleRoleChange = (e: React.ChangeEvent<HTMLSelectElement> | { target: { value: string | null } }) => {
    const selectedRoleName = e.target.value;
    const selectedRole = availableRoles.find((role) => role.name === selectedRoleName);
    if (selectedRole) {
      setFormData((prev) => ({
        ...prev,
        roles: [selectedRole], // Actualiza con el nuevo rol seleccionado
      }));
    }
  };

  const handleSubmit = async () => {
    const rolesNames = formData.roles.map(role => role.name); // Extrae solo los nombres de los roles
    const formDataUser = {
      ...formData,
      roles: rolesNames, // Enviar solo los nombres de los roles
    };
    try {
      const response = await updateUser(formDataUser, userId); // Cambia la URL según tu API
      onUpdate(response.data); // Actualiza el usuario en el estado global/local
      close();

    } catch (error) {
      alert("No se pudo actualizar el usuario. Inténtalo nuevamente.");
    }
  };
  
  return (
    <div>
      <Modal opened={opened} onClose={close} centered title="Editar cuenta de usuario">
        <div className="flex flex-col space-y-4">
          <TextInput
            name="username"
            value={formData.username}
            onChange={handleChange}
            placeholder="Nombre de usuario"
            type="text"
            required
          />
          <TextInput
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="email@gmail.com"
            type="email"
            required
          />
          <Select
            label="Selecciona un rol"
            placeholder="Selecciona un rol"
            required
            data={availableRoles.map((role) => ({
              value: role.name,
              label: role.name,
            }))}
            value={formData.roles[0]?.name || ''}
            onChange={(value) => {
              const selected = availableRoles.find((role) => role.name === value);
              handleRoleChange({ target: { value } }); // Llamada a tu función handleRoleChange
              if (selected) {
                setFormData((prev) => ({
                  ...prev,
                  roles: [selected], // Actualiza con el nuevo rol seleccionado
                }));
              }
            }}
            classNames={{
              input: 'w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm',
              dropdown: 'rounded-md border border-gray-300 shadow-lg',
            }}
           
          />
        </div>
        <div className="flex justify-end space-x-3 py-4">
          <Button variant="default" onClick={close} color='red'>Cancelar</Button>
          <Button onClick={handleSubmit} >Actualizar</Button>
        </div>
      </Modal>

     <Tooltip 
        label="Editar usuario"
        position="top"
        style={{ userSelect: "none" }}
        transitionProps={{ duration: 0 }}> 
        <ActionIcon size="lg" variant="filled" color="yellow" aria-label="Eliminar usuario" onClick={open}>
          <CiEdit size={24} />
        </ActionIcon>
      </Tooltip>
    </div>
  )
}

export default UpdateUser
