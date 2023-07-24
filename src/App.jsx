import { useEffect, useMemo, useRef, useState } from "react";
import { ListUsers } from "./components/ListUsers";

export const sortBy = {
  none: "none",
  country: "country",
  name: "name",
  last: "last",
};
const API = "https://randomuser.me/api/?results=100";

function App() {
  const [users, setUsers] = useState([]);
  const [showColors, setShowColors] = useState(false);
  const [sorted, setSorted] = useState(sortBy.none);
  const [filterCountry, setFilterCountry] = useState(null);
  const orginalUsers = useRef([]);

  useEffect(() => {
    fetch(API)
      .then((response) => response.json())
      .then((data) => {
        setUsers(data.results);
        orginalUsers.current = data.results;
      })
      .catch((error) => console.log(error));
  }, []);

  const toogleColors = () => {
    setShowColors(!showColors);
  };

  const toogleSortByCountry = () => {
    // setSortCountry((prevState) => !prevState);
    sorted === sortBy.none ? setSorted(sortBy.country) : setSorted(sortBy.none);
  };

  const filteredUsers = useMemo(() => {
    return filterCountry != null
      ? users.filter((user) =>
          user.location.country
            .toLowerCase()
            .includes(filterCountry.toLowerCase())
        )
      : users;
  }, [filterCountry, users]);

  const sortedUsers = useMemo(() => {
    if (sorted === sortBy.none) {
      return filteredUsers;
    }
    if (sorted === sortBy.country) {
      return filteredUsers.toSorted((a, b) =>
        a.location.country.localeCompare(b.location.country)
      );
    }
    if (sorted === sortBy.name) {
      return filteredUsers.toSorted((a, b) =>
        a.name.first.localeCompare(b.name.first)
      );
    }
    if (sorted === sortBy.last) {
      return filteredUsers.toSorted((a, b) =>
        a.name.last.localeCompare(b.name.last)
      );
    }
  }, [sorted, filteredUsers]);

  const handleDelete = (uuid) => {
    const filteredUsers = users.filter((user) => user.login.uuid !== uuid);
    setUsers(filteredUsers);
  };

  const handleResetUsers = () => {
    setUsers(orginalUsers.current);
  };

  const handlerSorter = (sorter) => {
    setSorted(sorter);
  };

  return (
    <div className="App">
      <h1>User Table</h1>
      <header
        style={{ display: "flex", gap: "0.7rem", justifyContent: "center" }}
      >
        <button onClick={toogleColors}>Pintar filas</button>
        <button onClick={toogleSortByCountry}>
          {sorted === sortBy.country ? "Orden Original" : "Ordenar por Pais"}
        </button>
        <button onClick={handleResetUsers}>Reset Users</button>
        <input
          onChange={(e) => {
            e.preventDefault();
            setFilterCountry(e.target.value);
          }}
          type="text"
          placeholder="Filter by country"
          style={{ width: "auto" }}
        />
      </header>
      <main>
        <ListUsers
          handlerSorter={handlerSorter}
          deleteUser={handleDelete}
          showColors={showColors}
          users={sortedUsers}
        />
      </main>
    </div>
  );
}

export default App;
