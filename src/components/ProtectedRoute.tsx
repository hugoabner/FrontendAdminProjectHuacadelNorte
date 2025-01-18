import { Navigate, Outlet } from "react-router-dom"

interface Props {
	isAllowed: boolean,
	children?: React.ReactNode
}


export const ProtectedRoute = ({children, isAllowed}: props) => {
	//si no esta logueado no deja acceder
	if (!isAllowed) 
		return <Navigate to="/" />
	return children ? <> {children} </> : <Outlet />
	


}