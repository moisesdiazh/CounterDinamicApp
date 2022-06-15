import React from "react";
import { useForm } from "../hooks/useForm";
import "../styles/counter.css";

const Select = ({ setSaveSearch }) => {
  const [{ search }, handleInputChange, reset] = useForm({
    search: "",
  });

  const onSearchSubmit = (e) => {
    e.preventDefault();

    // console.log({ search });

    setSaveSearch(search);
  };

  return (
    <>
      <div className="search-container">
        <form onSubmit={onSearchSubmit}>
          <strong className="labelSearch">Filtrar contador </strong>

          <select onChange={handleInputChange} name="search" className="search">
            <option value="">Elije tu filtro</option>
            <option value="1">Menor a 5</option>
            <option value="2">Mayor a 5</option>
            <option value="3">Menor a 10</option>
            <option value="4">Mayor a 10</option>
          </select>

          <button type="submit" className="filterbutton">
            Filtrar
          </button>
        </form>
      </div>
    </>
  );
};

export default Select;
