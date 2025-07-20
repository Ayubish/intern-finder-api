"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const node_1 = require("better-auth/node");
const auth_1 = require("./lib/auth");
const app = (0, express_1.default)();
// app.use(cors({
//   origin:["http://localhost:3000"],
//   credentials:true
// }))
app.all("/api/auth/{*any}", (0, node_1.toNodeHandler)(auth_1.auth));
app.use(express_1.default.json());
app.get('/home', (req, res) => {
    res.send('Hello from app.ts');
});
exports.default = app;
