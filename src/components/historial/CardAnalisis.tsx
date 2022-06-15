import { faCircleArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import dayjs from "dayjs";
import { NavLink } from "react-router-dom";
import { Analisis } from "../../interfaces/interfaces";

export const CardAnalisis = (props: Analisis) => {
  const { fecha, hayPadecimientos, ptcSeguridad, uuid } = props;

  return (
    <>
      <div className="border rounded-md border-neutral-200 p-3 shadow-md shadow-blue-100 mb-3">
        <div className="text-sm">
          <p>
            Fecha: <strong>{dayjs(fecha).format("DD/MM/YYYY - h:mm a")}</strong>
          </p>
          <p>
            Padecimientos detectados:{" "}
            <strong>{hayPadecimientos ? "Si" : "No"}</strong>
          </p>
          <p>
            Seguridad: <strong>{ptcSeguridad}%</strong>
          </p>
        </div>
        <div className="flex justify-end">
          <NavLink to={"/historial/detalle/" + uuid}>
            <button className="py-1 px-2 bg-rose-600 rounded-lg text-sm text-white shadow-sm shadow-rose-400 transition-all hover:shadow-none">
              Revisar
              <FontAwesomeIcon className="ml-2" icon={faCircleArrowRight} />
            </button>
          </NavLink>
        </div>
      </div>
    </>
  );
};
