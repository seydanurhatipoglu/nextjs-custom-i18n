type Locale = "en" | "tr";
type I18nType = {
  t: Translate;
  changeLocale: (locale: "tr" | "en") => void;
  currentLocale: Locale;
};
type Translate = (key: string) => string;
