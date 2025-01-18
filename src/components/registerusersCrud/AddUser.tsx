    /* eslint-disable @typescript-eslint/no-explicit-any */
import { useDisclosure } from '@mantine/hooks';
import { Modal, Button, Select, TextInput, FileInput, ComboboxItem } from '@mantine/core';
import { useEffect, useState } from 'react';
import { registerUser } from '../../api/auth'; 
import { uploadFile } from '../../utils/handlefirebase';
import Loading from '../Loading';
import { IoMdAdd } from "react-icons/io";


interface Role {
  _id: string;
  name: string;
}
interface User {
  _id: string;
  username: string;
  email: string;
  roles:  Role[]; // Asumiendo que roles es un array de strings
  imgURL?: string; // imgURL es opcional
  createdAt: string;
  updatedAt: string;
}
  const AddUser = ({ onAdd }: { onAdd: (user: User) => void }) => {

    const [loading, setLoading] = useState(false);
    const [opened, { open, close }] = useDisclosure(false);
    const [fileURL , setFileURL] = useState("")
    const [name, setUsername] = useState(null);
    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);
    const [value, setValue] = useState<ComboboxItem | null>(null);
    const [file, setFile] = useState(null);
    

    const handleFileChange = (file: any) => {
      setFile(file );
    };
    

    const handleRegisterUser = async (e : any) => {
      const userData = {
        username: name,
        email: email,
        password: password,
        roles: [value?.value],
        imgURL: fileURL, // Esto será un archivo, si corriges el input
      };
      e.preventDefault();
      try {
        setLoading(true);
        const response = await registerUser(userData);
        setLoading(false);
        const newUser = response.data.user;
        onAdd(newUser);
        close();
        console.log('Respuesta del servidor:', response);
      } catch (error) {
        console.error('Error en la solicitud:', error);
      }
    };

    useEffect(() => {
      if (file) {
        uploadFile(setFileURL, file);
      }
    }, [file]);

    return (
      <>
        <Modal opened={opened} onClose={close} centered title="Crear cuenta de Usuario">
            <div className='flex flex-col gap-2'>
              <TextInput 
              required
              label="Nombre de usuario"
              type="name" 
              placeholder='Nombre de usuario' 
              name='username'
              onChange={(e: any) => setUsername(e.target.value)}
              />
              <TextInput 
              required
              label="Email" 
              type="email" 
              placeholder='email@gmail.com'
              name='email'
              onChange={(e: any) => setEmail(e.target.value)}
              />
              <TextInput 
              required
              label="Password" 
              type="password" 
              placeholder='*********'
              name='password'
              onChange={(e: any) => setPassword(e.target.value)}
              />
              <Select
                data={[{ value: 'user', label: 'user' }, { value: 'admin', label: 'admin' }, { value: 'moderator', label: 'moderator' }]}
                label="Roles"
                value={value ? value.value : null}
                onChange={(_value, option) => setValue(option)}
                placeholder='Selecciona un rol'
              />
              <FileInput
                label="Imagen de perfil"
                placeholder="Image URL"
                name="imgURL"
                onChange={handleFileChange as any}
              />
              <div className='flex justify-end gap-2'> 
                <Button variant="default"  onClick={close} color='red'>Cancelar</Button>
                <Button onClick={handleRegisterUser} >Crear</Button>
                <Loading visible={loading} />
              </div> 
            </div>
        </Modal>
        <Button onClick={open}>
          <IoMdAdd className='mr-2 text-2xl'/>
          Add User
        </Button>
      </>
    );
  }

  export default AddUser