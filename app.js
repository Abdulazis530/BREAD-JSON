const express = require('express')
const fs = require('fs')
const ejs = require('ejs')
const bodyParser = require('body-parser')

const port = 4000

const app = express()
let i
const dataBase = JSON.parse(fs.readFileSync("data.json", "utf8"))

app.set('view engine', 'ejs')

app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static("public"))

app.get("/", (req, res) => {
     

    res.render('index', { dataPaginationEjs: dataBase })
})

app.post("/", (req, res) => {
    
    for (const key in req.body) {
        if(key==="delete"){
            let deleted = Number(req.body.delete) - 1
            dataBase.splice(deleted, 1)
        
            fs.writeFileSync("data.json", JSON.stringify(dataBase))
            res.redirect("/")
        }else if(key==="edit"){
           
            i=Number(req.body.edit)-1
            res.redirect("/edit")
        }else{
            console.log(req.body)
            res.redirect("/add")
        }
      
    }
    
    
})

app.get("/edit", (req, res) => {
     
    const{string,integer,float,date,boolean} =dataBase[i]
    res.render('edit', { strEjs:string, integerEjs:integer,floatEjs:float, dateEjs:date, booleanEjs:boolean, index:i })
})


app.post("/edit", (req, res) => {
 
    dataBase.splice((i),1,req.body)
    fs.writeFileSync("data.json", JSON.stringify(dataBase))

    res.redirect("/")
})

app.get("/add",(req,res)=>{

    res.render("add",{index:dataBase.length})
})

app.post("/add",(req,res)=>{
   console.log(req.body)
    dataBase.push(req.body)
    fs.writeFileSync("data.json", JSON.stringify(dataBase))

    res.redirect("/")
    
})



app.listen(port, () => console.log(`Server is runing on port ${port}`))

