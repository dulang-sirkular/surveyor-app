"use client";

import { Button } from "@/components/ui/button";
import { useLanguage } from "@/lib/language-context";

export function LanguageToggle() {
  const { language, setLanguage } = useLanguage();

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={() => setLanguage(language === 'en' ? 'id' : 'en')}
      className="text-black hover:bg-[#a5e7ce] transition-colors"
    >
      {language.toUpperCase()}
    </Button>
  );
}