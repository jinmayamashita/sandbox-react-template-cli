import { setupWorker, rest } from "msw";

type Response = {
  name: string;
};

export const worker = setupWorker(
  rest.get<any, any, Response>("/user", (_, res, ctx) => {
    return res(
      ctx.delay(1000),
      ctx.json({
        name: "Foo",
      })
    );
  })
);
