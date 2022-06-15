import { db } from "../firebase/firebase-config";
import { doc, setDoc } from "firebase/firestore";

const guardarAnalisis = async (cveDatos: string, datosAnalisis: any) => {
  try {
    const response = await setDoc(
      doc(db, cveDatos, datosAnalisis.uuid),
      datosAnalisis
    );
    return response;
  } catch (error) {
    return {
      error,
      mensajeError:
        "Hubo un error al guardar el análisis. Valida tu información o intentalo más tarde.",
    };
  }
};

export default guardarAnalisis;
