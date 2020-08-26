import React, { FunctionComponent } from "react";
import NavigationLayout from "../layout/NavigationLayout";
import { HomePageProps } from "../../types";

const HomePage: FunctionComponent<HomePageProps> = () => {
  return (
    <NavigationLayout>
      <div>
        <section id="user-info-container" className="middle">
          HOME PAGE
        </section>
      </div>
    </NavigationLayout>
  );
};

export default HomePage;
