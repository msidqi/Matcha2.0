import { Gender } from "@/interfaces";

export const getSexePreference = (
  gender: Gender,
  orientation: Gender | "both"
): "bi" | "gay" | "lesbian" | "straight" => {
  if (orientation === "both") return "bi";
  if (orientation === gender) return gender === "female" ? "lesbian" : "gay";
  return "straight";
};
