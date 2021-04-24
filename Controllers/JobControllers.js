let data = require("../models/jobs")
const services = require("../services/JobServices")
const ProfileData = require("../models/Profile")

module.exports= {
    
    async jobSave(req, res){

    const jobs = await data.get()
    const lastId= jobs[jobs.length-1]?.id || 0


    await data.create((lastId + 1), req.body.name, req.body["daily-hours"], req.body["total-hours"])

    res.redirect("/")

    },

    

    async jobEditSave(req, res){
     
        data.update(
        req.params.id,
        req.body["name"],
        req.body["daily-hours"],
        req.body["total-hours"]
        )

        res.redirect("/")
    },

    async jobEdit(req, res){

        res.render("job-edit", {jobs: (await data.get())[req.params.id - 1], valor: services.valorDoProjeto((await data.get())[req.params.id - 1].totalDeHoras, (await ProfileData.get()).valorDaHora)})
    },

    async jobDelete(req, res){
        
        await data.delete(req.params.id)

        res.redirect("/")
    }


}
        