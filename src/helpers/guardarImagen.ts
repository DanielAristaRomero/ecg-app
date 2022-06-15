import { storage } from "../firebase/firebase-config";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

const guardarImagen = async (file: File, base64: any, uuid: string) => {
  try {
    const storageRef = ref(storage, uuid + ".png");
    const snapshot = await uploadBytes(storageRef, file);
    const uriECG = await getDownloadURL(storageRef);
    return uriECG;
  } catch (error) {
    return {
      error,
      mensajeError:
        "Hubo un error al guardar la imagen. Valida tu información o intentalo más tarde.",
    };
  }
};

export default guardarImagen;
