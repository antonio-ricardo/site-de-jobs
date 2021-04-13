const express = require("express")
const mongoose = require("mongoose")
const router = express.Router()
require("../models/jobs")
const jobData = mongoose.model("jobs")
const ProfileControllers = require("../Controllers/ProfileControllers")
const ProfileData = require("../models/Profile")


const Job = {

    data: [
    {
        nome: "Pizzaria Guloso",
        horasPorDia: 2,
        totalDeHoras: 20,
        createdAt: Date.now()
    },
    {
        nome: "OneTwo Project",
        horasPorDia: 3,
        totalDeHoras: 17,
        createdAt: Date.now()
    }
],


    controllers: {
        index(req, res){
            const uptadtedJob = Job.data.map((job) => {
                const diasRestantes = Job.services.tempoRestante(job)
                const status = diasRestantes <= 0 ? "done" : "progress"    
                return {
                    ...job,
                    id: Job.services.idCalculator(job),
                    diasRestantes,
                    status,
                    valorDoProjeto: Job.services.valorDoProjeto(ProfileData.valorDaHora, job.totalDeHoras)
                }
            })
            res.render("index", {jobs: uptadtedJob, profile: ProfileData})
        },

        jobSave(req, res){
        const lastId = Job.data[Job.data.length - 1]?.id || 0
        Job.data.push({
            id: lastId + 1,
            nome: req.body.name,
            horasPorDia: req.body["daily-hours"],
            totalDeHoras: req.body["total-hours"],
            createdAt: Date.now()
})
    res.redirect("/")

        },

        

        jobEditSave(req, res){
            const job = Job.data.find(job => job.id == req.params.id)
            job.nome = req.body.name
            job.horasPorDia = req.body["daily-hours"]
            job.totalDeHoras = req.body["total-hours"]

            res.redirect("/")
        },

        jobEdit(req, res){

            res.render("job-edit", {jobs: Job.data[req.params.id - 1], valor: Job.services.valorDoProjeto(Job.data[req.params.id - 1].totalDeHoras, ProfileData.valorDaHora)})
        },

        jobDelete(req, res){
            const id = req.params.id
            Job.data = Job.data.filter(job =>
                Number(id) !== Number(Job.services.idCalculator(job))
            )
            res.redirect("/")
        }



},

    services: {
        tempoRestante(job){

            const HorasRestantes = (job['totalDeHoras']/ job["horasPorDia"]).toFixed()
        
            const created_date = new Date(job.createdAt)
            const diaDoVencimento = created_date.getDate() + Number(HorasRestantes)
            const dataDoVencimento = created_date.setDate(diaDoVencimento)
        
            const diferençaEmMs = dataDoVencimento - Date.now()
        
            const diferençaEmDias = Math.round(diferençaEmMs/(1000*60*60*24))
            
            return diferençaEmDias
        },

        valorDoProjeto(valorDaHora, totalDeHoras){
            const valorDoProjeto = (valorDaHora * totalDeHoras).toFixed(2).replace(".",",")

            return valorDoProjeto
        },

        idCalculator(job){
            const id = (Number(Job.data.indexOf(job))+ 1)
            return id
        }

    }

}


//rota home da pagina
router.get("/", Job.controllers.index)

//rotas de criação de job
router.get("/job", (req, res) => {res.render("job")})

router.post("/job", Job.controllers.jobSave)

//rotas de edição de job
router.get("/job-edit/:id", Job.controllers.jobEdit)

router.post("/job-edit/:id", Job.controllers.jobEditSave)

//rotas de perfil
router.get("/profile", (req, res) => {
    
    res.render("profile", {profile: ProfileData})
})

router.post("/profile", ProfileControllers.profile)

//rotas de deleção de jobs
router.post("/job/delete/:id", Job.controllers.jobDelete)



module.exports = router