const ProfileData = require("../models/Profile")


module.exports = {
        profile(req,res){
        ProfileData.nome = req.body.name
        ProfileData.valorDaHora = 
        (req.body["monthly-budget"]/(req.body["days-per-week"]*4*req.body["hours-per-day"])).toFixed(2)
        ProfileData.salarioMensal = req.body["monthly-budget"]
        ProfileData.diasPorSemana = req.body["days-per-week"]
        ProfileData.horasPorDia = req.body["hours-per-day"]
        ProfileData.feriasPorAno = req.body["vacation-per-year"]

    res.redirect("/")
    },
    
}