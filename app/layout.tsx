import "leaflet/dist/leaflet.css";
import "./globals.css";
import "./leaflet-override.css";

import BottomNav from "@components/BottomNav";
import type { Metadata } from "next";
import { cookies } from "next/headers";
import { ThemeProvider } from "next-themes";
import type { ReactNode } from "react";
import AuthContextProvider from "@/lib/store/auth-context";

export const revalidate = false;

interface Props {
	children: ReactNode;
}

export const metadata: Metadata = {
	title: "IQ96 web app",
	description: "Web app created by IQ96",
};

export const RootLayout = async ({ children }: Props) => {
	const cookieStore = cookies();
	const theme = (await cookieStore).get("next-theme")?.value || "system";
	console.log("theme", theme);

	return (
		<html lang="en" suppressHydrationWarning data-theme={theme}>
			<body>
				<AuthContextProvider>
					<ThemeProvider
						attribute="data-theme"
						defaultTheme="system"
						enableSystem
						disableTransitionOnChange
					>
						{children}
						<div className="z-40">
							<BottomNav />
						</div>
					</ThemeProvider>
				</AuthContextProvider>
			</body>
		</html>
	);
};
export default RootLayout;
