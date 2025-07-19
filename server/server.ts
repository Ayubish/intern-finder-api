

import mongoose from "mongoose";
import 'dotenv/config'
import app from "./app";

const PORT = process.env.PORT || 3000;
const mongoURI = process.env.DATABASE_URL || "";
// Replace with your MongoDB URI


mongoose.connect(mongoURI)
.then(() => {
  console.log('✅ MongoDB connected successfully!');

  // Start server only after DB is connected
  app.listen(PORT, () => {
    console.log(`🚀 Server is running on http://localhost:${PORT}`);
  });

})
.catch(err => {
  console.error('❌ MongoDB connection error:', err);
});