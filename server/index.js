require('dotenv').config()

const express = require("express")
const cors = require("cors")
const app = express()
const mongoose = require("mongoose")
mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true })
const db = mongoose.connection

// const User = require("model/User")

db.on("error", (error) => console.error(error))
db.once("open", () => console.log("connected to database"))

app.use(express.json())
app.use(cors())



// schema (enter using mongosh)

const schema = {
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    userData: {
        type: Object,
        required: true,
        default: ""
    },
}

const mongooseModel = mongoose.model("users", schema)


app.get("/", (req, res) => {
    res.send("Hello")
})

app.post("/", duplicates, async (req, res) => {
    let re = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/


    if (req.body.password.length < 10) {
        res.send({ message: "Password must be 10 digits or longer!" })
    }

    else if (re.test(req.body.email) !== true) {
        res.send({ message: "Invalid email entered!" })
    }

    else {
    const data = new mongooseModel({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
        
    })

    const val = await data.save();
    res.json(val)
}
});


app.get("/userdata", (req, res) => {
    mongooseModel.find((err, val) => {
        if (err) {
            res.send(err)
        }
        else {
            res.json(val)
        }
    })


})

app.get("/fetch/:username", function (req, res) {
    fetchusername = req.params.username
    mongooseModel.find(({ username: fetchusername }), function (err, val) {
        if (err) {
            console.log(err)
        }
        else {
            res.send(val)
        }
    })
})


// post: server -> client
app.get("/login", (req, res) => {
    res.send("login")

})

app.post("/login", async (req, res) => {
    // console.log("username:", req.body.username, "password:", req.body.password
    mongooseModel.find(({ username: req.body.username }), function (err, val) {
        try {
            if (err) {
                res.send({ message: "Wrong username or password entered!" })
            }
            if (req.body.password.length === 0) {
                res.send({ message: "Wrong username or password entered!" })
            }
            else if (req.body.password === val[0].password) {
                console.log("Authorization Granted")
                res.redirect("http://localhost:3000/index.html")
            }
            else {
                console.log("Failed Authentication")
                res.send({ message: "Wrong username or password entered!" })
            }
        }
        catch (e) {
            res.send({ message: "Wrong username or password entered!" })
        }
    })

})


function duplicates(req, res, next) {
    mongooseModel.find(({ username: req.body.username }), function (err, val) {
        try {
            if (val[0].username) {
                res.send({ message: "The username " + '"' + req.body.username + '"' + " is already taken!" })
            }
        // SOMEHOW THIS FINALLY WORKS??!!
        } catch (error) {
            next()
        }
    })
}


app.get("/workout", (req, res) => {
    res.send("Workout")
})

app.post("/workout", async (req, res) => {
    data = JSON.parse(req.body.data)
    currUser = data.username
    // console.log(typeof req.body.data)

    mongooseModel.find(({ username: currUser }), async function (err, val) {
        try {
            // https://mongoosejs.com/docs/tutorials/findoneandupdate.html
            let doc = await mongooseModel.findOneAndUpdate({ username: currUser }, { userData: req.body.data }, { new: true })
            res.send({ data: JSON.parse(doc.userData) })
            console.log(JSON.parse(doc.userData))
            
        } catch (error) {
            console.log(error)            
        }
    })

});

app.get("/getdata", (req, res) => {
    res.send("Workout")
})

app.post("/getdata", async (req, res) => {
    
    currUser = req.body.username

    mongooseModel.find(({ username: currUser }), async function (err, val) {
        try {
            // https://mongoosejs.com/docs/tutorials/findoneandupdate.html
            res.send({ data: JSON.parse(val[0].userData) })
            
            // console.log(JSON.parse(val[0].userData))
            
        } catch (error) {
            console.log(error)            
        }
    })

});







app.listen(4000, () => console.log("Started"))