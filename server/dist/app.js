"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const node_1 = require("better-auth/node");
const auth_1 = require("./lib/auth");
const cors_1 = __importDefault(require("cors"));
const errorHandler_1 = require("./middlewares/errorHandler");
const auth_middleware_1 = require("./middlewares/auth.middleware");
const company_route_1 = require("./routes/company.route");
const intern_route_1 = require("./routes/intern.route");
const app = (0, express_1.default)();
app.use((0, cors_1.default)({
    origin: "http://localhost:3000",
    credentials: true,
}));
app.all("/api/auth/{*any}", (0, node_1.toNodeHandler)(auth_1.auth));
app.use(express_1.default.json());
//   company api
app.use("/api/company", auth_middleware_1.verifyUser, company_route_1.companyRouter);
//intern api
app.use("/api/intern", auth_middleware_1.verifyUser, intern_route_1.internRouter);
app.use(errorHandler_1.errorHandler);
exports.default = app;
