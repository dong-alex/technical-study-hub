import React, {
  useState,
  useEffect,
  useContext,
  createContext,
  FunctionComponent,
} from "react";
import axios from "axios";
import GoogleLogin, {
  GoogleLoginResponse,
  GoogleLoginResponseOffline,
  GoogleLogout,
} from "react-google-login";

interface AuthState {
  authenticated: boolean;
  user: User | null;
  LoginButton: React.FC;
  LogoutButton: React.FC;
}

// pulled from the profileObj in react-google-login
interface User {
  googleId: string;
  imageUrl: string;
  email: string;
  name: string;
}

export type LoginResponse = GoogleLoginResponse | GoogleLoginResponseOffline;
axios.defaults.baseURL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:5000/api/v1"
    : "http://localhost:5000/api/v1";

axios.defaults.headers.post["Content-Type"] = "application/json";

export const GoogleAuthContext = createContext<AuthState>({
  authenticated: false,
  user: null,
  LoginButton: () => <div></div>,
  LogoutButton: () => <div></div>,
});

export const GoogleAuthProvider: FunctionComponent = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    setAuthenticated(user !== null);

    return () => {
      setAuthenticated(false);
    };
  }, [user]);

  const handleLoginSuccess = (
    response: GoogleLoginResponse | GoogleLoginResponseOffline
  ) => {
    if ("googleId" in response) {
      console.log(response.getAuthResponse().id_token);
      console.log(response.getId());

      // destructure profile for typing
      const { email, googleId, imageUrl, name } = response.profileObj;
      setUser({
        name,
        email,
        imageUrl,
        googleId,
      });
    }

    console.log("Google success login");
  };

  const handleLoginFailure = (response: GoogleLoginResponse) => {
    console.log("Google failed login");
  };

  const handleLogoutSuccess = () => {
    console.log("Google success logout");
    setUser(null);
  };

  const LoginButton = () => {
    return (
      <GoogleLogin
        clientId="35960364936-tpope03b2cvd778q4ntokamgh71kqd9i.apps.googleusercontent.com"
        isSignedIn={true}
        accessType="online"
        onSuccess={handleLoginSuccess}
        onFailure={handleLoginFailure}
        responseType="id_token"
      />
    );
  };

  const LogoutButton = () => {
    return (
      <GoogleLogout
        clientId="35960364936-tpope03b2cvd778q4ntokamgh71kqd9i.apps.googleusercontent.com"
        onLogoutSuccess={handleLogoutSuccess}
      />
    );
  };

  return (
    <GoogleAuthContext.Provider
      value={{
        user,
        authenticated,
        LoginButton,
        LogoutButton,
      }}
    >
      {children}
    </GoogleAuthContext.Provider>
  );
};

export const useGoogleAuth = () => useContext(GoogleAuthContext);
