import React, { FC } from "react";
interface TabProps {
  isActive: boolean,
  Icons: any
}

const TabNavigationButton: FC<TabProps> = ({ isActive, Icons }) => {
  return (
    <Icons width={"32"} height={"32"} fill={isActive ? "blue" : "#fff"} />
  );
};

export default TabNavigationButton;
