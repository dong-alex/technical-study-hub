import React, { FunctionComponent, useEffect } from "react";
import NavigationLayout from "../layout/NavigationLayout";
import "../../sass/homePage.scss";

type HomePageProps = {};

const HomePage: FunctionComponent<HomePageProps> = () => {
  return (
    <NavigationLayout>
      <div className="home-page">
        <section id="user-info-container" className="middle">
          HOME PAGE
        </section>
      </div>
    </NavigationLayout>
  );
};

export default HomePage;
