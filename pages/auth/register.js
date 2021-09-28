import React, { useState } from "react";
import { unAuthPage } from "../../middlewares/authorizationPage";
import Link from "next/link";

export async function getServerSideProps(ctx) {
  await unAuthPage(ctx);
  return { props: {} };
}
export default function Register() {
  const [fields, setFields] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [status, setStatus] = useState("");

  async function registerHandler(e) {
    e.preventDefault();

    setStatus("loading");

    const registerReq = await fetch("/api/auth/register", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(fields),
    });

    if (!registerReq.ok) return setStatus("error " + registerReq.status);

    setStatus("Success");
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
      <h1>Register</h1>
      <br />
      <form onSubmit={registerHandler.bind(this)}>
        <input type="text" name="name" onChange={fieldHandler.bind(this)} placeholder="Name" />
        <br />
        <input type="text" name="email" onChange={fieldHandler.bind(this)} placeholder="Email" />
        <br />
        <input type="text" name="password" onChange={fieldHandler.bind(this)} placeholder="Password" />
        <br />
        <br />
        <button type="submit">Register</button>
        <p>Status: {status}</p>
        <br />
        <Link href="/auth/login">
          <a href="!#">
            <button>Login</button>
          </a>
        </Link>
      </form>
    </div>
  );
}
