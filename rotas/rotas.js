const express = require("express")
const mongoose = require("mongoose")
const router = express.Router()
require("../models/jobs")
const jobData = mongoose.model("jobs")

const profile = {

    data: {
            nome: "Tonhão",
            salarioMensal: 3000,
            diasPorSemana: 5,
            horasPorDia: 5,
            feriasPorAno: 4,
            valorDaHora: 27

        }

}

const Job = {

    data: [
    {
        id: 1,
        nome: "Pizzaria Guloso",
        horasPorDia: 2,
        totalDeHoras: 20,
        createdAt: Date.now()
    },
    {
        id: 2,
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
                    diasRestantes,
                    status,
                    valorDoProjeto: Job.services.valorDoProjeto(profile.data.valorDaHora, job.totalDeHoras)
                }
            })
            res.render("index", {jobs: uptadtedJob, profile: profile.data})
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

        profile(req,res){
            profile.data.nome = req.body.name
            profile.data.valorDaHora = 
            (req.body["monthly-budget"]/(req.body["days-per-week"]*4*req.body["hours-per-day"])).toFixed(2)
            profile.data.salarioMensal = req.body["monthly-budget"]
            profile.data.diasPorSemana = req.body["days-per-week"]
            profile.data.horasPorDia = req.body["hours-per-day"]
            profile.data.feriasPorAno = req.body["vacation-per-year"]

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

            res.render("job-edit", {jobs: Job.data[req.params.id - 1], valor: Job.services.valorDoProjeto(Job.data[req.params.id - 1].totalDeHoras, profile.data.valorDaHora)})
        },

        jobDelete(req, res){
            const id = req.params.id
            Job.data = Job.data.filter(job =>
            Number(job.id) !== Number(id)

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
        
            const diferençaEmDias = Math.floor(diferençaEmMs/(1000*60*60*24))
            
            return diferençaEmDias
        },

        valorDoProjeto(valorDaHora, totalDeHoras){
            const valorDoProjeto = (valorDaHora * totalDeHoras).toFixed(2).replace(".",",")

            return valorDoProjeto
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
    
    res.render("profile", {profile: profile.data})
})

router.post("/profile", Job.controllers.profile)

//rotas de deleção de jobs
router.post("/job/delete/:id", Job.controllers.jobDelete)



module.exports = router