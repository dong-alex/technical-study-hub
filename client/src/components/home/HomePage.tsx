import React, { FunctionComponent, useEffect } from "react";
import { useGoogleAuth } from "../auth/GoogleAuthProvider";
import NavigationLayout from "../navigation/NavigationLayout";
import "../../sass/homePage.scss";

type HomePageProps = {};

const HomePage: FunctionComponent<HomePageProps> = () => {
  const { user, handleGoogleLogout } = useGoogleAuth();

  // useEffect(() => {
  //   if (user) {
  //     const profile = user.getBasicProfile();
  //     // use the window.gapi to handle the requests between signin and signout
  //     console.log("ID: " + profile.getId()); // Do not send to your backend! Use an ID token instead.
  //     console.log("Name: " + profile.getName());
  //     console.log("Image URL: " + profile.getImageUrl());
  //     console.log("Email: " + profile.getEmail()); // This is null if the 'email' scope is not present.
  //     console.log(profile);
  //   }
  // }, [user]);

  return (
    <NavigationLayout>
      <div className="home-page">
        <section id="user-info-container" className="middle">
          {user &&
            Object.entries(user).map((text: any, value: any) => <p>{text}</p>)}
        </section>
        <button onClick={handleGoogleLogout}>Logout</button>
      </div>
    </NavigationLayout>
  );
};

export default HomePage;
