import { Link } from "react-router-dom";

const Header = () => (
  <div className="d-flex justify-content-center p-3">
    <div style={{ fontSize: 24 }} className="font-weight-bold">
      <Link to="/">Hacker News 2.0</Link>
    </div>
  </div>
);

export default Header;