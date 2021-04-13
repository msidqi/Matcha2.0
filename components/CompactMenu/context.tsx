import * as React from "react";
import type { MenuType, MainMenuItemType } from "./types";
import { menuReducer } from "./reducer";

const initialMenu: MenuType = {
  current: {
    key: "",
    label: "",
  },
  history: [],
  view: "full",
  menuHistoryPush: () => {},
  menuHistoryPop: () => {},
  getCurrentItem: () => undefined,
  menuSetCurrent: () => {},
};

const MenuContext = React.createContext(initialMenu);

export const useMenu = () => React.useContext(MenuContext);

export const MenuProvider: React.FC = ({ children }) => {
  const [state, dispatch] = React.useReducer(menuReducer, initialMenu);

  const getCurrentItem = () => state.history[state.history.length - 1];

  const menuHistoryPush = (item: MainMenuItemType) =>
    dispatch({ type: "HISTORY_PUSH", payload: { item } });

  const menuHistoryPop = () => {
    const lastItem = state.history[state.history.length - 1];
    dispatch({ type: "HISTORY_POP" });
    return lastItem;
  };

  const menuSetCurrent = (item: MainMenuItemType) =>
    dispatch({ type: "SET_CURRENT", payload: { item } });

  return (
    <MenuContext.Provider
      value={{
        ...state,
        menuSetCurrent,
        getCurrentItem,
        menuHistoryPush,
        menuHistoryPop,
      }}
    >
      {children}
    </MenuContext.Provider>
  );
};
