import React, { useEffect, useState } from "react";
import { useCounter } from "../hooks/useCounter";
import { useForm } from "../hooks/useForm";
import "../styles/counter.css";
import Select from "./Select";

//  HIGH ORDER COMPONENT

const CounterCard = (props) => {
  const { name, counter, id, increment, decrement, handleDelete } = props;

  return (
    <>
      <hr />
      <li className="counter-card">
        <h1 className="counter-card-title">
          {name} counter: {counter}
        </h1>

        <button onClick={() => increment(id)} className="buttoncounter">
          Aumentar
        </button>
        <button onClick={() => decrement(id)} className="buttoncounter">
          Disminuir
        </button>
        <button className="buttoncounter" onClick={() => handleDelete(id)}>
          Eliminar contador
        </button>
      </li>
    </>
  );
};

export const Counter = () => {
  const [modal, setModal] = useState(false);

  const [saveSearch, setSaveSearch] = useState("");

  const [counterFiltered, setCounterFiltered] = useState([]);

  //mediante desestructuración nos traemos lo que queremos del hook solamente, en este caso el state o counter, increment, decrement y
  const { listCounter, createCounter, increment, decrement, handleDelete } =
    useCounter(saveSearch);

  const [{ name }, handleInputChange, reset] = useForm({
    name: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    createCounter(name);

    setCounterFiltered([]);

    reset();
  };

  useEffect(() => {
    if (saveSearch === "") {
      setCounterFiltered(listCounter.filter((item) => item.counter > 0));
    }

    if (saveSearch === "1") {
      setCounterFiltered(listCounter.filter((item) => item.counter < 5));
    }

    if (saveSearch === "2") {
      setCounterFiltered(listCounter.filter((item) => item.counter > 5));
    }

    if (saveSearch === "3") {
      setCounterFiltered(listCounter.filter((item) => item.counter < 10));
    }

    if (saveSearch === "4") {
      setCounterFiltered(listCounter.filter((item) => item.counter > 10));
    }
  }, [saveSearch, listCounter]);

  return (
    <>
      
        <header>

          <h1 className="title">Challenge Los Heroes</h1>
        </header>

      <div className="container">

        <button
          onClick={() => setModal(!modal)}
          className="addCounter"
          id="open"
          disabled={listCounter.length === 20}
        >
          Agregar contador
        </button>

      </div>

      <Select setSaveSearch={setSaveSearch} />


      <div className={`${modal && "show"} modal-container`}>
        <div className="modal">
          <h1 className="titleModal">Agrega un contador</h1>
          <form onSubmit={handleSubmit}>
            <label className="labelModal">Nombre del contador</label>
            <input
              type="text"
              className="name-counter"
              id="name"
              name="name"
              placeholder="Nombre del contador"
              autoComplete="off"
              maxlength="20"
              onChange={handleInputChange}
              value={name}
            />

            <button type="submit" className="addModal" disabled={listCounter.length === 20}>
              Confirmar
            </button>
          </form>

          <button onClick={() => setModal(!modal)} className="close">
            Cerrar
          </button>
        </div>
      </div>

      <ul className="list">
        {counterFiltered.length > 0 ? (
          <>

            {counterFiltered.map(({ id, ...rest }) => (
              <CounterCard
                key={id}
                id={id}
                {...rest}
                increment={increment}
                decrement={decrement}
                handleDelete={handleDelete}
              />
            ))}
          </>
        ) : (
          <>
            {listCounter.map(({ id, ...rest }) => (
              <CounterCard
                key={id}
                id={id}
                {...rest}
                increment={increment}
                decrement={decrement}
                handleDelete={handleDelete}
              />
            ))}
          </>
        )}
      </ul>
      
        <footer>
          Número de contadores: {listCounter.length}
        </footer>
    </>
  );
};
