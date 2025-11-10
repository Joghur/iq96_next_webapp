"use client";
import BottomNav from "@components/BottomNav";
import { Toaster } from "@components/ui/sonner";
import AuthContextProvider from "@lib/store/auth-context";
import { ThemeProvider } from "next-themes";
import { useEffect, useState } from "react";

export default function ClientLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const [theme, setTheme] = useState<string>("system");

    useEffect(() => {
        // Hent theme fra localStorage eller cookies på clienten
        const savedTheme = localStorage.getItem("theme") || "system";
        setTheme(savedTheme);
    }, []);

    return (
        <AuthContextProvider>
            <ThemeProvider
                attribute="data-theme"
                defaultTheme={theme}
                enableSystem
                disableTransitionOnChange
            >
                {children}
                <Toaster position="bottom-right" />
                <div className="z-40">
                    <BottomNav />
                </div>
            </ThemeProvider>
        </AuthContextProvider>
    );
}
