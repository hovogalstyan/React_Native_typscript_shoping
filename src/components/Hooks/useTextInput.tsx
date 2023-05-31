import React, { useCallback, useState } from "react";

const UseTextInput = () => {
  const [defaultValue, setDefaultValue] = useState<string>("");
  const onChangeText = useCallback((text:string) => {
    setDefaultValue(text);
  }, []);
  return {
    defaultValue,
    setDefaultValue,
    onChangeText
  }
};

export default UseTextInput;
