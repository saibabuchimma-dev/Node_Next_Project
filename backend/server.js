const express = require("express");
const app = express();
const PORT = 5000;

//MiddleWare
app.use(express.json());

//Test Route
app.get("/", (req, res) => {
  res.send("Server running Successfully 🚀");
});

//Start Server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

//Get API
app.get("/api/test", (req, res) => {
  res.json({ message: "API is Working ☑️" });
});

//Post API
app.post("/api/data", (req, res) => {
  const data = req.body;
  res.json({
    message: "Data received",
    data: data,
  });
});

app.post("/api/userinfo", (req, res) => {
  const data = req.body;
  res.json({
    message: `User ${data.name} is ${data.age} years old`,
    data: data,
  });
});

//Update API
app.put("/api/update", (req, res) => {
  res.json({ message: "Updated Successfully !" });
});

//Delete API
app.delete("/api/delete", (req, res) => {
  res.json({ message: "Deleted Successfully !" });
});
