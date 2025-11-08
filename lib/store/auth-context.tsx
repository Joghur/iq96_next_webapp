"use client";

import { auth } from "@lib/firebase";
import { useDocumentUser } from "@lib/hooks/useFirestore";
import {
	sendPasswordResetEmail,
	signInWithEmailAndPassword,
	signOut,
	type User,
} from "firebase/auth";
import type { DocumentData } from "firebase/firestore";
import { createContext, type ReactNode } from "react";
import type { Member } from "schemas/member";

interface AuthContextValues {
	authUser: User | null | undefined;
	documentUser: Member | null | undefined;
	loading: boolean;
	emailLoginHandler: (
		email: string | undefined,
		password: string | undefined,
	) => Promise<void>;
	logout: () => void;
	resetPassword: (email: string) => Promise<void>;
	updatingDoc: (id: string, document: DocumentData) => Promise<void>;
}

export const authContext = createContext<AuthContextValues>({
	authUser: null,
	documentUser: null,
	loading: false,
	emailLoginHandler: async () => {},
	logout: () => {},
	resetPassword: async () => {},
	updatingDoc: async () => {},
});

interface AuthContextProviderProps {
	children: ReactNode;
}

export default function AuthContextProvider({
	children,
}: AuthContextProviderProps) {
	const [authUser, documentUser, loading, updatingDoc] = useDocumentUser();

	const emailLoginHandler = async (email?: string, password?: string) => {
		if (!email || !password) {
			return;
		}
		try {
			await signInWithEmailAndPassword(auth, email, password);
		} catch (error) {
			console.error("Logout error: ", error);
			alert("Der er skete en fejl under login!");
		}
	};

	const logout = async () => {
		await signOut(auth);
	};

	const resetPassword = async (email: string) => {
		try {
			await sendPasswordResetEmail(auth, email);
		} catch (error) {
			console.error("Logout error: ", error);
			alert("Der er skete en fejl under reset kodeord!");
		}
	};

	const values = {
		authUser,
		documentUser,
		loading,
		emailLoginHandler,
		logout,
		resetPassword,
		updatingDoc,
	};

	return <authContext.Provider value={values}>{children}</authContext.Provider>;
}
