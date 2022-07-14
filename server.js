const express = require('express');
const app = express();
const MongoClient = require('mongodb').MongoClient
const PORT = 3000;
require('dotenv').config()

let db, 
    dbConnectionStr = process.env.DB_STRING,
    dbName = 'rap'

MongoClient.connect(dbConnectionStr, { useUnifiedTopology: true})
    .then(client => {
        console.log(`connected to ${dbName} Database`)
        db = client.db(dbName)
    })
app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true}))
app.use(express.json())

app.get('/', (req, res) => {
    db.collection('rappers').find().sort({likes: -1}).toArray()
    .then(result => {
        res.render('index.ejs', {info: result})
    })
    .catch(err => {
        console.error(err);
    })
})
app.post('/addRapper', (req, res) => {
    db.collection('rappers').insertOne({stageName: req.body.stageName, birthName: req.body.birthName, likes: 0})
    .then(result => {
        console.log('added a new rapper')
        res.redirect('/')
    })
    .catch(err => console.error(err))
})
app.put('/addNewRapper', (req,res) => {
    db.collection(rappers).updateOne({stageName: req.body.stageName, birthName: req.body.birthName, likes: req.body.likes}, 
        {
            $set: { likes: req.body.likes + 1 }
            },
            { 
                sort: {_id: -1},
                upsert: true
            })
        .then(data => {
            console.log('Added one likes')
            res.json('like added');
        })
        .catch(err => console.error(err))
})
app.delete('/deleteRapper', (req, res) => {
    db.collection('rappers').deleteOne({stageName: req.body.stageName})
    .then(result => {
        console.log('rapper deleted')
        res.json('Rapper deleted')
    })
    .catch(err => console.error(err))
})
app.listen(process.env.PORT || PORT, () => {
    console.log(`connected to port ${PORT}`)
})