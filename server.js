var express = require("express")
var moment = require("moment")
var app = express()

app.get("/:query", function(req,res){
    var inputDate = req.params.query
    
        // check if input is in unix epoch format
        var dateString = moment.unix(inputDate).format("MMMM DD, YYYY")
        
        var obj = new Object()
    
    // input is not unix epoch
    if (dateString == "Invalid date") {
        // if input is in natural date format
        if (moment(inputDate, "MMMM DD, YYYY").format("MMMM DD, YYYY") === inputDate) {
            obj.unix = moment(inputDate, "MMMM DD, YYYY").unix()
            obj.natural = inputDate
        } else {
            obj.unix = null
            obj.natural = null
        }
    } else {
        obj.unix = inputDate
        obj.natural = moment(dateString, "MMMM DD, YYYY").format("MMMM DD, YYYY")
    }
    

    
    res.json(obj)
})

app.use(express.static(__dirname + '/public'))

app.listen(8080)