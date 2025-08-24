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
const company_route_1 = require("./routes/company.route");
const intern_route_1 = require("./routes/intern.route");
const job_route_1 = require("./routes/job.route");
const application_route_1 = require("./routes/application.route");
const interview_route_1 = require("./routes/interview.route");
const path_1 = __importDefault(require("path"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use((0, cors_1.default)({
    origin: process.env.CLIENT_URL,
    credentials: true,
}));
app.all("/api/auth/{*any}", (0, node_1.toNodeHandler)(auth_1.auth));
app.use(express_1.default.json());
//related to job
app.use("/api/jobs", job_route_1.job);
//related to application
app.use("/api/applications", application_route_1.application);
//related to interviews
app.use("/api/interviews", interview_route_1.interview);
//multiform registration
app.use("/api/company", company_route_1.companyRouter);
app.use("/api/intern", intern_route_1.internRouter);
// app.use("/static", express.static(path.join(__dirname, "public")));
app.use("/static", express_1.default.static(path_1.default.join(process.cwd(), "uploads")));
app.use(errorHandler_1.errorHandler);
exports.default = app;
