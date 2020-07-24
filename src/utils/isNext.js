export const isNextElement = (others = []) => {
  return !others.every((item) => !item) ? ", " : ".";
};
