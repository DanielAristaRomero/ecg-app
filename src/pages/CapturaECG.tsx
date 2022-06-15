import { faCamera, faCirclePlay } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { v4 as uuidv4 } from "uuid";
import dayjs from "dayjs";
import { Header } from "../components/header/Header";
import guardarImagen from "../helpers/guardarImagen";
import guardarAnalisis from "../helpers/guardarAnalisis";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import async from "../helpers/cropImage";

interface Props {
  foto: string;
  stateChange: any;
}

const CapturaECG = ({ foto = "", stateChange }: Props) => {
  const key = localStorage.getItem("key-aut-ecg-app");
  let navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [mensaje, setMensaje] = useState("");

  useEffect(() => {
    setMensaje("Validando fotografía...");
    setLoading(true);

    fetch("http://localhost:8000/confirmar", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers":
          "Origin, X-Requested-With, Content-Type, Accept",
      },
      body: JSON.stringify({
        url: foto,
      }),
    })
      .then((response) => response.json())
      .then((datos) => {
        console.log(datos);
        if (datos.isValida) {
          setLoading(false);
        } else {
          Swal.fire({
            icon: "error",
            title: "Fotografía inválida",
            text: "La fotografía capturada no cuenta con las características de un ECG.",
          });
          stateChange("");
        }
      })
      .catch(() => {
        Swal.fire({
          icon: "error",
          title: "Fotografía inválida",
          text: "La fotografía capturada no cuenta con las características de un ECG.",
        });
        stateChange("");
      });
  }, [foto]);

  const iniciarAnalisis = async (fotoBase64: string) => {
    setLoading(true);
    setMensaje("Generando análisis...");
    const response: Response = await fetch(fotoBase64);
    const blob: Blob = await response.blob();
    const uuid = uuidv4();
    const file = new File([blob], uuid + ".png", { type: "image/png" });

    fetch("http://localhost:8000/analizar", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers":
          "Origin, X-Requested-With, Content-Type, Accept",
      },
      body: JSON.stringify({
        url: foto,
      }),
    })
      .then((response) => response.json())
      .then(async (datos) => {
        console.log(datos);
        if (datos.success) {
          const uriECG = await guardarImagen(file, foto, uuid);

          const uuidAnalisis = uuidv4();
          await guardarAnalisis(key!, {
            uuid: uuidAnalisis,
            fecha: dayjs().format(),
            hayPadecimientos: datos.normal,
            ptcSeguridad: datos.precision * 100,
            descripcion: datos.padecimientos[0]?.descripcion,
            uriECG,
          });
          setLoading(false);
          Swal.fire({
            title: "Análisis creado",
            icon: "info",
            html: "Este análisis no representa un diagnóstico definitivo, visite a un médico especializado para poder recibir un diagnóstico real.",
            showCloseButton: true,
            confirmButtonText: "Entendido",
            confirmButtonColor: "#08f",
          });
          navigate("/historial/detalle/" + uuidAnalisis);
        } else {
          Swal.fire({
            icon: "error",
            title: "Hubo un error al generar el análisis",
            text: "Por favor válida tu información o inténtalo más tarde.",
          });
        }
      })
      .catch(() => {
        Swal.fire({
          icon: "error",
          title: "Hubo un error al generar el análisis",
          text: "Por favor válida tu información o inténtalo más tarde.",
        });
      });
  };

  return (
    <div>
      <Header titulo="Confirmar captura" />
      <div className="relative hidden md:block top-[-150px]">
        <div className="flex justify-center absolute w-full top-3">
          <h4 className="text-white text-2xl">Confirmar captura</h4>
        </div>
      </div>

      {!loading ? (
        <div className="py-5 px-4 relative top-[-55px]">
          <div className="mt-10">
            <p className="text-center">Fotografía capturada</p>
            <div className="mt-2 flex justify-center">
              <img
                className="rounded-3xl border-2 border-black  w-11/12 md:w-2/4 lg:w-2/6"
                src={foto}
                alt="ECG"
              />
            </div>
          </div>
          <div className="flex flex-col mt-8 px-10 items-center">
            <button
              className="bg-[#08f] py-1 px-5 rounded-xl text-white md:text-xl"
              onClick={() => iniciarAnalisis(foto)}
            >
              Iniciar análisis
              <FontAwesomeIcon className="ml-2" icon={faCirclePlay} />
            </button>
            <button
              className="bg-[#08f] py-1 px-5 rounded-xl mt-3 text-white md:text-xl"
              onClick={() => stateChange("")}
            >
              Capturar de nuevo
              <FontAwesomeIcon className="ml-2" icon={faCamera} />
            </button>
          </div>
        </div>
      ) : (
        <div
          data-testid="analisis-card"
          className="flex flex-col content-center justify-center h-[70vh]"
        >
          <h2 className="self-center text-xl">{mensaje}</h2>
          <div className="pulse" data-testid="analisis-card"></div>
        </div>
      )}
    </div>
  );
};

export default CapturaECG;
