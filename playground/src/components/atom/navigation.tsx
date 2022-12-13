import { PropsWithChildren } from "react";
import { Link } from "wouter";

const Menu = ({ to, children }: PropsWithChildren<{ to: string }>) => {
  return (
    <div>
      <Link to={to}>
        <a>{children}</a>
      </Link>
    </div>
  );
};

export default () => {
  return (
    <div
      style={{
        position: "fixed",
        bottom: 0,
        right: 0,
        padding: 10,
        margin: 10,
        borderRadius: 4,
        boxShadow:
          "rgba(27, 31, 35, 0.04) 0px 1px 0px, rgba(255, 255, 255, 0.25) 0px 1px 0px inset",
        backgroundColor: "#fff",
        textAlign: "left",
      }}
    >
      <Menu to="/user">RESTful API example</Menu>
      <Menu to="/secret">Auth page example (You need to login first)</Menu>
      <Menu to="/login">Log in page</Menu>
      <Menu to="/store">Store example</Menu>
    </div>
  );
};
