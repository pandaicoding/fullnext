import React, { useState } from "react";
import { authPage } from "../../middlewares/authorizationPage";
import Router from "next/router";
import Nav from "../../components/Nav";

export async function getServerSideProps(ctx) {
  const { token } = await authPage(ctx);

  const articleReq = await fetch("http://localhost:3000/api/articles", {
    headers: {
      Authorization: "Bearer " + token,
    },
  });

  const articles = await articleReq.json();

  return {
    props: {
      token,
      articles: articles.data,
    },
  };
}

export default function ArticleIndex(props) {
  const [articles, setArticles] = useState(props.articles);
  const [status, setStatus] = useState("");

  async function deleteHandler(id, e) {
    e.preventDefault();

    setStatus("Loading...");

    const { token } = props;

    const ask = confirm("Apakah data ini akan di hapus ?");
    if (ask) {
      const deleteArticle = await fetch("/api/articles/delete/" + id, {
        method: "DELETE",
        headers: {
          Authorization: "Bearer " + token,
        },
      });

      if (!deleteArticle.ok) return setStatus("error");

      const articlesFiltered = articles.filter((article) => {
        return article.id !== id && article;
      });

      setArticles(articlesFiltered);

      setStatus("Success");
    }
  }

  function updateHandler(id, e) {
    Router.push("/articles/update/" + id);
  }

  return (
    <div>
      <Nav />
      <h1>Page Article</h1>

      {articles.map((article) => (
        <div key={article.id}>
          <h3>{article.title}</h3>
          <p>{article.content}</p>
          <div>
            <button onClick={updateHandler.bind(this, article.id)}>Edit</button>
            <button onClick={deleteHandler.bind(this, article.id)}>Delete</button>
          </div>
          <hr />
        </div>
      ))}
    </div>
  );
}
