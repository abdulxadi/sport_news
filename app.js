<<<<<<< HEAD
const express = require("express");
const config = require("config");
const mainRoute = require("./routes/index.routes")

=======
const express = require('express');
const config = require('config');
const mainRouter = require("./routes/index.routes")
const createTables = require('./config/create-table')
>>>>>>> 8f84cca (first commit)
const PORT = config.get("port") || 3030

const app = express()

app.use(express.json())
<<<<<<< HEAD

app.use("/api", mainRoute)
=======
app.use("/api", mainRouter)

app.get("/create-tables", async (req, res) =>{
    await createTables();
    console.log("Tables were created");
    res.status(200).send("created")
})
>>>>>>> 8f84cca (first commit)

async function start() {
    try {
        app.listen(PORT, ()=>{
            console.log(`Server started at: http://localhost:${PORT}`);
<<<<<<< HEAD
            
        })
    } catch (error) {
        console.log(error);
        
=======
        })
    } catch (error) {
        console.log(error);
>>>>>>> 8f84cca (first commit)
    }
}

start()