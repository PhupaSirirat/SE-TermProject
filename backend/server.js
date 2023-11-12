const express = require("express")
const cors = require('cors');
const dotenv = require("dotenv")
dotenv.config()
const port = process.env.PORT || 3000
const connectDB = require("./config/database.js")
const cookieParser = require('cookie-parser');

connectDB.connectDB()

const userRoutes = require("./routes/userRoutes.js")
const favouriteRoutes = require("./routes/favouriteRoutes.js")
const historyRoutes = require("./routes/historyRoutes.js")


const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
}
));
app.use(cookieParser())

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

app.use("/api/users", userRoutes)
app.use("/api/favourite",favouriteRoutes)
app.use("/api/history",historyRoutes)

app.get("/", (req, res) => {
  res.send("Server is running")
})

app.listen(port, () => console.log(`Server running on port ${port}`))