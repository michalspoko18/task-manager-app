import React from "react";
import "../styles/Header.scss";
import { IconContext } from "react-icons/lib";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";

function Header() {
  return (
    <header className="site-header">
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-4">
            <a href="/" className="no-line logotype">
              MW
            </a>
          </div>
          <div className="col-md-8 social-icons-wrap">
            <IconContext.Provider value={{ color: "white", size: "1.25em" }}>
              <div className="social-icons text-end">
                <a href="//github.com/michalspoko18" target="_blank">
                  <FaGithub />
                </a>
                <a
                  href="//www.linkedin.com/in/micha%C5%82-walczak-899a88209/"
                  target="_blank"
                >
                <FaLinkedin/>
                </a>
              </div>
            </IconContext.Provider>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
