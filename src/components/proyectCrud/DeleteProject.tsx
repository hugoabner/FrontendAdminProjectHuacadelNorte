import { ActionIcon, Modal, TextInput, Tooltip } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { MdDeleteOutline } from "react-icons/md";

export const DeleteProject = () => {
 const [opened, { open, close }] = useDisclosure(false);

  return (
    <div>
    <Modal opened={opened} onClose={close} title="Registar Usuario" centered>
      <TextInput placeholder="Name" label="Name" />
      <TextInput placeholder="Description" label="Description" />
      <TextInput placeholder="Link" label="Link" />
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
  </div>  )
}
