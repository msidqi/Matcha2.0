export const formatDistance = (distance: number) =>
  distance > 0.1 ? distance.toFixed(2) : 0.1;
