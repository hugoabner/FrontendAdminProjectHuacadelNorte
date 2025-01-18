import { Button, Drawer, Group, useDrawersStack, useMantineColorScheme } from "@mantine/core";
import clsx from "clsx";
import { IoIosNotificationsOutline } from "react-icons/io";

const Notification = () => {
	const stack = useDrawersStack(['delete-page', 'confirm-action', 'really-confirm-action']);
	const theme = useMantineColorScheme().colorScheme === 'dark';
	return (
	<>
	<Drawer.Stack >
		<Drawer position="right" size={'xs'}  {...stack.register('delete-page')} title="NOTIFICATION" padding="md" tabIndex={-1}>
			Are you sure you want to delete this page? This action cannot be undone.
		<Group mt="lg" justify="flex-end">
			<Button onClick={stack.closeAll} variant="default">
			Cancel
			</Button>

			<Button onClick={() => stack.open('confirm-action')} color="red">
			Delete
			</Button>
		</Group>
		</Drawer>
	</Drawer.Stack>
  
	{/* <Notification /> */}
	<div  className="flex items-center" onClick={() => stack.open('delete-page')}>
        <div  className={clsx( "border-[1px] border-gray-300 shadow-sm  rounded-full p-3" , theme 
              ? "bg-[#1a1b1e]" 
              : "bg-white")}>
              <IoIosNotificationsOutline  className="text-[25px]"/>
        </div>
    </div>
	</>
	);
}

export default Notification