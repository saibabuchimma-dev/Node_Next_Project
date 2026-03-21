import express from "express";
import cors from "cors";
import userRoutes from "./routes/userRoutes";
import taskRoutes from "./routes/taskRoutes";

const app = express();
const PORT = 5000;

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  }),
);

//MiddleWare
app.use(express.json());

//Routes
app.use("/api/users", userRoutes);
app.use("/api/tasks", taskRoutes);

//Server Start
app.listen(PORT, () => {
  console.log(`Server running on Port ${PORT}`);
});
