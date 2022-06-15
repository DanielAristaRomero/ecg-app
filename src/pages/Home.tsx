import { useCallback, useRef, useState } from "react";
import Webcam from "react-webcam";
import { v4 as uuidv4 } from "uuid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheck,
  faDeleteLeft,
  faFileArrowUp,
  faFileWaveform,
  faRepeat,
  faXmark,
  faCamera,
} from "@fortawesome/free-solid-svg-icons";
import guardarAnalisis from "../helpers/guardarAnalisis";
import { Header } from "../components/header/Header";
import guardarImagen from "../helpers/guardarImagen";
import dayjs from "dayjs";
import getCroppedImg from "../helpers/cropImage";
import CapturaECG from "./CapturaECG";

const FACING_MODE_USER = "user";
const FACING_MODE_ENVIRONMENT = "environment";

const Home = () => {
  const key = localStorage.getItem("key-aut-ecg-app");
  const [isCameraOpen, setIsCameraOpen] = useState(false);

  const [foto, setFoto] = useState<string>("");

  const [tipoCamara, setTipoCamara] = useState(FACING_MODE_USER);

  const webcamRef = useRef<any>(null);

  const capture = useCallback(async () => {
    const imageSrc = webcamRef.current.getScreenshot();
    const height = window.screen.height;
    const width = window.screen.width;

    const recorte = {
      width: width >= 500 ? width - 40 : width + 120,
      height: width >= 500 ? height - 180 : width - 80,
      x: width >= 500 ? 40 : 80,
      y: width >= 500 ? 80 : 40,
    };

    const croppedImage = await getCroppedImg(
      imageSrc,
      recorte,
      width >= 500 ? 0 : 270
    );
    setFoto(croppedImage!);

    obtenerAnalisis(imageSrc);
  }, [webcamRef, setFoto]);

  const obtenerAnalisis = async (fotoBase64: string) => {
    const response: Response = await fetch(fotoBase64);
    const blob: Blob = await response.blob();
    const uuid = uuidv4();
    const file = new File([blob], uuid + ".png", { type: "image/png" });
    const uriECG = await guardarImagen(file, foto, uuid);
    // guardarAnalisis(key!, {
    //   uuid: uuidv4(),
    //   fecha: dayjs().format(),
    //   hayPadecimientos: true,
    //   ptcSeguridad: 87,
    //   descripcion: "Se encontraron problemas con el bombeo de la sangre",
    //   uriECG,
    // });
  };

  const videoConstraints = {
    width: 1920,
    height: 1080,
    facingMode: FACING_MODE_ENVIRONMENT,
  };

  const cambiarCamara = () => {
    setTipoCamara((prev) =>
      prev === FACING_MODE_USER ? FACING_MODE_ENVIRONMENT : FACING_MODE_USER
    );
  };

  return (
    <>
      {!isCameraOpen ? (
        <div>
          <Header titulo="Heartly" />
          <div className="flex">
            <img
              className="md:w-3/4 max-h-[600px]"
              src="https://firebasestorage.googleapis.com/v0/b/app-ecg-c4f86.appspot.com/o/medicina.svg?alt=media&token=7a4cee7d-cb91-49e7-91e5-7f3de63e61df"
              alt="Banner inicio"
            ></img>
            <div className="hidden md:flex flex-col justify-center items-center content-center px-8">
              <h3 className="text-center">
                ¿Cómo capturar el ECG de manera correcta?
              </h3>
              <p className="mt-5 text-center">
                Para realizar una correcta captura de tu electrocardiograma,
                primero debes de centrarlo y tratar de mantenerlo dentro de los
                márgenes indicados, una vez realizado esto toma la fotografía y
                confirma que se ve bien para poder iniciar con el análisis.
              </p>

              <button
                className="mt-5 py-2 px-3 bg-rose-600 rounded-lg text-base text-white shadow-sm shadow-rose-400 transition-all hover:shadow-none"
                onClick={() => setIsCameraOpen(true)}
              >
                Iniciar captura
                <FontAwesomeIcon className="ml-2" icon={faCamera} />
              </button>
              {/* <p className="text-gray-600">o</p>
              <button className="mt-1 py-2 px-3 bg-rose-600 rounded-lg text-base text-white shadow-sm shadow-rose-400 transition-all hover:shadow-none">
                Cargar desde el dispositivo
                <FontAwesomeIcon className="ml-2" icon={faFileArrowUp} />
              </button> */}
            </div>
          </div>
          <div className="md:hidden flex flex-col justify-center align-middle mt-20 px-8">
            <h3 className="text-center">
              ¿Cómo capturar el ECG de manera correcta?
            </h3>
            <p className="mt-5 text-center">
              Para realizar una correcta captura de tu electrocardiograma,
              primero debes de centrarlo y tratar de mantenerlo dentro de los
              márgenes indicados, una vez realizado esto toma la fotografía y
              confirma que se ve bien para poder iniciar con el análisis.
            </p>
          </div>
          <div
            className="fab-cam md:hidden"
            onClick={() => setIsCameraOpen(true)}
          >
            <FontAwesomeIcon className="ml-2" icon={faFileWaveform} />
          </div>
        </div>
      ) : !foto ? (
        <div className="relative top-4 ">
          <div
            className="absolute right-4 text-white top-3 text-2xl z-10"
            onClick={() => setIsCameraOpen(false)}
          >
            <FontAwesomeIcon className="ml-2" icon={faXmark} />
          </div>
          <Webcam
            screenshotFormat="image/png"
            videoConstraints={{
              ...videoConstraints,
              facingMode: tipoCamara,
            }}
            ref={webcamRef}
          />
          <div
            className="absolute border-l-2 border-t-2 top-20 rounded-tl-lg left-10 border-white bg-transparent z-11"
            style={{
              height: "3rem",
              width: "3rem",
            }}
          ></div>
          <div
            className="absolute border-r-2 border-t-2 top-20 rounded-tr-lg right-10 border-white bg-transparent z-11"
            style={{
              height: "3rem",
              width: "3rem",
            }}
          ></div>
          <div
            className="absolute border-r-2 border-b-2 bottom-28 rounded-br-lg right-10 border-white bg-transparent z-11"
            style={{
              height: "3rem",
              width: "3rem",
            }}
          ></div>
          <div
            className="absolute border-l-2 border-b-2 bottom-28 rounded-bl-lg left-10 border-white bg-transparent z-11"
            style={{
              height: "3rem",
              width: "3rem",
            }}
          ></div>
          <div
            className="absolute right-4 text-white bottom-6 text-2xl z-10"
            onClick={() => cambiarCamara()}
          >
            <FontAwesomeIcon className="ml-2" icon={faRepeat} />
          </div>
          <div
            className="flex justify-center absolute w-full bottom-4"
            onClick={capture}
          >
            <div className="w-16 h-16 rounded-full border-dashed border-2 border-gray-50"></div>
          </div>
        </div>
      ) : (
        <div className="relative">
          <CapturaECG foto={foto} stateChange={setFoto} />
          {/* <img src={foto} id="fotoECG" />
          <button
            className="flex justify-center absolute w-full bottom-4"
            onClick={capture}
          >
            <div className="w-16 h-16 rounded-full border-2 border-gray-50 text-white flex justify-center items-center">
              <FontAwesomeIcon className="text-3xl" icon={faCheck} />
            </div>
            <div
              className="absolute right-4 text-white bottom-4 text-2xl z-10"
              onClick={() => setFoto("")}
            >
              <FontAwesomeIcon className="ml-2" icon={faDeleteLeft} />
            </div>
          </button> */}
        </div>
      )}
    </>
  );
};

export default Home;
