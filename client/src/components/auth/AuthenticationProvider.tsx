import React, {
	useState,
	useEffect,
	useContext,
	createContext,
	FunctionComponent,
} from "react";

import axios from "axios";
import Cookies from "js-cookie";

// type AuthState = {
//   authenticated: boolean;
//   user: any | null;
//   loaded: boolean;
//   onRegister: (userData: UserFormData) => Promise<boolean | Error>;
//   onLogin: (loginData: LoginData) => Promise<string | Error>;
//   onLogout: () => boolean | Error;
// };

type LoginData = {
	email: string;
	password: string;
};

type UserFormData = {
	name: string;
	email: string;
	password: string;
};

export const AuthenticationContext = createContext<any | null>(null);

axios.defaults.baseURL =
	process.env.NODE_ENV === "development"
		? "http://localhost:5000"
		: "http://localhost:5000";

axios.defaults.headers.post["Content-Type"] = "application/json";

const getToken = (): string | null => {
	// get token and see the expiry - require login if its expired
	const token = Cookies.get("jwtToken");
	return token || null;
};

export const AuthenticationProvider: FunctionComponent = ({ children }) => {
	const [token, setToken] = useState<string | null>(getToken());
	const [user, setUser] = useState<any | null>(null);
	const [loaded, setLoaded] = useState<boolean>(false);
	const [authenticated, setAuthenticated] = useState(false);

	useEffect(() => {
		// if there is a token - fetch user information with this
		const fetchUser = async () => {
			const {
				data: { user },
			} = await axios.get("/auth/v1/profile");
			console.log(user);
			if (user) {
				setUser(user);
			} else {
				console.log("Cookie found but no user!");
			}
		};
		setLoaded(false);

		if (token) {
			console.log("Found a token in the cookies!");
			axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
			fetchUser();
		} else {
			delete axios.defaults.headers.common["Authorization"];
		}
		setLoaded(true);
	}, [token]);

	useEffect(() => {
		setAuthenticated(user !== null);
	}, [user]);

	// test effect
	useEffect(() => {
		if (authenticated) {
			console.log("You are authenticated under: ", user.name);
		} else {
			console.log("You are currently not authenticated. Please login.");
		}
	}, [authenticated]);

	const onLogin = async ({ email, password }: LoginData) => {
		// TODO: more proper validation
		if (!email || !password) {
			throw new Error("Invalid parameters - please try again.");
		}

		try {
			const {
				data: { user, token },
			} = await axios.post("/auth/v1/login", {
				email,
				password,
			});

			if (!user || !token) {
				throw new Error("Critical error in the API. Contact admin.");
			}

			// set the token into the cookies
			Cookies.set("jwtToken", token, { expires: 1 });
			setToken(token);
			setUser(user);
			return token;
		} catch (err) {
			throw err;
		}
	};

	const onLogout = () => {
		Cookies.remove("jwtToken");
		setToken(null);
		setUser(null);
		return true;
	};

	const onRegister = async (userData: UserFormData) => {
		try {
			const { statusCode, data, message } = await axios.post(
				"/auth/v1/register",
				userData
			);

			// succesful transaction - require login after with the information
			return statusCode === 200 && data ? true : false;
		} catch (err) {
			throw err;
		}
	};

	return (
		<AuthenticationContext.Provider
			value={{
				user,
				authenticated,
				loaded,
				onRegister,
				onLogin,
				onLogout,
			}}
		>
			{children}
		</AuthenticationContext.Provider>
	);
};

export const useAuthProvider = () => useContext(AuthenticationContext);
