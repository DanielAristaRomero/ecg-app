import { db } from "../firebase/firebase-config";
import { doc, getDoc } from "firebase/firestore";
import { DetalleAnalisis } from "../interfaces/interfaces";

const getDetalleAnalisis = async (
  rutaDocumento: string,
  idAnalisis: string
) => {
  try {
    const refereciaDocumento = doc(db, rutaDocumento, idAnalisis);
    const analisis = await getDoc(refereciaDocumento);

    if (analisis.exists()) {
      return analisis.data() as DetalleAnalisis;
    }
  } catch (error) {
    throw new Error("No se pudo acceder a los datos del análisis");
  }
};

export default getDetalleAnalisis;
