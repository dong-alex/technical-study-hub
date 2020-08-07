import React, {
  useState,
  useEffect,
  useContext,
  createContext,
  FunctionComponent,
} from "react";
import axios from "axios";

interface AuthState {
  authenticated: boolean;
  user: any | null;
  loaded: boolean;
  handleGoogleLogout: () => void;
  handleGoogleLogin: () => void;
  GoogleAuth: any;
}

// pulled from the profileObj in react-google-login

axios.defaults.baseURL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:5000/api/v1"
    : "http://localhost:5000/api/v1";

axios.defaults.headers.post["Content-Type"] = "application/json";

export const GoogleAuthContext = createContext<AuthState>({
  authenticated: false,
  user: null,
  loaded: true,
  handleGoogleLogout: () => {},
  handleGoogleLogin: () => {},
  GoogleAuth: null,
});

export const GoogleAuthProvider: FunctionComponent = ({ children }) => {
  const [user, setUser] = useState<any | null>(null);
  const [loaded, setLoaded] = useState<boolean>(false);
  const [authenticated, setAuthenticated] = useState(false);

  // GoogleAuth object
  let GoogleAuth: any;

  useEffect(() => {
    gapi.load("auth2", () => {
      GoogleAuth = gapi.auth2.init({
        client_id:
          "35960364936-tpope03b2cvd778q4ntokamgh71kqd9i.apps.googleusercontent.com",
      });

      gapi.signin2.render("google-signin-button", {
        width: 250,
        height: 40,
        longtitle: true,
        theme: "dark",
        onsuccess: onSuccess,
        onfailure: onFailure,
      });

      GoogleAuth.isSignedIn.listen(handleSigninChange);
      GoogleAuth.currentUser.listen(handleUserChange);

      if (GoogleAuth.isSignedIn.get() == true) {
        console.log("Have previous login - signing in now");
        GoogleAuth.signIn();
      }

      setLoaded(false);
    });
  }, []);

  const handleGoogleLogout = () => {
    gapi.auth2
      .getAuthInstance()
      .signOut()
      .then(() => {
        console.log("Signed out");
        console.log(gapi.auth2.getAuthInstance().isSignedIn.get());
        setUser(null);
      });
  };

  const handleGoogleLogin = () => {
    if (gapi.auth2.getAuthInstance().isSignedIn.get() == true) {
      console.log("Logging in to previous google account");
      gapi.auth2.getAuthInstance().signIn();
    }
  };

  const handleSigninChange = (val: any) => {
    console.log("Sign in change: ", val);
    console.log(gapi.auth2.getAuthInstance().currentUser);
  };

  const handleUserChange = (user: any) => {
    console.log("User now: ", user);
    let profile = user.getBasicProfile();
    if (profile) {
      setUser({
        id: profile.getId(),
        name: profile.getName(),
        imageUrl: profile.getImageUrl(),
        email: profile.getEmail(),
      });
      axios.defaults.headers.common = {
        Authorization: `Bearer ${user.getAuthResponse().id_token}`,
      };
    } else {
      setUser(null);
    }
  };

  // returns a google user object
  const onSuccess = (user: any) => {
    if (user) {
      let profile = user.getBasicProfile();
      // technically a JWT token that can be used as bearer token
      console.log("ID_TOKEN: ", user.getAuthResponse().id_token);
      setUser({
        id: profile.getId(),
        name: profile.getName(),
        imageUrl: profile.getImageUrl(),
        email: profile.email,
      });
    } else {
      setUser(null);
    }
  };

  const onFailure = (err: any) => {
    console.log(err);
    console.log("There was an error");
  };

  useEffect(() => {
    console.log(user);
    setAuthenticated(user !== null);
  }, [user]);

  return (
    <GoogleAuthContext.Provider
      value={{
        user,
        authenticated,
        loaded,
        handleGoogleLogin,
        handleGoogleLogout,
        GoogleAuth,
      }}
    >
      {children}
    </GoogleAuthContext.Provider>
  );
};

export const useGoogleAuth = () => useContext(GoogleAuthContext);
