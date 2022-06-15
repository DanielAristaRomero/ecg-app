import { db } from "../firebase/firebase-config";
import { collection, getDocs } from "firebase/firestore";
import { Analisis } from "../interfaces/interfaces";

const getAnalisis = async (rutaDocumento: string): Promise<Analisis[]> => {
  const coleccion = collection(db, rutaDocumento);
  const { docs } = await getDocs(coleccion);
  const analisis = docs.map((doc) => doc.data());
  return analisis as Analisis[];
};

export default getAnalisis;
