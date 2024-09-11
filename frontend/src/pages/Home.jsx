import React from "react";
import "../styles/Home.scss";
import Header from "../components/Header";
import Footer from "../components/Footer";

function Home() {
  return (
    <div className="b-home">
    <Header />
    <div className="b-home-choose">
      <div className="space"></div>
      <div className="container">
        <div className="row d-block d-md-flex align-items-center mx-auto">
          <div className="b-home-choose__inner justify-content-center">
            <a href="/weatherapp">
              <div className="b-home-choose__app btn-primary"><span>Weather</span></div>
            </a>
            <a href="/footballapp">
              <div className="b-home-choose__app btn-primary"><span>Football</span></div>
            </a>
            <a href="/taskmanager">
              <div className="b-home-choose__app btn-primary"><span>Task Manager</span></div>
            </a>
          </div>
        </div>
      </div>
    </div>
    <Footer />
    </div>
  );
}

export default Home;
