import { Button } from "@mantine/core"
import { PiMicrosoftExcelLogoLight } from "react-icons/pi";


const ExportUser = () => {
  return (
	<>
		<Button color="green">
			<PiMicrosoftExcelLogoLight className='mr-2 text-2xl'/>
			Export
		</Button>
	</>  
	)
}

export default ExportUser
