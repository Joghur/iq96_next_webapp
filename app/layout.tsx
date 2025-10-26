import "leaflet/dist/leaflet.css";
import "./globals.css";
import "./leaflet-override.css";

import BottomNav from "@components/BottomNav";
import type { Metadata } from "next";
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
	return (
		<html lang="en">
			<body>
				<AuthContextProvider>
					{children}
					<div className="z-40">
						<BottomNav />
					</div>
				</AuthContextProvider>
			</body>
		</html>
	);
};
export default RootLayout;
