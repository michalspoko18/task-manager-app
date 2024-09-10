import React from "react";
import "../styles/Footer.scss"

const currentDate = new Date;
const year = currentDate.getFullYear();

function Footer() {

  return (
    <footer className="site-footer">
      <div className="container-fluid">
        <div className="row">
          <div className="d-flex justify-content-end">
            <div className="copyright">
              © Michał Walczak {year}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
