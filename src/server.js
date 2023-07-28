const app = require("./app")

const { db } = require('./basedata/config')

db.authenticate()
.then(()=> console.log("DataBase conected"))
.catch(()=>console.log("error failed conection"))

db.sync()
.then(()=> console.log("DataBase syncro"))
.catch(()=>console.log("error failed syncro"))

app.listen(3000,()=>{
    console.log(`Port run server 😀`)
})


