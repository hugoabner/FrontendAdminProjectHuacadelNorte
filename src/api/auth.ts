/* eslint-disable @typescript-eslint/no-explicit-any */

import {axiosInstance} from "../config/axios";

/**@Funcion para Iniciar Sesion */
export const loginRequest = async (email: string, password: string) => {
	const { data } = await axiosInstance.post('/auth/signIn', { email, password });
	console.log(data);
	return data
}

/**@Funcion para Registrar un Usuario */
export const registerUser = async (userData: any) => {
    try {
        // Obtener el valor del localStorage
        const storedData = localStorage.getItem("user");
        if (!storedData) {
            throw new Error("Objeto no encontrado en el localStorage.");
        }
        // Parsear el objeto JSON si el valor no es null
        const parsedData = JSON.parse(storedData);
		//si el valor es null, lanzamos un error
        if (!parsedData.token) {
            throw new Error("Token no encontrado. Inicia sesión primero.");
        }
        // Extraer el token del objeto
        const token = parsedData.token;
        // Realizar la solicitud POST con el token en los headers
        const response = await axiosInstance.post('/auth/signUp', userData, {
            headers: {
                "x-access-token": token // aqui enviamos solo el token en el header para que reciba en el backend
            }
        });
        setTimeout(() => {
            window.location.replace("/registerUsers");
        }, 1000);
        return response;
        
    } catch (error) {
        console.error("Error registrando usuario:", error);
        throw error; // Manejar el error en el cliente
    }
};

/**@Funcion para obtener todos los usuarios */ 
export const getUsers = async ()=> {
    try {
         // Obtener el valor del localStorage
         const storedData = localStorage.getItem("user");
         if (!storedData) {
             throw new Error("Objeto no encontrado en el localStorage.");
         }
         // Parsear el objeto JSON si el valor no es null
         const parsedData = JSON.parse(storedData);
         //si el valor es null, lanzamos un error
         if (!parsedData.token) {
             throw new Error("Token no encontrado. Inicia sesión primero.");
         }
         // Extraer el token del objeto
         const token = parsedData.token;

         const response = await axiosInstance.get('/auth/userRegisters' , {
             headers: {
                 "x-access-token": token // aqui enviamos solo el token en el header para que reciba en el backend
             }
         })
         return response   
    } catch (error) {
        console.error("Error registrando usuario:", error);
        throw error;
    }
}

/**@Funcion para actualizar un usuario */
export const updateUser = async (formDataUser: any, userId: string) => {
    try {
        // Obtener el valor del localStorage
        const storedData = localStorage.getItem("user");
        if (!storedData) {
            throw new Error("Objeto no encontrado en el localStorage.");
        }
        // Parsear el objeto JSON si el valor no es null
        const parsedData = JSON.parse(storedData);
        //si el valor es null, lanzamos un error
        if (!parsedData.token) {
            throw new Error("Token no encontrado. Inicia sesión primero.");
        }
        // Extraer el token del objeto
        const token = parsedData.token;
        // Realizar la solicitud POST con el token en los headers
        const response = await axiosInstance.put(`/auth/updateUser/${userId}`, formDataUser, {
            headers: {
                "x-access-token": token // aqui enviamos solo el token en el header para que reciba en el backend
            }
        });
        setTimeout(() => {
            window.location.replace("/registerUsers");
        }, 1000);
        return response;
    } catch (error) {
        console.error("Error registrando usuario:", error);
        throw error; // Manejar el error en el cliente
    }
};

/**@Funcion para eliminar un usuario  */
export const deleteUser = async (id: string) => {
    try {
        // Obtener el valor del localStorage
        const storedData = localStorage.getItem("user");
        if (!storedData) {
            throw new Error("Objeto no encontrado en el localStorage.");
        }
        // Parsear el objeto JSON si el valor no es null
        const parsedData = JSON.parse(storedData);
        //si el valor es null, lanzamos un error
        if (!parsedData.token) {
            throw new Error("Token no encontrado. Inicia sesión primero.");
        }
        // Extraer el token del objeto
        const token = parsedData.token;
        // Realizar la solicitud POST con el token en los headers
        const response = await axiosInstance.delete(`/auth/deleteUser/${id}`, {
            headers: {
                "x-access-token": token // aqui enviamos solo el token en el header para que reciba en el backend
            }
        });
        return response;
    } catch (error) {
        console.error("Error registrando usuario:", error);
        throw error; // Manejar el error en el cliente
    }
};

/**@Funcion para crear un proyecto */ 
export const createProject = async (projectData: any) => {
    try {
        // Obtener el valor del localStorage
        const storedData = localStorage.getItem("user");
        if (!storedData) {
            throw new Error("Objeto no encontrado en el localStorage.");
        }
        // Parsear el objeto JSON si el valor no es null
        const parsedData = JSON.parse(storedData);
		//si el valor es null, lanzamos un error
        if (!parsedData.token) {
            throw new Error("Token no encontrado. Inicia sesión primero.");
        }
        // Extraer el token del objeto
        const token = parsedData.token;

        const response = await axiosInstance.post("/proyect/createProject", projectData, {
            headers: {
                "x-access-token": token // aqui enviamos solo el token en el header para que reciba en el backend
            }
        })
        setTimeout(() => {
            window.location.replace("/registerUsers");
        }, 1000);
        return response
    } catch (error) {
        console.log("Error en la funcion de crearProject:", error);  
        throw error      
    }
}

/**@Funcion para actualizar un proyecto */ 
export const updateProject = async (formdata: any, userId: string) => {
    try {
        const storedData = localStorage.getItem("user");
        if (!storedData) {
            throw new Error("Objeto no encontrado en el localStorage.");
        }
        // Parsear el objeto JSON si el valor no es null
        const parsedData = JSON.parse(storedData);
		//si el valor es null, lanzamos un error
        if (!parsedData.token) {
            throw new Error("Token no encontrado. Inicia sesión primero.");
        }
        // Extraer el token del objeto
        const token = parsedData.token;
        const response = await axiosInstance.put(`/proyect/${userId}`, formdata, {
            headers: {
                "x-access-token": token
            }
        })
        setTimeout(() => {
            window.location.replace("/registerUsers");
        }, 1000);
        return response
    } catch (error) {
        console.log("Error en la funcion UpdateProject", error);
        throw error
    }

}

/**@Funcion para eliminar un proyecto */ 
export const deleteProject = async (id: string) => {
    try {
        const storedData = localStorage.getItem("user");
        if (!storedData) {
            throw new Error("Objeto no encontrado en el localStorage.");
        }
        // Parsear el objeto JSON si el valor no es null
        const parsedData = JSON.parse(storedData);
		//si el valor es null, lanzamos un error
        if (!parsedData.token) {
            throw new Error("Token no encontrado. Inicia sesión primero.");
        }
        // Extraer el token del objeto
        const token = parsedData.token;
        const response = await axiosInstance.delete(`/proyect/${id}`, {
            headers: {
                "x-access-token": token
            }
        })
        return response
        
    } catch (error) {
        console.log(error);
        throw error                 
    }
}

/**@Funcion para obtener todos los proyectos */
export const getProject = async () => {
    try {
        const storedData = localStorage.getItem("user");
        if (!storedData) {
            throw new Error("Objeto no encontrado en el localStorage.");
        }
        // Parsear el objeto JSON si el valor no es null
        const parsedData = JSON.parse(storedData);
		//si el valor es null, lanzamos un error
        if (!parsedData.token) {
            throw new Error("Token no encontrado. Inicia sesión primero.");
        }
        // Extraer el token del objeto
        const token = parsedData.token;
        const response = await axiosInstance.get("/proyect/getProject", {
            headers: {
                "x-access-token": token
            }
        })
        return response
    } catch (error) {
        console.log("Error en la funcion de getProject:", error);
        throw error
    }

} 
