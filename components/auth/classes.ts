// import { isValidDate } from "@/utils/date";

import { UserInput } from "@/components/auth/types";

export interface IImage {
  imageBase64?: string;
  imageName: string;
  isProfilePicture: 1 | 0;
  url?: string;
}

export class Image implements IImage {
  imageBase64?: string;
  url?: string;
  imageName: string;
  isProfilePicture: 1 | 0;

  public get src(): string {
    return this.imageBase64
      ? `data:image/jpeg;base64,${this.imageBase64}`
      : this.url
      ? this.url
      : "";
  }

  constructor({ imageBase64, imageName, isProfilePicture, url }: IImage) {
    this.imageBase64 = imageBase64;
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
    firstName: string;
    lastName: string;
    userName: string;
    email: string;
    bio: string;
    images: Image[];
    gender: "male" | "female";
    orientation: "heterosexual" | "homosexual" | "bisexual";
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
    ...rest
  }: Partial<UserInput>) {
    this.data = { ...this.data, ...rest };
    this.data.images = images?.map((img) => new Image(img)) || [];
    this.data.birthDate =
      birthDate instanceof Date ? birthDate : new Date(birthDate || "");
    if (typeof accessToken === "string") this.accessToken = accessToken;

    return this;
  }
}
