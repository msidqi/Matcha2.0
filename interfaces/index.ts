import { Image } from "@/components/auth/classes";

export type Orientation = "heterosexual" | "homosexual" | "bisexual";
export type Gender = "male" | "female";

export interface OtherUserProfileType {
  age: number;
  bio: string | null;
  birthDate: string;
  experience: number;
  firstName: string;
  gender: string;
  id: number;
  images: (
    | {
        imageBase64: string;
        imageName: string;
        isProfilePicture: 1 | 0;
      }
    | Image
  )[];
  lastName: string;
  lastSeen: string;
  orientation: string;
  rank: string;
  tags: string[];
  userName: string;
  distance?: string /* maybe */;
}

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

export type OtherUser = {
  id: number;
  userName: string;
  image?: Image;
};

export type NotificationType =
  | {
      date: string;
      notified: {
        id: number;
        email: string;
        userName: string;
        firstName: string;
        lastName: string;
        experience: number;
        birthDate: string;
        lastSeen: string;
        bio: string | null;
        age: number;
      };
      notifier: {
        id: number;
        email: string;
        userName: string;
        firstName: string;
        lastName: string;
        experience: number;
        birthDate: string;
        lastSeen: string;
        bio: string | null;
        age: number;
      };
      type: "consult" | "match" | "like" | "unlike" | "message";
    }
  | { type: "empty" }
  | { type: "noNew" };
