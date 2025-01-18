import { ActionIcon,  Modal } from "@mantine/core"
import { useDisclosure } from "@mantine/hooks";
import { LiaEyeSolid } from "react-icons/lia";

const ViewUser = () => {
  const [opened, { open, close }] = useDisclosure(false);

  return (
  <>  
  <Modal opened={opened} onClose={close} centered title="Crear cuenta de Usuario">
   

  </Modal>

    <ActionIcon onClick={open}  size="lg" variant="filled" color="green" aria-label="Settings">
      <LiaEyeSolid size={20} />
    </ActionIcon>
    
  </>
    
  )
}

export default ViewUser