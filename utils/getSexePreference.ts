export const getSexePreference = (
  gender: "male" | "female",
  orientation: "male" | "female" | "both"
): "bi" | "gay" | "lesbian" | "straight" => {
  if (orientation === "both") return "bi";
  if (orientation === gender) return gender === "female" ? "lesbian" : "gay";
  return "straight";
};
