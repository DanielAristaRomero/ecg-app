import { faCircleExclamation } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const Error = () => {
  return (
    <div>
      <div className="w-full bg-blue-500 relative rounded-bl-3xl rounded-br-3xl flex items-center justify-center">
        <div className="flex justify-center">
          <h1 className="text-2xl text-white py-3">Confirmar captura</h1>
        </div>
      </div>
      <div className="mt-16">
        <FontAwesomeIcon icon={faCircleExclamation} className="mr-1" />
      </div>
    </div>
  );
};

export default Error;
