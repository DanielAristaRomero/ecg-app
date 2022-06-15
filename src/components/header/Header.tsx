export const Header = ({ titulo = "NombreSeccion" }) => {
  return (
    <div>
      <div className="relative md:hidden">
        <div className="flex justify-center absolute w-full top-3">
          <h4 className="text-white text-2xl">{titulo}</h4>
        </div>
      </div>
      <div className="h-[150px] overflow-hidden">
        <svg
          className="h-full w-full"
          viewBox="0 0 500 150"
          preserveAspectRatio="none"
        >
          <path
            d="M-0.27,54.78 C113.15,74.52 364.27,35.05 500.84,59.72 L500.00,0.00 L0.00,0.00 Z"
            style={{ stroke: "none", fill: "#08f" }}
          ></path>
        </svg>
      </div>
    </div>
  );
};
