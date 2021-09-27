import { authPage } from "../../middlewares/authorizationPage";

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
      articles: articles.data,
    },
  };
}

export default function ArticleIndex(props) {
  return (
    <div>
      <h1>Page Article</h1>

      {props.articles.map((article) => (
        <div key={article.id}>
          <h3>
            {article.title} - {article.id}
          </h3>
          <p>{article.content}</p>
          <div>
            <button>Edit</button>
            <button>Delete</button>
          </div>
          <hr />
        </div>
      ))}
    </div>
  );
}
