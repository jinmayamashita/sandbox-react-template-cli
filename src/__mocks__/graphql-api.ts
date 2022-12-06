import { setupWorker, graphql } from "msw";

type Response = {
  name: string;
  age: number;
};

export const worker = setupWorker(
  graphql.query<Response>("GetUser", (_, res, ctx) => {
    return res(
      ctx.delay(1000),
      ctx.data({
        name: "James",
        age: 40,
      })
    );
  })
);
