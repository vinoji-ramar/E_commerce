import { Router } from "express";

import { authRouter } from "./auth.routes";
import { cartRouter } from "./cart.routes";
import { docsRouter } from "./docs.routes";
import { orderRouter } from "./order.routes";
import { productRouter } from "./product.routes";

const apiRoutes = Router();

apiRoutes.use("/auth", authRouter);
apiRoutes.use("/products", productRouter);
apiRoutes.use("/cart", cartRouter);
apiRoutes.use("/orders", orderRouter);
apiRoutes.use("/docs", docsRouter);

export { apiRoutes };
