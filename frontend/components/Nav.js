import Link from "next/link";
import NavStyles from "./styles/NavStyles";

const Nav = () => (
  <NavStyles>
    <Link href="/">
      <a>Dashboard</a>
    </Link>
    <Link href="/teams">
      <a>Teams</a>
    </Link>
    <Link href="/competitions">
      <a>Competitions</a>
    </Link>
    <Link href="/competitors">
      <a>Competitors</a>
    </Link>
    <Link href="/anomalies">
      <a>Anomalies</a>
    </Link>
  </NavStyles>
);

export default Nav;
