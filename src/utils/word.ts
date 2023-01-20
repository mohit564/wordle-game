import { words } from "../constants";

export const getRandomWord = (): string => {
  return words[Math.floor(Math.random() * words.length)].toUpperCase();
};
