export type Hello = {
  world: string;
};

export type ProfileType = {
  userName: string;
  firstName: string;
  lastName: string;
  email: string;
  url: string;
  distance: number;
  age: number;
  gender: "male" | "female";
  orientation: "male" | "female" | "both";
  bio: string;
  tags: string[];
};
