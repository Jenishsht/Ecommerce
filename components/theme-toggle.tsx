"use client"

import * as React from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Moon } from "lucide-react";
import { themes } from "@/lib/themes";

export function ModeToggle() {
   // const { setTheme } = useTheme();
    const [activeTheme, setActiveTheme] = React.useState<string>(() => {
        if (typeof window !== "undefined") {
        return localStorage.getItem("theme") || "dark"; // default dark
        }
        return "dark";
    });


 React.useEffect(() => {
    const html = document.documentElement;

    // Remove all previous theme classes
    themes.forEach((t) => html.classList.remove(`theme-${t}`));
    html.classList.remove("dark");

    if (activeTheme === "dark") {
      html.classList.add("dark");
    } else {
      html.classList.add(`theme-${activeTheme}`);
    }

    // Persist in localStorage
    localStorage.setItem("theme", activeTheme);

  }, [activeTheme]);

  const applyTheme = (theme: string) => {
    setActiveTheme(theme);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" >
          <Moon className="h-5 w-5" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end">
        {themes.map((t) => (
          <DropdownMenuItem key={t} onClick={() => applyTheme(t)}>
            {t.charAt(0).toUpperCase() + t.slice(1)}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
