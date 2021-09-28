import React, { useState, useEffect } from "react";
import Cookie from "js-cookie";
import Router from "next/router";
import { unAuthPage } from "../../middlewares/authorizationPage";
import Link from "next/link";

export async function getServerSideProps(ctx) {
  await unAuthPage(ctx);
  return { props: {} };
}

export default function Login() {
  const [fields, setFields] = useState({
    email: "",
    password: "",
  });

  const [status, setStatus] = useState("");

  useEffect(() => {
    const token = Cookie.get("token");
    if (token) return Router.push("/articles");
  }, []);

  async function loginHandler(e) {
    e.preventDefault();

    setStatus("loading");

    const loginReq = await fetch("/api/auth/login", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(fields),
    });

    if (!loginReq.ok) return setStatus("error " + loginReq.status);

    const loginRes = await loginReq.json();

    setStatus("Success");

    Cookie.set("token", loginRes.token);

    Router.push("/articles");
  }

  function fieldHandler(e) {
    const name = e.target.getAttribute("name");

    setFields({
      ...fields,
      [name]: e.target.value,
    });
  }

  return (
    <div>
      <h1>Login</h1>
      <br />
      <form onSubmit={loginHandler.bind(this)}>
        <input type="text" name="email" onChange={fieldHandler.bind(this)} placeholder="Email" />
        <br />
        <input type="text" name="password" onChange={fieldHandler.bind(this)} placeholder="Password" />
        <br />
        <br />
        <button type="submit">Login</button>
        <br />
        <p>Status: {status}</p>
        <br />
        <Link href="/auth/register">
          <a href="!#">
            <button>Register</button>
          </a>
        </Link>
      </form>
    </div>
  );
}
