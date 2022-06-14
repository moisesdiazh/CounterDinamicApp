import React from "react";
import { useForm } from "../hooks/useForm";
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
      <form onSubmit={onSearchSubmit}>
        <label>Filtrar contador</label>

        <select onChange={handleInputChange} name="search">
          <option value="">Elije tu filtro</option>
          <option value="1">Menor a 5</option>
          <option value="2">Mayor a 5</option>
          <option value="3">Menor a 10</option>
          <option value="4">Mayor a 10</option>
        </select>

        <button type="submit">Filtrar</button>
      </form>
    </>
  );
};

export default Select;
