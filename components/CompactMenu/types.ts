export type MainMenuItemType = {
  key: string;
  label: string;
};

export type MenuType = {
  current: MainMenuItemType;
  history: MainMenuItemType[];
  view: "main" | "content" | "full";
  getCurrentItem: () => MainMenuItemType | undefined;
  menuHistoryPush: (item: MainMenuItemType) => void;
  menuHistoryPop: () => MainMenuItemType | void;
  menuSetCurrent: (item: MainMenuItemType) => void;
};

export type MenuDispatchActions =
  | { type: "HISTORY_PUSH"; payload: { item: MainMenuItemType } }
  | { type: "HISTORY_POP" }
  | { type: "SET_CURRENT"; payload: { item: MainMenuItemType } };
