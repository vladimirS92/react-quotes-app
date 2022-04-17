import { useState } from 'react';

const useInput = (validateValue) => {
  const [value, setValue] = useState('');
  const [isTouched, setIsTouched] = useState(false);

  const isValueValid = validateValue(value);
  const isError = !isValueValid && isTouched;

  const valueChangeHandler = (event) => {
    setValue(event.target.value);
  };

  const valueBlurHandler = (event) => {
    setIsTouched(true);
  };

  const reset = () => {
    setValue('');
    setIsTouched(false);
  };

  return {
    value,
    isValueValid,
    isError,
    valueChangeHandler,
    valueBlurHandler,
    reset,
  };
};

export default useInput;
