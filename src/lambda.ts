import { NestFactory } from "@nestjs/core";
import { Callback, Context, Handler } from "aws-lambda";
import serverlessExpress from "@vendia/serverless-express";
import tracer from 'dd-trace';
import { AppModule } from "./app.module";

let server: Handler

if (process.env.NODE_ENV === 'production') {
  tracer.init({
    profiling: true,
    runtimeMetrics: true,
    env: process.env.NODE_ENV,
  });
}

async function bootstrap(): Promise<Handler> {
  const app = await NestFactory.create(AppModule);
  await app.init();

  const expressApp = app.getHttpAdapter().getInstance();
  return serverlessExpress({ app: expressApp });
}

export const handler: Handler = async (event: any, context: Context, callback: Callback) => {
  event.requestContext = event.requestContext || {};

  console.info("EVENT: ", JSON.stringify(event, null, 2));

  server = server ?? (await bootstrap());
  return server(event, context, callback);
};