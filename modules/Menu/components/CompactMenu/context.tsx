import * as React from "react";
import type {
  MenuType,
  MainMenuItemType,
  MenuView,
} from "@/modules/Menu/components/CompactMenu/types";
import { menuReducer } from "@/modules/Menu/components/CompactMenu/reducer";

const initialMenu: MenuType = {
  current: {
    key: "",
    label: "",
  },
  history: [],
  view: "content",
  menuHistoryPush: () => {},
  menuHistoryPop: () => {},
  getCurrentItem: () => undefined,
  menuSetCurrent: () => {},
  menuSetView: () => {},
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

  const menuSetView = (view: MenuView) =>
    dispatch({ type: "SET_VIEW", payload: { view } });

  return (
    <MenuContext.Provider
      value={{
        ...state,
        menuSetCurrent,
        getCurrentItem,
        menuHistoryPush,
        menuHistoryPop,
        menuSetView,
      }}
    >
      {children}
    </MenuContext.Provider>
  );
};
