import React, { useState, createContext } from "react";

const defaultUser = {
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
	const [currentUser, setCurrentUser] = useState(defaultUser);

	const user = {
		...currentUser,
		isAuthenticated: () => {
			/* 1. Check current state */
			if (currentUser.matric) return true;

			/* 2. Check browser storage */
			if (localStorage.getItem("currentUser")) {
				setCurrentUser(JSON.parse(localStorage.getItem("currentUser")));
				return true;
			}

			/* 3. Confirm not authenticated */
			return false;
		},
		login: (newUser) => {
			/* 1. Set current state */
			setCurrentUser(newUser);

			/* 2. Set browser storage */
			localStorage.setItem("currentUser", JSON.stringify(newUser));
		},
		logout: () => {
			/* 1. Reset current state */
			setCurrentUser(defaultUser);

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
