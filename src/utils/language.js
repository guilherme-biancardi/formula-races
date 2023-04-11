const languages = {
  "en-us": () => import("../lang/en-us.json"),
};

export const useLanguage = async (language) => await languages[language]();
