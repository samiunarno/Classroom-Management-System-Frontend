/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import express, { Express } from "express";
import mongoose from "mongoose";
import serverless from "serverless-http";
import chalk from "chalk";
import app from "../dist/app"; // your compiled express app

const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/assignmentdb";

// ensure database connection only once
let isConnected = false;

async function connectDB() {
  if (isConnected) return;

  try {
    await mongoose.connect(MONGO_URI);
    isConnected = true;
    console.log(chalk.green("✅ MongoDB connected (Vercel)"));
  } catch (err) {
    console.error(chalk.red("❌ MongoDB Error:"), err);
  }
}

// list all express routes
function showAllRoutes(app: Express) {
  console.log(chalk.cyan.bold("\n📚 API Routes (Serverless):\n"));

  const routes: Array<{ path: string; methods: string }> = [];

  app._router?.stack?.forEach((middleware: any) => {
    if (middleware.route) {
      const methods = Object.keys(middleware.route.methods)
        .map(m => m.toUpperCase())
        .join(", ");
      routes.push({ path: middleware.route.path, methods });
    } 
    else if (middleware.name === "router" && middleware.handle?.stack) {
      middleware.handle.stack.forEach((handler: any) => {
        const route = handler.route;
        if (route) {
          const methods = Object.keys(route.methods)
            .map(m => m.toUpperCase())
            .join(", ");

          const basePath = middleware.regexp?.source
            .replace("^\\/", "/")
            .replace("\\/?(?=\\/|$)", "")
            .replace(/\\\//g, "/")
            .replace(/\$$/, "");

          routes.push({ path: `${basePath}${route.path}`, methods });
        }
      });
    }
  });

  routes.forEach(r => {
    console.log(chalk.green(`➡️ [${r.methods}] ${r.path}`));
  });

  console.log(chalk.magenta(`\nTotal Routes: ${routes.length}\n`));
}

// Vercel serverless handler
const handler = async (req: any, res: any) => {
  await connectDB();
  showAllRoutes(app);
  return serverless(app)(req, res);
};

export default handler;
export const config = {
  api: {
    bodyParser: false,
  },
};
