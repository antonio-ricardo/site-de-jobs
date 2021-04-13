let data = require("../models/jobs")
const services = require("../services/JobServices")
const ProfileData = require("../models/Profile")

module.exports= {
    index(req, res){
        const uptadtedJob = data.map((job) => {
            const diasRestantes = services.tempoRestante(job)
            const status = diasRestantes <= 0 ? "done" : "progress"    
            return {
                ...job,
                id: services.idCalculator(job),
                diasRestantes,
                status,
                valorDoProjeto: services.valorDoProjeto(ProfileData.valorDaHora, job.totalDeHoras)
            }
        })
        res.render("index", {jobs: uptadtedJob, profile: ProfileData})
    },

    jobSave(req, res){
    const lastId = data[data.length - 1]?.id || 0
    data.push({
        id: lastId + 1,
        nome: req.body.name,
        horasPorDia: req.body["daily-hours"],
        totalDeHoras: req.body["total-hours"],
        createdAt: Date.now()
})
res.redirect("/")

    },

    

    jobEditSave(req, res){
        const job = data.find(job => job.id == req.params.id)
        job.nome = req.body.name
        job.horasPorDia = req.body["daily-hours"]
        job.totalDeHoras = req.body["total-hours"]

        res.redirect("/")
    },

    jobEdit(req, res){

        res.render("job-edit", {jobs: data[req.params.id - 1], valor: services.valorDoProjeto(data[req.params.id - 1].totalDeHoras, ProfileData.valorDaHora)})
    },

    jobDelete(req, res){
        const id = req.params.id
        data = data.filter(job =>
            Number(id) !== Number(services.idCalculator(job))
        )
        res.redirect("/")
    }



}
        