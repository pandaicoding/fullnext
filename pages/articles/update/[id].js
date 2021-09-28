import React, { useState } from "react";
import { authPage } from "../../../middlewares/authorizationPage";
import Router from "next/router";

export async function getServerSideProps(ctx) {
  const { token } = await authPage(ctx);

  const { id } = ctx.query;

  const articleReq = await fetch("http://localhost:3000/api/articles/detail/" + id, {
    method: "GET",
    headers: {
      Authorization: "Bearer " + token,
    },
  });

  const res = await articleReq.json();

  return {
    props: {
      token,
      article: res.data,
    },
  };
}

export default function ArticleUpdate(props) {
  const { article } = props;

  const [fields, setFields] = useState({
    title: article.title,
    content: article.content,
  });

  const [status, setStatus] = useState("");

  async function updateHandler(e) {
    e.preventDefault();

    setStatus("Loading...");

    const { token } = props;

    const update = await fetch("/api/articles/update/" + article.id, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify(fields),
    });

    if (!update.ok) return setStatus("error");

    const res = await update.json();

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
      <h1>Update a Article</h1>

      <form onSubmit={updateHandler.bind(this)}>
        <input
          type="text"
          onChange={fieldHandler.bind(this)}
          name="title"
          defaultValue={article.title}
          placeholder="Title"
        />
        <br />
        <textarea
          name="content"
          onChange={fieldHandler.bind(this)}
          id=""
          cols="30"
          rows="10"
          defaultValue={article.content}
          placeholder="content"
        ></textarea>
        <br />
        <button type="submit">Update Article</button>
        <br />
        <p>Status: {status}</p>
      </form>
    </div>
  );
}
