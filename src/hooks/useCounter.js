import { useState, useEffect } from "react";
import { uid } from "uid";

export const useCounter = (initialState = 0, search) => {
  const listCounterInitial = localStorage.getItem("state")
    ? JSON.parse(localStorage.getItem("state"))
    : [];

  const [listCounter, setListCounter] = useState(listCounterInitial);

  const [counter, setCounter] = useState({
    id: "",
    name: "",
    counter: initialState,
    created: false,
    done: false,
  });

  const createCounter = (name) => {
    setCounter((prev) => ({
      ...prev,
      id: uid(),
      name,
      created: true,
      counter: initialState,
    }));
  };

  useEffect(() => {
    if (counter.created) {
      const counterExists = listCounter.find((item) => item.id === counter.id);

      setListCounter((prev) => {
        if (counterExists) {
          return prev.map((item) => (item.id === counter.id ? counter : item));
        } else {
          return [...prev, counter];
        }
      });
    }

    localStorage.setItem("state", JSON.stringify(listCounter));
  }, [counter]);

  const increment = (id) => {
    setCounter((prev) => {
      const counterExists = listCounter.find((item) => item.id === id);

      const { counter, ...rest } = counterExists;

      if (prev.id === id) {
        return {
          ...prev,
          counter: Math.min(prev.counter + 1, 20),
        };
      } else if (counterExists) {
        return {
          ...rest,
          counter: Math.min(counter + 1, 20),
        };
      } else {
        return prev;
      }
    });
  };

  const decrement = (id) => {
    setCounter((prev) => {
      const counterExists = listCounter.find((item) => item.id === id);

      const { counter, ...rest } = counterExists;

      if (prev.id === id) {
        return {
          ...prev,
          counter: Math.max(prev.counter - 1, 0),
        };
      } else if (counterExists) {
        return {
          ...rest,
          counter: Math.max(counter - 1, 0),
        };
      } else {
        return prev;
      }
    });
  };

  const handleDelete = (id) => {
    setListCounter((prev) => prev.filter((item) => item.id !== id));
  };

  const reset = () => {
    setCounter((prev) => ({
      ...prev,
      counter: initialState,
    }));
  };



  return {
    counter,
    listCounter,
    createCounter,
    setListCounter,
    increment,
    decrement,
    reset,
    handleDelete,
  }; //retornamos un objeto
};
