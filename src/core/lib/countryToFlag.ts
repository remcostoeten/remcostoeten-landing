import countryEmoji from "country-emoji";

export const convertToEmoji = (country: string): string => {
  const emoji = countryEmoji.flag(country) || "❓";
  return emoji;
};
