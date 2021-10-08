import React, { useState } from "react";
import { usePaginatedQuery } from "react-query";
import Planet from "./Planet";

const fetchPlanets = async (key, page) => {
  console.log(page);
  const res = await fetch(`https://swapi.dev/api/planets/?page=${page}`);
  return res.json();
};

const Planets = () => {
  const [page, setPage] = useState(1);
  const { resolvedData, latestData, status } = usePaginatedQuery(
    ["planets", page],
    fetchPlanets
  );

  // console.log(data)
  return (
    <div>
      <h1>Planets</h1>

      {status === "loading" && <div>loading data...</div>}

      {status === "error" && <div>Error fetching data</div>}

      {status === "success" && (
        <>
          <button onClick={() => setPage((old) => Math.max(old - 1, 1))}>
            Previous
          </button>
          <span>{page}</span>
          <button
            onClick={() =>
              setPage((old) =>
                !latestData || !latestData.next ? old : old + 1
              )
            }
          >
            Next
          </button>
          <div>
            {resolvedData.results.map((planet) => (
              <Planet planet={planet} key={planet.name} />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Planets;
