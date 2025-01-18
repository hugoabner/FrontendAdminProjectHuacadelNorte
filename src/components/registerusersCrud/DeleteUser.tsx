import { ActionIcon, Modal, Button, Text, Tooltip } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { MdDeleteOutline } from "react-icons/md";
import { deleteUser } from "../../api/auth";

const DeleteUser = ({ userId, onDelete }: { userId: string; onDelete: () => void }) => {
  const [opened, { open, close }] = useDisclosure(false);

  const handleDelete = async () => {
    try {
      await deleteUser(userId); // Implementa esta API en tu backend
      onDelete(); // Llama a la función para actualizar la lista
      close(); // Cierra el modal
    } catch (error) {
      console.error("Error al eliminar usuario:", error);
      alert("Error al intentar eliminar el usuario.");
    }
  };

  return (
    <>
      <Modal opened={opened} onClose={close} centered title="Eliminar Usuario">
        <Text size="sm" mb="md">
          ¿Estás seguro de que deseas eliminar este usuario? Esta acción no se puede deshacer.
        </Text>
        <div className="flex justify-end space-x-3">
          <Button variant="default" onClick={close}>
            Cancelar
          </Button>
          <Button color="red" onClick={handleDelete}>
            Eliminar
          </Button>
        </div>
      </Modal>

      <Tooltip 
        label="Eliminar usuario"
        position="top"
        style={{ userSelect: "none" }}
        transitionProps={{ duration: 0 }}> 
          <ActionIcon size="lg" variant="filled" color="red" aria-label="Eliminar usuario" onClick={open}>
            <MdDeleteOutline size={20} />
          </ActionIcon>
      </Tooltip>
    </>
  );
};

export default DeleteUser;

