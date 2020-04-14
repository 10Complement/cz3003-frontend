import React, { useState, createContext } from "react";

const blankUser = {
	matric: undefined,
	name: undefined,
	class: undefined,
	current_progress: undefined,
	avatar_url: undefined,
	stars: undefined,
	medals: undefined,
};

export const UserContext = createContext();

export const UserProvider = (props) => {
	const browser = localStorage.getItem("currentUser");
	const [currentUser, setCurrentUser] = useState(
		browser ? JSON.parse(browser) : blankUser
	);

	const user = {
		...currentUser,
		isAuthenticated: () => {
			if (currentUser.matric) return true;
			else return false;
		},
		login: (newUser) => {
			/* 1. Set current state */
			setCurrentUser(newUser);

			/* 2. Set browser storage */
			localStorage.setItem("currentUser", JSON.stringify(newUser));
		},
		logout: () => {
			/* 1. Reset current state */
			setCurrentUser(blankUser);

			/* 2. Reset browser storage */
			localStorage.removeItem("currentUser");
		},
	};

	return (
		<UserContext.Provider value={{ user }}>
			{props.children}
		</UserContext.Provider>
	);
};
