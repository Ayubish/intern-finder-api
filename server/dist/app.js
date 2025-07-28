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
const register_route_1 = require("./routes/register.route");
const auth_middleware_1 = require("./middlewares/auth.middleware");
const app = (0, express_1.default)();
app.use((0, cors_1.default)({
    origin: "http://localhost:3000",
    credentials: true,
}));
app.all("/api/auth/{*any}", (0, node_1.toNodeHandler)(auth_1.auth));
app.use(express_1.default.json());

app.use("/api/register", auth_middleware_1.verifyUser, register_route_1.registerRouter);

app.use(errorHandler_1.errorHandler);
exports.default = app;
