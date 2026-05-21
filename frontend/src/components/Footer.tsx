import { Link } from "react-router-dom";
import logo from "../assests/logo.png";

const Footer = () => {
  return (
    <footer className="border-t bg-base-200 mt-20">
      <div className="max-w-7xl mx-auto footer p-10 text-base-content">
        <aside>
          <img src={logo} className="w-40" alt="logo" />

          <p className="mt-4 text-slate-600">
            Providing jobs for developers worldwide.
            <br />© {new Date().getFullYear()} Myrage.
          </p>
        </aside>

        <nav>
          <h6 className="footer-title">Company</h6>

          <Link className="link link-hover" to="/">
            Home
          </Link>

          <Link className="link link-hover" to="/jobs">
            Jobs
          </Link>

          <Link className="link link-hover" to="/about">
            About
          </Link>
        </nav>

        <nav>
          <h6 className="footer-title">Legal</h6>

          <a className="link link-hover">Terms</a>
          <a className="link link-hover">Privacy</a>
          <a className="link link-hover">Cookies</a>
        </nav>
      </div>
    </footer>
  );
};

export default Footer;
