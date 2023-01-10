import { setupWorker, graphql } from "msw";

type Response = {
  name: string;
};

export const worker = setupWorker(
  graphql.query<Response>("GetUser", (_, res, ctx) => {
    return res(
      ctx.delay(1000),
      ctx.data({
        name: "Foo",
      })
    );
  })
);
