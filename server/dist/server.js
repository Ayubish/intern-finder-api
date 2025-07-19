"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
require("dotenv/config");
const app_1 = __importDefault(require("./app"));
const PORT = process.env.PORT || 3000;
const mongoURI = process.env.DATABASE_URL || "";
// Replace with your MongoDB URI
mongoose_1.default.connect(mongoURI)
    .then(() => {
    console.log('✅ MongoDB connected successfully!');
    // Start server only after DB is connected
    app_1.default.listen(PORT, () => {
        console.log(`🚀 Server is running on http://localhost:${PORT}`);
    });
})
    .catch(err => {
    console.error('❌ MongoDB connection error:', err);
});
