//import modules
const express = require('express')
let mongodb = require('mongodb')
//import url
const url = require('../url')
//create mongo client
let mcl = mongodb.MongoClient
//create router instance
let router = express.Router()
//create rest api
router.put("/", (req, res) => {
    let pid = req.body.pid
    let obj = {
        pname: req.body.pname,
        pcost: req.body.pcosts
    }
    //connect to mongodb
    mcl.connect(url, (err, conn) => {
        if (err)
            console.log('Error in connection :- ', err)
        else {
            let db = conn.db('nodedb')
            db.collection('products').updateOne({ pid }, { $set: obj }, (err, result) => {
                if (err)
                    res.json({ 'update': 'Error ' + err })
                else{
                    if (result.matchedCount != 0) {
                        console.log("Data updated ")
                        res.json({ 'update': 'success' })
                    } else {
                        console.log("Data Not updated ")
                        res.json({ 'update': 'Record Not found' })
                    }
                    conn.close()
                }
            })
        }
    })
})


//export router
module.exports = router
