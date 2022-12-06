import { setupWorker, rest } from "msw";

type Response = {
  name: string;
  age: number;
};

export const worker = setupWorker(
  rest.get<any, any, Response>("/get_user", (_, res, ctx) => {
    return res(
      ctx.delay(1000),
      ctx.json({
        name: "James",
        age: 40,
      })
    );
  })
);
