import {useState} from "react";

//establecemos el initialstate como un objeto vacio
export const useForm = (initialState = {}) => {

  const [values, setValues] = useState(initialState);

  const reset = () => { //reseteando el formulario

      setValues(initialState);
  }

                            //desectructuramos el e.target.name
  const handleInputChange = ({ target }) => {
    setValues({

      ...values,
      [target.name]: target.value,
    });
  };

  return [values, handleInputChange, reset];
};