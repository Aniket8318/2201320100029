
const path = require('path');
const {converts, redrct, display } = require("./controllers/convert.js");
const express = require('express');
const app = express();
app.use(express.json());
app.set('view engine','ejs')
app.set("views", path.resolve("./views"));
app.use(express.urlencoded({extended:false}));
const port=2100;


app.get("/", (req,res)=>{
    res.render("home");
});

app.post("/",  async (req, res)=>{
    const va = await converts(req.body);
    res.render("home",
         {
        convUrl: va ,
    });
    

});
app.get('/ad',(req,res)=>{
    res.send("<h1>Space</h1>")
});
app.get('/favicon.ico', (req, res) => res.status(204));
app.post("/urls", async (req,res)=>{
 
    const urlss = await display();
    
    res.render("home",{
        result: urlss,
    })
});
app.get("/:srt",async (req,res)=>{
const va = await redrct(req);
res.redirect(va);
});

module.exports=app;
 app.listen(port,(req,res)=>{
     console.log(`Server Live at 2100`)
});