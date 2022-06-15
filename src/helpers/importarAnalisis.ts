import guardarAnalisis from "./guardarAnalisis";

export const importarAnalisis = (e: any, key: string) => {
  const file = e.target.files[0];
  const reader = new FileReader();

  reader.onload = function (e) {
    const text: any = e!.target!.result;
    if (text) {
      const headers = text.slice(0, text.indexOf("\n")).split(",");
      const rows = text.slice(text.indexOf("\n") + 1).split("\n");
      let analsisImportados = rows.map((row: any) => {
        const values = row.split(",");
        const analisis = headers.reduce((obj: any, header: any, i: number) => {
          if (header.replace(/["]+/g, "") === "hayPadecimientos") {
            obj[header.replace(/["]+/g, "")] =
              values[i].replace(/["]+/g, "") === "true";
          } else if (header.replace(/["]+/g, "") === "ptcSeguridad") {
            obj[header.replace(/["]+/g, "")] = parseFloat(
              values[i].replace(/["]+/g, "")
            );
          } else {
            obj[header.replace(/["]+/g, "")] = values[i].replace(/["]+/g, "");
          }
          return obj;
        }, {});
        guardarAnalisis(key, analisis);
        return analisis;
      });
    }
  };
  reader.readAsText(file);
};
