import { Button } from "@mantine/core"
import { PiMicrosoftExcelLogoLight } from "react-icons/pi"

const ExportProyect = () => {
  return (
	<>
		<Button color="green">
			<PiMicrosoftExcelLogoLight className='mr-2 text-xl'/>
			Export
		</Button>
	</>    )
}

export default ExportProyect