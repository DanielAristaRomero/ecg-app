import { useState } from "react";
import { NavLink } from "react-router-dom";
import { CSVLink } from "react-csv";
import dayjs from "dayjs";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowDownShortWide,
  faArrowUpWideShort,
  faFileArrowDown,
  faFileArrowUp,
  faFileContract,
  faCircleArrowRight,
} from "@fortawesome/free-solid-svg-icons";

import { CardAnalisis } from "../components/historial/CardAnalisis";
import { useFetchAnalisis } from "../hooks/useFetchAnalisis";
import { importarAnalisis } from "../helpers/importarAnalisis";
import { Header } from "../components/header/Header";

const Historial = () => {
  const key = localStorage.getItem("key-aut-ecg-app");

  const {
    state: { data: analisis, loading },
    setState: setAnalsis,
  } = useFetchAnalisis(key!);

  const [ordenamiento, setOrdenamiento] = useState(true);

  const ordenarRegistros = () => {
    setAnalsis({
      data: analisis.sort((a, b) => {
        return ordenamiento
          ? +dayjs(a.fecha) - +dayjs(b.fecha)
          : +dayjs(b.fecha) - +dayjs(a.fecha);
      }),
      loading: false,
    });
    setOrdenamiento(!ordenamiento);
  };

  const handleFileUpload = (e: any) => {
    importarAnalisis(e, key!);
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  };

  return (
    <div>
      <Header titulo="Historial" />
      <div className="relative top-[-55px]">
        <div className="px-4">
          <div className="flex justify-between align-middle items-center text-neutral-500 text-sm">
            <p className="text-xs ml-1">{analisis.length} registros</p>
            <div className="cursor-pointer">
              {ordenamiento ? (
                <p onClick={ordenarRegistros}>
                  Mas recientes
                  <FontAwesomeIcon className="ml-2" icon={faArrowUpWideShort} />
                </p>
              ) : (
                <p onClick={ordenarRegistros}>
                  Mas antiguos
                  <FontAwesomeIcon
                    className="ml-2"
                    icon={faArrowDownShortWide}
                  />
                </p>
              )}
            </div>
          </div>
          <div className="hidden md:flex justify-end mt-8 text-neutral-500">
            <button className="border border-white hover:border-gray-300 py-1 px-2 rounded text-sm">
              <label htmlFor="fileCsv">
                Importar
                <FontAwesomeIcon className="ml-2" icon={faFileArrowUp} />
              </label>
              <input
                id="fileCsv"
                className="hidden"
                type="file"
                accept=".csv,.xlsx,.xls"
                onChange={handleFileUpload}
              />
            </button>
            <button className="border border-white hover:border-gray-300 py-1 px-2 rounded text-sm">
              <CSVLink data={analisis} filename="analisis-ecg-app">
                Exportar
                <FontAwesomeIcon className="ml-2" icon={faFileArrowDown} />
              </CSVLink>
            </button>
          </div>
          <CSVLink
            className="fab-cam md:hidden"
            data={analisis}
            filename="analisis-ecg-app"
          >
            <FontAwesomeIcon className="" icon={faFileArrowDown} />
          </CSVLink>
          <div className="fab-cam left md:hidden" onClick={() => {}}>
            <label htmlFor="fileCsv">
              <FontAwesomeIcon className="ml-2" icon={faFileArrowUp} />
            </label>
            <input
              id="fileCsv"
              className="hidden"
              type="file"
              accept=".csv,.xlsx,.xls"
              onChange={handleFileUpload}
            />
          </div>
        </div>
        {loading && (
          <div
            data-testid="analisis-card"
            className="flex flex-col content-center justify-center"
            style={{ height: "80vh" }}
          >
            <div className="pulse" data-testid="analisis-card"></div>
          </div>
        )}
        {analisis.length > 0 ? (
          <>
            <div className="md:hidden">
              <div className="py-5 px-4">
                {analisis.map((datos, index) => (
                  <CardAnalisis key={index} {...datos} />
                ))}
              </div>
            </div>
            <div className="hidden md:block mx-10">
              <table className="w-full">
                <thead className="">
                  <tr className="text-left">
                    <th className="font-thin pb-3" style={{ width: "15%" }}>
                      Fecha
                    </th>
                    <th className="font-thin pb-3" style={{ width: "15%" }}>
                      Padecimientos detectados
                    </th>
                    <th className="font-thin pb-3" style={{ width: "15%" }}>
                      Seguridad
                    </th>
                    <th className="font-thin pb-3" style={{ width: "5%" }}>
                      Descripción
                    </th>
                    <th className="font-thin pb-3" style={{ width: "8%" }}></th>
                  </tr>
                </thead>
                <tbody>
                  {analisis.map((datos, index) => (
                    <tr
                      className="border-y"
                      key={index}
                      data-testid="analisis-card"
                    >
                      <td className="py-5">
                        {dayjs(datos.fecha).format("DD/MM/YYYY - h:mm a")}
                      </td>
                      <td>{datos.hayPadecimientos ? "Si" : "No"}</td>
                      <td>{datos.ptcSeguridad}%</td>
                      <td style={{ maxWidth: "450px" }} className="">
                        <p className="truncate">{datos.descripcion}</p>
                      </td>
                      <td className="text-right">
                        <NavLink to={"/historial/detalle/" + datos.uuid}>
                          <button className="py-1 px-2 bg-rose-600 rounded-lg text-sm text-white shadow-sm shadow-rose-400 transition-all hover:shadow-none">
                            <span className="mr-2 hidden xl:inline-block">
                              Detalle
                            </span>
                            <FontAwesomeIcon icon={faCircleArrowRight} />
                          </button>
                        </NavLink>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        ) : (
          !loading && (
            <div className="flex flex-col h-screen content-center justify-center">
              <div className="text-gray-500 flex flex-col content-center mb-60">
                <FontAwesomeIcon
                  className="ml-2 text-4xl"
                  icon={faFileContract}
                />
                <p className="text-center text-xl mt-3">
                  Aún no tienes análisis guardados
                </p>
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default Historial;
