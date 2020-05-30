import { useState } from "react";

export const useForm = (calback, initialState) => {
  const [fromData, setFromData] = useState(initialState);
  const onChange = (e) =>
    setFromData({ ...fromData, [e.target.name]: e.target.value });
  const onSubmit = (e) => {
    e.preventDefault();
    calback();
  };
  return {
    onChange,
    onSubmit,
    fromData,
  };
};
