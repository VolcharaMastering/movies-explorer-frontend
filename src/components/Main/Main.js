import React from "react";

import Promo from "./Promo/Promo.js";
import AboutProject from "./AboutProject/AboutProject.js";
import Techs from "./Techs/Techs.js";
import Portfolio from "./Portfolio/Portfolio.js";
import AboutMe from "./AboutMe/AboutMe.js";

function Main(props) {
  const projectRef = React.useRef(null);
  const techsRef = React.useRef(null);
  const aboutMeRef = React.useRef(null);

  const focusOnRef = (selectedRef) => {
    window.scrollTo({
      top: selectedRef.current.offsetTop,
      behavior: "smooth",
    });
  };

  return (
    <main className="main">
      <section className="promo">
        <Promo
          focusOnRef={focusOnRef}
          projectRef={projectRef}
          techsRef={techsRef}
          aboutMeRef={aboutMeRef}
        />
      </section>
      <section ref={projectRef} className="about-project">
        <AboutProject />
      </section>
      <section ref={techsRef} className="techs">
        <Techs />
      </section>
      <section ref={aboutMeRef} className="about-me">
        <AboutMe />
      </section>
      <section className="portfolio">
        <Portfolio />
      </section>
    </main>
  );
}

export default Main;
