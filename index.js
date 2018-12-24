const express=require("express");
const {MongoClient, ObjectID}=require("mongodb");
const bodyParser=require("body-parser");
const assert=require("assert");

const app=express();
app.use(bodyParser.json());

const mongo_url="mongodb://localhost:27017";
const database="Edulearn";

MongoClient.connect(mongo_url,{ useNewUrlParser: true },(err,client)=>{
    assert.equal(err,null,"data base connexion failed");

    const db=client.db(database)

    app.get('/home',(req,res)=>{
        db.collection("courses").find().toArray((err,data)=>{
            if (err)
                console.log("can't fetch data");
            else res.send(data);
        })
    })

    app.get('/events',(req,res)=>{
        db.collection("events").find().toArray((err,data)=>{
            if (err)
                console.log("can't fetch data");
            else res.send(data);
        })
    })


    app.get('/staff',(req,res)=>{
        db.collection("staff").find().toArray((err,data)=>{
            if (err)
                console.log("can't fetch data");
            else res.send(data);
        })
    })


    app.get('/latestnews',(req,res)=>{
        db.collection("news").find().toArray((err,data)=>{
            if (err)
                console.log("can't fetch data");
            else res.send(data);
        })
    })




    app.get('/feedback',(req,res)=>{
        db.collection("feedback").find().toArray((err,data)=>{
            if (err)
                console.log("can't fetch data");
            else res.send(data);
        })
    })



    app.get('/blog',(req,res)=>{
        db.collection("blog").find().toArray((err,data)=>{
            if (err)
                console.log("can't fetch data");
            else res.send(data);
        })
    })




    app.get('/users',(req,res)=>{
        db.collection("users").find().toArray((err,data)=>{
            if (err)
                console.log("can't fetch data");
            else res.send(data);
        })
    })


    app.get('/calendar',(req,res)=>{
        db.collection("calendar").find().toArray((err,data)=>{
            if (err)
                console.log("can't fetch data");
            else res.send(data);
        })
    })




    app.post("/",(req,res)=>{
        let newCourse=req.body
        db.collection("courses").insertOne(newCourse,(err,data)=>{
            if (err)
                res.send("Can't add contact")
            else res.send("Course added successfully")
        })
    })

    app.post("/events",(req,res)=>{
        let newEvent=req.body
        db.collection("events").insertOne(newEvent,(err,data)=>{
            if (err)
                res.send("Can't add contact")
            else res.send("Event added successfully")
        })
    })


app.post("/staff",(req,res)=>{
    let newStaff=req.body
    db.collection("staff").insertOne(newStaff,(err,data)=>{
    if (err)
    res.send("Can't add staff")
else res.send("Staff added successfully")
})
})


    app.post("/latestnews",(req,res)=>{
        let newNew=req.body
        db.collection("news").insertOne(newNew,(err,data)=>{
            if (err)
                res.send("Can't add staff")
            else res.send("New added successfully")
        })
    })




    app.post("/feedback",(req,res)=>{
        let newFeed=req.body
        db.collection("feedback").insertOne(newFeed,(err,data)=>{
            if (err)
                res.send("Can't add feedback")
            else res.send("feedback added successfully")
        })
    })




    app.post("/blog",(req,res)=>{
        let newBlog=req.body
        db.collection("blog").insertOne(newBlog,(err,data)=>{
            if (err)
                res.send("Can't add Blog")
            else res.send("Blog added successfully")
        })
    })



    app.post("/users",(req,res)=>{
        let newUser=req.body
        db.collection("users").insertOne(newUser,(err,data)=>{
            if (err)
                res.send("Can't add a User")
            else res.send("User added successfully")
        })
    })



    app.post("/calendar",(req,res)=>{
        let newCourse=req.body
        db.collection("calendar").insertOne(newCourse,(err,data)=>{
            if (err)
                res.send("Can't add contact")
            else res.send("Meeting added successfully")
        })
    })



    app.put("/calendar/:id",(req,res)=>{

        let id=ObjectID(req.params.id)
        let updatedMeeting=req.body
        db.collection("calendar").findOneAndUpdate({_id:id},{$set:{...updatedMeeting}},(err,data)=>{
            if (err)
                res.send("can't update meeting")

            else res.send(data)
        })
    })



    app.delete('/calendar/:id',(req,res)=>{
        const id=ObjectID(req.params.id);
        db.collection("calendar").findOneAndDelete({_id:id},(err,data)=>{
            if (err)
                res.send("Can't delete event");
            else {
                res.send("Event successfully deleted")

            }

        })


    })





    app.put("/modify-contact/:id",(req,res)=>{
        let id=ObjectID(req.params.id)
        let updatedContact=req.body
        db.collection("contactList").findOneAndUpdate({_id:id},{$set:{...updatedContact}},(err,data)=>{
            if (err)
                res.send("can't update movie")
            else res.send(data)
        })
    })







    app.get('/contact-list/:id',(req,res)=>{
        let ContactId=ObjectID(req.params.id);
        db.collection("contactList").findOne({_id:ContactId},(err,data)=>{
            if (err) console.log("can't fetch Contact");
            else res.send(data)
        });
    })

    app.delete('/contact-list/:id',(req,res)=>{
        const id=ObjectID(req.params.id);


        db.collection("contactList").findOneAndDelete({_id:id},(err,data)=>{
            if (err)
                res.send("Can't delete contact");
            else {
                res.send("Contact successfully deleted")

            }

        })


    })



});


app.listen(3007,err=>{
    if (err)
        console.log(err)
    else
        console.log('Your server is running on port 3007')
});