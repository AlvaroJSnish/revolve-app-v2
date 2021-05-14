import { useEffect, useState } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";

import { fetchDatabasesRequest } from "../../redux/actions/DatabasesActions";
import { post } from "../../helpers/api";

export function Databases() {
  const dispatch = useDispatch();
  const { databases } = useSelector((state) => state.databases, shallowEqual);

  const [databaseValues, setDatabaseValues] = useState({});

  useEffect(() => {
    dispatch(fetchDatabasesRequest());
  }, []);

  async function handleCreate() {
    await post(`databases`, { ...databaseValues, database_type: "postgres" });
  }

  async function handleConnect(database) {
    const { id, owner, ...databaseValues } = database;

    await post(`databases/${id}`, { ...databaseValues });
  }

  return (
    <>
      <div className="h-16 shadow rounded p-4 mb-4 flex row justify-around">
        <input
          placeholder="host"
          onChange={(e) =>
            setDatabaseValues({
              ...databaseValues,
              database_host: e.target.value,
            })
          }
        />
        <input
          placeholder="port"
          type="number"
          className="border-none"
          onChange={(e) =>
            setDatabaseValues({
              ...databaseValues,
              database_port: e.target.value,
            })
          }
        />
        <input
          placeholder="username"
          onChange={(e) =>
            setDatabaseValues({
              ...databaseValues,
              database_user: e.target.value,
            })
          }
        />
        <input
          placeholder="password"
          onChange={(e) =>
            setDatabaseValues({
              ...databaseValues,
              database_password: e.target.value,
            })
          }
        />
        <input
          placeholder="database"
          onChange={(e) =>
            setDatabaseValues({
              ...databaseValues,
              database_name: e.target.value,
            })
          }
        />
        <button className="shadow rounded px-4" onClick={handleCreate}>
          create
        </button>
      </div>

      {databases.map((database) => (
        <div
          key={database.id}
          className="h-16 shadow rounded p-4 mb-4 flex row justify-around"
        >
          <span>{database.database_host}</span>
          <span>{database.database_port}</span>
          <span>{database.database_user}</span>
          <span>{database.database_password}</span>
          <span>{database.database_name}</span>

          <button
            className="shadow rounded px-4"
            onClick={() => handleConnect(database)}
          >
            connect
          </button>
        </div>
      ))}
    </>
  );
}
