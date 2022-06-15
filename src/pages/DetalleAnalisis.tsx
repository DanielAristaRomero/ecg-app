import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faReply, faTrash } from "@fortawesome/free-solid-svg-icons";
import dayjs from "dayjs";
import Swal from "sweetalert2";
import { Header } from "../components/header/Header";
import getDetalleAnalisis from "../helpers/getDetalleAnalisis";
import eliminarAnalisis from "../helpers/eliminarAnalisis";

const DetalleAnalisis = () => {
  const key = localStorage.getItem("key-aut-ecg-app");
  let params = useParams();
  let navigate = useNavigate();

  const [detalleAnalisis, setDetalleAnalisis] = useState({
    analisis: {
      descripcion: "",
      fecha: "",
      hayPadecimientos: false,
      ptcSeguridad: 0,
      uriECG: "",
      uuid: "",
    },
    loading: true,
  });

  useEffect(() => {
    getDetalleAnalisis(key!, params.id!)
      .then((datos) => {
        setDetalleAnalisis({
          analisis: datos!,
          loading: false,
        });
      })
      .catch((error) => {
        navigate("/historial");
        window.location.reload();
        throw new Error(error);
      });
  }, [params]);

  const handleDeleted = () => {
    Swal.fire({
      title: "¿Eliminar este análisis?",
      text: "Una vez eliminado no podrás recuperarlo.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#08f",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, eliminar",
      cancelButtonText: "No, mantener",
    }).then((result) => {
      if (result.isConfirmed) {
        eliminarAnalisis(key!, detalleAnalisis.analisis.uuid);
        navigate("/historial");
        Swal.fire({
          icon: "success",
          title: "Análisis eliminado",
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 2000,
          timerProgressBar: true,
        });
      }
    });
  };

  return (
    <div>
      <Header titulo="Detalle del análisis" />
      {!detalleAnalisis.loading && (
        <div className="relative top-[-65px]">
          <div className="py-5 px-4">
            <div>
              <p className="text-right">
                Fecha:{" "}
                <span className="font-medium">
                  {dayjs(detalleAnalisis.analisis.fecha).format(
                    "DD/MM/YYYY - h:mm a"
                  )}
                </span>
              </p>
              <p className="mt-7">
                ¿Padecimientos detectados?:{" "}
                <span className="font-medium ml-1">
                  {detalleAnalisis.analisis.hayPadecimientos ? "Si" : "No"}
                </span>
              </p>
              <p className="mt-4">Descripción:</p>
              <p className="font-medium">
                {detalleAnalisis.analisis.descripcion}
              </p>
              <p className="mt-4">
                Seguridad:{" "}
                <span className="font-medium">
                  {detalleAnalisis.analisis.ptcSeguridad}%
                </span>
              </p>
            </div>
            <div className="mt-10">
              <p className="text-center text-sm">Fotografía capturada</p>
              <div className="mt-2 flex justify-center">
                <img
                  className="rounded-3xl border-2 border-black w-11/12 md:w-2/4 lg:w-2/6"
                  src={detalleAnalisis.analisis.uriECG}
                  alt=""
                />
              </div>
            </div>
            <div className="flex justify-between md:justify-end mt-7">
              <button
                className="py-1 px-2 md:mr-5  rounded-lg text-sm text-rose-700 shadow-sm  transition-all hover:shadow-none"
                onClick={handleDeleted}
              >
                Eliminar
                <FontAwesomeIcon className="ml-2" icon={faTrash} />
              </button>
              <Link to="/historial">
                <button className="py-1 px-2 bg-rose-600 rounded-lg text-sm text-white shadow-sm shadow-rose-400 transition-all hover:shadow-none">
                  Regresar
                  <FontAwesomeIcon className="ml-2" icon={faReply} />
                </button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DetalleAnalisis;
