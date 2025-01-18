/* eslint-disable @typescript-eslint/no-explicit-any */
import {
	getDownloadURL,
	getStorage,
	ref,
	uploadBytesResumable,
  } from "firebase/storage";
  import { app } from "../config/firebase";
/**@getDownloadURL Funcion para obtener la URL de descarga */
/*de un archivo en firebase*/

/**@getStorage Esta función para obtener una referencia */
/* al servicio de almacenamiento de Firebase */   

/**@ref Esta función se utiliza para crear una */
/* referencia a una ubicación específica en Firebase Storage*/

/**@uploadBytesResumable  Esta función se utiliza */
/* para subir archivos a Firebase Storage de manera
/* resumible, lo que permite pausar y reanudar la subida.*/ 


  
export const uploadFile = (setFileURL: any, file: any) => { //cuando llame en otro lugar necesita dos cosas
const storage = getStorage(app);

const name = new Date().getTime() + file.name;
const storageRef = ref(storage, name);

const uploadTask = uploadBytesResumable(storageRef, file);

uploadTask.on(
"state_changed",
(snapshot) => {
	const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
	console.log("Upload is " + progress + "% done");

	switch (snapshot.state) {
	case "paused":
		console.log("estado pausado");
		break;
	case "running":
		console.log("se esta ejecutando");
		break;
	}
},
(error) => {
	console.log(error);
},
() => {
	getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
	console.log("se ha subido la imagen existosamente");
	setFileURL(downloadURL);
	});
}
);
};
  