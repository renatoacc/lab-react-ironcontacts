import { useState } from "react";
import celebList from "../contacts.json";

const fiveList = celebList.slice(5, 10);

export function Celebs() {
  const [celebs, setCelebs] = useState(
    fiveList.map((celebrity) => {
      return { ...celebrity };
    })
  );

  const sortName = () => {
    const newList = [...celebs];
    newList.sort((a, b) => (a.name > b.name ? 1 : -1));
    setCelebs(newList);
  };

  const sortPop = () => {
    const newList = [...celebs];
    newList.sort((a, b) => (a.popularity > b.popularity ? -1 : 1));
    setCelebs(newList);
  };

  const addCeleb = () => {
    setCelebs((oldList) => {
      const filterList = celebList.filter(
        (elem) => !oldList.find(({ id }) => elem.id === id)
      );
      const getRandomCeleb = Math.floor(Math.random() * filterList.length);

      return [filterList[getRandomCeleb], ...oldList];
    });
  };

  const deleteCeleb = (findCeleb) => {
    setCelebs((oldList) => {
      return oldList.filter((celebs) => celebs.id !== findCeleb.id);
    });
  };

  return (
    <>
      <div className="App">
        <h1> IronContacts</h1>
        <button onClick={addCeleb}>Add Random Contact</button>
        <button onClick={sortName}>Sort by Name</button>
        <button onClick={sortPop}>Sort by Popularity</button>
        <table>
          <thead>
            <tr>
              <th>Picture</th>
              <th>Name</th>
              <th>Popularity</th>
              <th>Won Oscar</th>
              <th>Won Emmy</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {celebs.map((elem) => (
              <tr key={elem.id}>
                <td>
                  <img
                    className="profileImg"
                    src={elem.pictureUrl}
                    alt={elem.name}
                  />
                </td>
                <td>
                  <h3>{elem.name}</h3>
                </td>
                <td>{elem.popularity.toFixed(2)}</td>
                <td>{elem.wonOscar ? "🏆" : ""} </td>
                <td>{elem.wonEmmy ? "🏆" : ""}</td>
                <td>
                  <button onClick={() => deleteCeleb(elem)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
