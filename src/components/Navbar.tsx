import { useState } from "react";
import { useTranslation } from "react-i18next";
import ReactCountryFlag from "react-country-flag";

export const Navbar = () => {
  const [open, setOpen] = useState(false);
  const { i18n } = useTranslation();

  // 🔥 düzgün
  const currentLang = i18n.language.split("-")[0];

  const changeLang = (lang: "az" | "en" | "ru") => {
    i18n.changeLanguage(lang);
    localStorage.setItem("i18nextLng", lang);
    setOpen(false);
  };

  // 🔥 mapping (clean)
  const langToCountry: Record<string, string> = {
    az: "AZ",
    en: "GB",
    ru: "RU",
  };

  return (
<div className="w-full h-16 bg-white border-b border-gray-600/40 flex items-center justify-end px-6">
  
  <div className="flex items-center gap-4">
    
    {/* 🌍 Language */}
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="w-12 h-12 flex items-center justify-center rounded-2xl border border-gray-200 bg-white hover:bg-gray-50 transition shadow-sm"
      >
        <ReactCountryFlag
          countryCode={langToCountry[currentLang]}
          svg
          className="w-7 h-7"
        />
      </button>

      {open && (
        <div className="absolute right-0 mt-3 w-56 bg-white border border-gray-200 rounded-2xl shadow-xl overflow-hidden z-50">
          
          <button
            onClick={() => changeLang("az")}
            className="w-full flex items-center gap-4 px-5 py-3 hover:bg-gray-50 transition"
          >
            <ReactCountryFlag countryCode="AZ" svg className="w-7 h-7" />
            <span className="text-base font-medium">Azerbaijani</span>
          </button>

          <button
            onClick={() => changeLang("en")}
            className="w-full flex items-center gap-4 px-5 py-3 hover:bg-gray-50 transition"
          >
            <ReactCountryFlag countryCode="GB" svg className="w-7 h-7" />
            <span className="text-base font-medium">English</span>
          </button>

          <button
            onClick={() => changeLang("ru")}
            className="w-full flex items-center gap-4 px-5 py-3 hover:bg-gray-50 transition"
          >
            <ReactCountryFlag countryCode="RU" svg className="w-7 h-7" />
            <span className="text-base font-medium">Russian</span>
          </button>

        </div>
      )}
    </div>

    {/* 🌙 Theme */}
    <button className="w-12 h-12 flex items-center justify-center rounded-2xl border border-gray-200 bg-white hover:bg-gray-50 transition shadow-sm text-xl">
      🌙
    </button>

  </div>
</div>
  );
};

