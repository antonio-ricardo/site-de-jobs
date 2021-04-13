const mongoose = require("mongoose")
const schema = mongoose.Schema

const Job = new schema({
    nome: {
        type: String,
        require: true
    },
    prazo: {
        type: String,
        require: true
    },
    valor: {
        type: Number,
        require: true
    },
    processo: {
        type: String,
        require: true
    }
    
})

mongoose.model("jobs", Job)
