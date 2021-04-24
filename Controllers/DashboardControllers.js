const data = require("../models/jobs")
const services = require("../services/JobServices")
const Profile = require("../models/Profile")



module.exports = {
    async index(req, res){
        let HorasOcupadas = 0
        const uptadtedJob = await Promise.all((await data.get()).map(async (job) => {
            const diasRestantes = services.tempoRestante(job)
            const status = diasRestantes <= 0 ? "done" : "progress"
            HorasOcupadas = status == "progress" ? HorasOcupadas += Number(job.horasPorDia) : HorasOcupadas
            const profileData = await Profile.get()
            return {
                ...job,
                diasRestantes,
                status,
                valorDoProjeto: services.valorDoProjeto(profileData.valorDaHora, job.totalDeHoras)
            }
        }))
        const horasPorDia = (await Profile.get()).horasPorDia

        const HorasLivre = ( horasPorDia - HorasOcupadas)
        const JobsEmProgresso = (uptadtedJob.filter(status => status.status == "progress")).length
        const JobsFinalizados = (uptadtedJob.filter(status => status.status !== "progress")).length

        const situaçao = [JobsEmProgresso, JobsFinalizados, uptadtedJob.length, HorasLivre]

        res.render("index", {jobs: uptadtedJob , profile: await Profile.get(), situaçao})
    },

}