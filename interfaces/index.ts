export type Hello = {
  world: string;
};

export type ProfileType = {
  name: string;
  url: string;
  distance: number;
  age: number;
  gender: "male" | "female";
  orientation: "male" | "female" | "both";
  bio: string;
  tags: string[];
};
