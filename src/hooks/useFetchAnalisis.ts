import { useEffect, useState } from "react";
import { Analisis } from "../interfaces/interfaces";
import getAnalisis from "../helpers/getAnalisis";
import dayjs from "dayjs";

interface State {
  data: Analisis[];
  loading: boolean;
}

export const useFetchAnalisis = (cveDatos: string) => {
  const [state, setState] = useState<State>({
    data: [],
    loading: true,
  });

  useEffect(() => {
    getAnalisis(cveDatos)
      .then((datos) => {
        setState({
          data: datos.sort((a, b) => {
            return +dayjs(b.fecha) - +dayjs(a.fecha);
          }),
          loading: false,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }, [cveDatos]);

  return {
    state,
    setState,
  };
};
