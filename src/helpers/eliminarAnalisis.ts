import { db } from "../firebase/firebase-config";
import { doc, deleteDoc } from "firebase/firestore";

const eliminarAnalisis = async (cveUsuario: string, cveDocumento: string) => {
  await deleteDoc(doc(db, cveUsuario, cveDocumento));
};

export default eliminarAnalisis;
