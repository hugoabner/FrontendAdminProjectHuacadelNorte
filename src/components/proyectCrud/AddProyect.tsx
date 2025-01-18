import { Button, Modal, TextInput } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IoMdAdd } from "react-icons/io";

export const AddProyect = () => {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <div>
    <Modal opened={opened} onClose={close} title="Registar Usuario" centered>
      <TextInput placeholder="Name" label="Name" />
      <TextInput placeholder="Description" label="Description" />
      <TextInput placeholder="Link" label="Link" />
    </Modal>
      
    <Button className="flex" onClick={open}>          
      <IoMdAdd className='mr-2 text-2xl'/>
      Crear Project
    </Button>
  </div>
  )
}
