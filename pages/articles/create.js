import React, { useState } from "react";
import { authPage } from "../../middlewares/authorizationPage";
import Router from "next/router";

export async function getServerSideProps(ctx) {
  const { token } = await authPage(ctx);

  return {
    props: {
      token,
    },
  };
}

export default function ArticleCreate(props) {
  const [fields, setFields] = useState({
    title: "",
    content: "",
  });

  const [status, setStatus] = useState("");

  async function createHandler(e) {
    e.preventDefault();

    setStatus("Loading...");

    const { token } = props;

    const create = await fetch("/api/articles/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify(fields),
    });

    if (!create.ok) return setStatus("error");

    const res = await create.json();

    setStatus("Success");

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
      <h1>Create a Article</h1>

      <form onSubmit={createHandler.bind(this)}>
        <input type="text" onChange={fieldHandler.bind(this)} name="title" placeholder="Title" />
        <br />
        <textarea
          name="content"
          onChange={fieldHandler.bind(this)}
          id=""
          cols="30"
          rows="10"
          placeholder="content"
        ></textarea>
        <br />
        <button type="submit">Create Article</button>
        <br />
        <p>Status: {status}</p>
      </form>
    </div>
  );
}
