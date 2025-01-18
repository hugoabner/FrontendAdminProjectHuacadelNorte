/* eslint-disable @typescript-eslint/no-explicit-any */
// import { create } from 'zustand';
// import { persist } from 'zustand/middleware';

// type State = {
//   token: string;
//   profile: any;
//   isAuthenticated: boolean; 
// };

// type Actions = {
//   // Función para actualizar el token
//   setToken: (token: string) => void;
//   // Función para actualizar el perfil
//   setProfile: (profile: any) => void;
//   // Función para cerrar sesión
//   logout: () => void;
// };

// export const useAuthStore = create(
//   persist<State & Actions>(
//     (set) => ({
//       token: '',
//       profile: null,
//       isAuthenticated: false, // Inicialmente, el usuario no ha iniciado sesión

//       // Función para actualizar el token
//     setToken: (token: string) =>
//         set((state) => ({
//           ...state, // Mantener el estado actual
//           token,
//           isAuthenticated: true, // Cambiar el estado de autenticación a true si el token es válido
//         })),

//       // Función para actualizar el perfil
//     setProfile: (profile: any) =>
//         set((state) => ({
//         ...state, // Mantener el estado actual
//         profile,
//     })),

//       // Función para cerrar sesión
//     logout: () =>
//       set(() => ({
//          token: '',
//         isAuthenticated: false,
//         profile: null,
//       })),

//     }),
//     { name: 'auth' }
//   )
// );
import { create } from 'zustand';

interface User {
  user: any; // Interfaz para el usuario (puedes especificar mejor el tipo si lo sabes)
  signInModal: boolean; // Estado del modal de inicio de sesión
  signIn: (result: any) => void; // Función para iniciar sesión
  signOut: () => void; // Función para cerrar sesión
  setSignInModal: (val: boolean) => void; // Función para mostrar/ocultar el modal de inicio de sesión
}

export const useStore = create<User>((set) => ({
  // Inicializar el estado del usuario desde localStorage
  user: JSON.parse(localStorage.getItem('user') || 'null'), 
  signInModal: false, // Estado inicial del modal de inicio de sesión
  
  // Función para iniciar sesión
  signIn: (result: any) => {
    localStorage.setItem('user', JSON.stringify(result)); // Guardar el usuario en localStorage
    set({ user: result });
  },

  // Función para cerrar sesión
  signOut: () => {
    localStorage.removeItem('user'); // Eliminar el usuario de localStorage
    set({ user: null });
  },

  // Función para mostrar/ocultar el modal de inicio de sesión
  setSignInModal: (val: boolean) => {
    set({ signInModal: val });
  },
}));
