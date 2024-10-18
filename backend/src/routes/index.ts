import { Application } from "express";

import helloRoutes from "./hello";
import authRoutes from "./auth";
import userPreferenceRoutes from "./userpreference.route";
import userProfileRoutes from "./userprofile.route";
import jobRoutes from "./job.route";
import jobApplicationRoute from "./jobapplication.route";
import companyRoutes from "./company.route";
import adminRoutes from './adminjob.route';
import manageNotificationRoutes from './notification.route';

import { config } from "../config";

const { API_VERSION } = config;

/*
 * Routes registration
 */
const routes = (app: Application) => {
  const apiPrefix = `/api/${API_VERSION}`;

  // use the same route for both /hello and /api/v1/hello
  app.use(apiPrefix, helloRoutes);

  // authentication routes
  app.use(`${apiPrefix}/auth`, authRoutes);

  // protected routes
  app.use(`${apiPrefix}/user`, userPreferenceRoutes);
  app.use(`${apiPrefix}/user`, userProfileRoutes);
  app.use(`${apiPrefix}/user`, jobApplicationRoute);
  app.use(`${apiPrefix}/job`, jobRoutes);
  app.use(`${apiPrefix}/admin`, adminRoutes);
  app.use(`${apiPrefix}/admin`, manageNotificationRoutes);
  app.use(`${apiPrefix}/company`, companyRoutes);

  return app;
};

export default routes;