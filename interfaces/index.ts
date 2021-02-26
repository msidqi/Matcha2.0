export type Orientation = "heterosexual" | "homosexual" | "bisexual";
export type Gender = "male" | "female";

export type ProfileType = {
  userName: string;
  firstName: string;
  lastName: string;
  email: string;
  url: string;
  distance: number;
  age: number;
  gender: Gender;
  orientation: "male" | "female" | "both";
  bio: string;
  tags: string[];
};

export type ImagePreviewProps = {
  title: string;
  objectURL: string;
  size: string;
};

export type TextMessage = {
  sender: number;
  receiver: number;
  content: string;
  date: string | Date;
};
