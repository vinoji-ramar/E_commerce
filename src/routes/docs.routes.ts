import { Router } from "express";

import { docsController } from "../controllers/docs.controller";

const docsRouter = Router();

docsRouter.get("/", docsController.getApiDocumentation);

export { docsRouter };
