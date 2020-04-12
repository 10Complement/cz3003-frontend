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
		isAuthenticated: () => (currentUser.matric ? true : false),
		login: (newUser) => setCurrentUser(newUser),
		logout: () => setCurrentUser(defaultUser),
	};

	return (
		<UserContext.Provider value={{ user }}>
			{props.children}
		</UserContext.Provider>
	);
};
