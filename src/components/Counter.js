import React, { useState } from "react";
import { useCounter } from "../hooks/useCounter";
import "../styles/counter.css";
import { useForm } from "../hooks/useForm";

//  HIGH ORDER COMPONENT

const CounterCard = (props) => {
  const { name, counter, id, increment, decrement, handleDelete } = props;

  return (
    <>
      <hr />
      <li>
        <h1>
          {name} counter: {counter}
        </h1>

        <button onClick={() => increment(id)} className="botoncounter">
          Aumentar
        </button>
        <button onClick={() => decrement(id)} className="botoncounter">
          Disminuir
        </button>
        <button className="botoncounter" onClick={() => handleDelete(id)}>
          Eliminar contador
        </button>
      </li>
    </>
  );
};

export const Counter = () => {
  const [modal, setModal] = useState(false);

  //mediante desestructuración nos traemos lo que queremos del hook solamente, en este caso el state o counter, increment, decrement y
  const { listCounter, createCounter, increment, decrement, handleDelete } =
    useCounter();

  const [{ name }, handleInputChange, reset] = useForm({
    name: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    createCounter(name);

    reset();
  };

  return (
    <>
      <div className="">
        <h1>Challenge Los Heroes</h1>

        <button
          onClick={() => setModal(!modal)}
          className="botoncounter"
          id="open"
        >
          Agregar contador
        </button>
      </div>

      <div className={`${modal && "show"} modal-container`}>
        <div className="modal">
          <h1>Agrega un contador</h1>
          <form onSubmit={handleSubmit}>
            <label>Nombre del contador</label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Ingresa nombre del contador"
              autoComplete="off"
              onChange={handleInputChange}
              value={name}
            />
            <button type="submit" className="botoncounter">
              Confirmar
            </button>
          </form>

          <button onClick={() => setModal(!modal)} className="close">
            Cerrar
          </button>
        </div>
      </div>

      <ul className="list">
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
      </ul>

      <footer>Numero de contadores: {listCounter.length}</footer>
    </>
  );
};
