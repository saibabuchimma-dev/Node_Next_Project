import express from "express";
import userRoutes from "./routes/userRoutes";

const app = express();
const PORT = 5000;

//MiddleWare
app.use(express.json());

//Routes
app.use("/api/users", userRoutes);

app.listen(PORT, () => {
  console.log(`Server running on Port ${PORT}`);
});
