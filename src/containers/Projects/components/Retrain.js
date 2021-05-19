import { useState } from "react";
import { post } from "../../../helpers/api";

export function Retrain({ project }) {
  const [days, setDays] = useState(5);
  const { created_from_database, project: projectId } = project;

  async function trainFromDatabase() {
    await post(`retrain/${projectId}`, { days, from_database: true });
  }

  return (
    <div className="w-full py-4 grid grid-cols-1 gap-8">
      <FromDatabase
        days={days}
        setDays={setDays}
        created_from_database={created_from_database}
        trainFromDatabase={trainFromDatabase}
      />
      <FromCSV />
    </div>
  );
}

function FromDatabase({
  created_from_database,
  days,
  setDays,
  trainFromDatabase,
}) {
  if (created_from_database) {
    return (
      <div className="shadow rounded p-4 grid grid-cols-1 gap-12 md:grid-cols-2">
        <div>
          <span>
            Como has entrenado el proyecto a partir de una base de datos, el
            reentrenamiento es mucho más fácil: puedes configurar cada cuánto
            tiempo quieres entrenarlo, nosotros nos encargamos de buscar la
            información nueva en tu base de datos y de todo el proceso. Tú
            simplemente elige un período.
          </span>
        </div>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-1">
          <select
            value={days}
            onChange={(e) => setDays(e.target.value)}
            className="rounded shadow border-0 md:w-64 sm:w-32 h-12"
          >
            <option value={5}>5 días</option>
            <option value={7}>7 días</option>
            <option value={14}>14 días</option>
            <option value={31}>31 días</option>
          </select>
          <button
            onClick={trainFromDatabase}
            className="primary bg-indigo-600 text-white rounded shadow border-0 md:w-64 sm:w-32 h-12"
          >
            Configurar
          </button>
        </div>
      </div>
    );
  }

  return null;
}

function FromCSV() {
  return (
    <div className="shadow rounded p-4 grid grid-cols-1 gap-12 md:grid-cols-2">
      <div>
        <span>
          Puedes subir un CSV con datos nuevos (recuerda que los antiguos ya los
          conoce), siempre y cuando mantenga la misma estructura de columnas que
          el anterior, y a partir de esos datos nuevos reentrenaremos el modelo.
        </span>
      </div>
      <div className="mt-auto">
        <button className="primary bg-indigo-600 text-white rounded shadow border-0 md:w-64 sm:w-32 h-12">
          Subir CSV
        </button>
      </div>
    </div>
  );
}
