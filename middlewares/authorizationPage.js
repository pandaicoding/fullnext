import cookies from "next-cookies";

export function unAuthPage(ctx) {
  return new Promise((resolve) => {
    const myCookie = cookies(ctx);

    if (myCookie.token)
      return ctx.res
        .writeHead(302, {
          location: "/articles",
        })
        .end();
    return resolve("unAuthorized");
  });
}

export function authPage(ctx) {
  return new Promise((resolve) => {
    const myCookie = cookies(ctx);

    if (!myCookie.token)
      return ctx.res
        .writeHead(302, {
          location: "/auth/login",
        })
        .end();
    return resolve({
      token: myCookie.token,
    });
  });
}
