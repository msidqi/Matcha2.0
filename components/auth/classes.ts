// import { isValidDate } from "@/utils/date";

import { UserInput } from "@/components/auth/types";
import { Orientation, Gender } from "@/interfaces";

export interface IImage {
  imageBase64?: string;
  imageName: string;
  isProfilePicture: 1 | 0;
  url?: string;
  isDataBase64?: boolean;
}

export class Image implements IImage {
  imageBase64?: string;
  isDataBase64?: boolean;
  url?: string;
  imageName: string;
  isProfilePicture: 1 | 0;

  public get src(): string {
    if (this.imageBase64)
      return this.isDataBase64
        ? this.imageBase64
        : `data:image/jpeg;base64,${this.imageBase64}`;
    return this.url || "";
  }

  constructor({ imageBase64, imageName, isProfilePicture, url }: IImage) {
    if (imageBase64) {
      this.isDataBase64 = /^data:image\/(jpeg|jpg|png|gif);base64/.test(
        imageBase64
      );
      this.imageBase64 = imageBase64;
    }
    this.imageName = imageName;
    this.isProfilePicture = isProfilePicture;
    this.url = url;
  }
}

interface IUser {
  data: Partial<UserInput>;
}

export class User implements IUser {
  data: {
    id: number;
    firstName: string;
    lastName: string;
    userName: string;
    email: string;
    bio: string;
    images: Image[];
    gender: Gender;
    orientation: Orientation;
    experience: number;
    birthDate: Date | string;
    rankId?: number;
    tags: string[];
  };
  private _accessToken?: string;

  public get ProfileImageSrc() {
    const profileImage =
      this.data.images.find((elem) => elem.isProfilePicture === 1) ||
      this.data.images[0];
    if (profileImage) return profileImage.src;
    return "";
  }

  public get authorization() {
    return `Bearer ${this._accessToken || ""}`;
  }
  public set accessToken(v: string | undefined) {
    this._accessToken = v || "";
  }

  constructor(input: Partial<UserInput>) {
    this.data = {
      id: -1,
      firstName: "",
      lastName: "",
      userName: "",
      email: "",
      bio: "",
      gender: "male",
      orientation: "heterosexual",
      experience: 0,
      birthDate: "",
      images: [],
      tags: [],
    };
    this.addProperties(input);
  }

  addProperties({
    accessToken,
    images,
    birthDate,
    bio,
    ...rest
  }: Partial<UserInput>) {
    this.data = { ...this.data, ...rest };
    this.data.bio = bio ?? "";
    if (Array.isArray(images))
      this.data.images = images.map((img) => new Image(img));
    this.data.birthDate =
      birthDate instanceof Date ? birthDate : new Date(birthDate || "");
    if (typeof accessToken === "string") this.accessToken = accessToken;

    return this;
  }
}
