import React, { useState } from "react";
import { useQuery } from "react-query";
import Person from "./Person";

const fetchPeople = async (key,page) => {
  const res = await fetch(`http://swapi.dev/api/people/?page=${page}`);
  return res.json();
};

const People = () => {
  const [ page,setPage] = useState(1)
  const { data, status } = useQuery(["people",page], fetchPeople);
  console.log(data);
  
  return (
    <div>
      <h1>People</h1>
      {/* <p>{status}</p> */}
      <button onClick={()=>setPage(1)}>page 1</button>
      <button onClick={()=>setPage(2)}>page 2</button>
      <button onClick={()=>setPage(3)}>page 3</button>

      {status === "loading" && <div>loading data...</div>}

      {status === "error" && <div>Error fetching data</div>}

      {status === "success" && (
        <div>
          {data.results && data.results.map((person) => (
            <Person person={person} key={person.name} />
          ))}
        </div>
      )}
    </div>
  );
};

export default People;
