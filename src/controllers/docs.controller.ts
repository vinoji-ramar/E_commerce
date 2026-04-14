import { Request, Response } from "express";
import path from "path";

const getApiDocumentation = (_request: Request, response: Response): void => {
  const documentPath = path.resolve(process.cwd(), "src/docs/API_DOCUMENTATION.md");
  response.sendFile(documentPath);
};

export const docsController = {
  getApiDocumentation
};
