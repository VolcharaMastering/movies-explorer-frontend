import React from "react";
import Promo from "./Promo/Promo.js";
import AboutProject from "./AboutProject/AboutProject.js";
import Techs from "./Techs/Techs.js";
// import Techs from "./Techs/Techs.js";
import Portfolio from "./Portfolio/Portfolio.js";
import AboutMe from "./AboutMe/AboutMe.js";

function Main(props) {

    return (
        <main className="main">
            <section className="promo">
                <Promo />
            </section>
            <section className="about-project">
                <AboutProject />
            </section>
            <section className="techs">
                <Techs />
            </section>
            <section className="about-me">
                <AboutMe />
            </section>
            <section className="portfolio">
                <Portfolio />
            </section>
        </main >
    );
}

export default Main;