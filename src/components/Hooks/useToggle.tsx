import React, { useCallback,useState } from "react";
const useToggle = (initialValue:boolean): [boolean, () => void , (value:boolean) => void] => {
  const [toggle, setToggle] = useState(initialValue)
  const activeToggle = useCallback(()=>{
    setToggle(!toggle)
  },[toggle])
  return [
    toggle,
    activeToggle,
    setToggle
  ]
};

export default useToggle;

