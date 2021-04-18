export type MainMenuItemType = {
  key: string;
  label: string;
};

export type MenuView = "main" | "content" | "full";

export type MenuType = {
  current: MainMenuItemType;
  history: MainMenuItemType[];
  view: MenuView;
  getCurrentItem: () => MainMenuItemType | undefined;
  menuHistoryPush: (item: MainMenuItemType) => void;
  menuHistoryPop: () => MainMenuItemType | void;
  menuSetCurrent: (item: MainMenuItemType) => void;
  menuSetView: (view: MenuView) => void;
};

export type MenuDispatchActions =
  | { type: "HISTORY_PUSH"; payload: { item: MainMenuItemType } }
  | { type: "HISTORY_POP" }
  | { type: "SET_CURRENT"; payload: { item: MainMenuItemType } }
  | { type: "SET_VIEW"; payload: { view: MenuView } };
