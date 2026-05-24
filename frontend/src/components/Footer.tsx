import { Link } from "react-router-dom";
import logo from "../assests/logo.png";

const Footer = () => {
  return (
    <footer className="border-t bg-base-100">
      <div className="max-w-7xl mx-auto footer sm:footer-horizontal text-base-content px-6 py-12">
        <aside className="space-y-4">
          <img src={logo} className="w-40" alt="logo" />

          <p className="text-slate-600 leading-relaxed">
            Myrage Industries Ltd.
            <br />
            Providing jobs for you.
            <br />
            Copyright &copy; {new Date().getFullYear()}
            <br />
            Designed by{" "}
            <span className="text-primary font-medium">Talabi Adeyinka</span>
          </p>
        </aside>

        <nav>
          <h6 className="footer-title">Services</h6>

          <a className="link link-hover">Branding</a>
          <a className="link link-hover">Design</a>
          <a className="link link-hover">Marketing</a>
          <a className="link link-hover">Advertisement</a>
        </nav>

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

          <a className="link link-hover">Terms of use</a>
          <a className="link link-hover">Privacy policy</a>
          <a className="link link-hover">Cookie policy</a>
        </nav>
      </div>
    </footer>
  );
};

export default Footer;
