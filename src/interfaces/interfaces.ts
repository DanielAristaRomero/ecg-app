export interface DetalleAnalisis {
  uuid: string;
  fecha: string;
  hayPadecimientos: boolean;
  ptcSeguridad: number;
  descripcion: string;
  uriECG: string;
}

export interface Analisis {
  uuid: string;
  fecha: string;
  hayPadecimientos: boolean;
  ptcSeguridad: number;
  descripcion?: string;
}
