import React, { useState, createContext } from "react";

const s = {
	matric: undefined,
	name: undefined,
	class: undefined,
	current_progress: undefined,
	avatar_url: undefined,
	stars: undefined,
	medals: undefined
};

export const UserContext = createContext();

export const UserProvider = props => {
	const [student, setStudent] = useState(s);

	return (
		<UserContext.Provider value={{ student: student, setStudent: setStudent }}>
			{props.children}
		</UserContext.Provider>
	);
};
