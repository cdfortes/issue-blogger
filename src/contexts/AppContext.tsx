
import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

type Theme = "light" | "dark";
type Language = "pt" | "en";

interface AppContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  fontSize: number;
  increaseFontSize: () => void;
  decreaseFontSize: () => void;
  resetFontSize: () => void;
  theme: Theme;
  toggleTheme: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
};

interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [language, setLanguage] = useState<Language>("pt"); // PT como padrão
  const [fontSize, setFontSize] = useState(100); // 100% como padrão
  const [theme, setTheme] = useState<Theme>(() => {
    // Verificar preferência do usuário ou usar o tema claro como padrão
    if (typeof window !== "undefined") {
      const savedTheme = localStorage.getItem("theme") as Theme;
      return savedTheme || (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
    }
    return "light";
  });

  // Aplicar o tamanho da fonte no documento
  useEffect(() => {
    document.documentElement.style.fontSize = `${fontSize}%`;
  }, [fontSize]);

  // Aplicar o tema no documento
  useEffect(() => {
    const rootElement = document.documentElement;
    if (theme === "dark") {
      rootElement.classList.add("dark");
    } else {
      rootElement.classList.remove("dark");
    }
    // Salvar preferência do usuário
    localStorage.setItem("theme", theme);
  }, [theme]);

  const increaseFontSize = () => {
    setFontSize((prevSize) => Math.min(prevSize + 10, 150)); // Máximo 150%
  };

  const decreaseFontSize = () => {
    setFontSize((prevSize) => Math.max(prevSize - 10, 80)); // Mínimo 80%
  };

  const resetFontSize = () => {
    setFontSize(100);
  };

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  return (
    <AppContext.Provider
      value={{
        language,
        setLanguage,
        fontSize,
        increaseFontSize,
        decreaseFontSize,
        resetFontSize,
        theme,
        toggleTheme,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

// Hook para facilitar tradução
export const useTranslation = () => {
  const { language } = useAppContext();
  
  const t = (section: string, key: string): string => {
    try {
      const { translations } = require("../utils/translations");
      return translations[section][key][language] || `[Missing translation: ${section}.${key}.${language}]`;
    } catch (error) {
      console.error("Translation error:", error);
      return `[Error: ${section}.${key}]`;
    }
  };
  
  return { t, language };
};
