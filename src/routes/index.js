import routes from "./routes";
import adminRoutes from "./admin.routes";
import userRoutes from "./user.routes";

const combinedRoutes = [...routes, ...adminRoutes, ...userRoutes];
export default combinedRoutes;
