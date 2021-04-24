const Profile = require("../models/Profile")


module.exports = { 
    async profile(req, res){
        res.render("profile", {profile: await Profile.get()})
    },


    async profileUpdate(req,res){
        await Profile.update({
        ...(await Profile.get()),
        nome: req.body.name,
        salarioMensal: req.body["monthly-budget"],
        diasPorSemana: req.body["days-per-week"],
        horasPorDia: req.body["hours-per-day"],
        feriasPorAno:  req.body["vacation-per-year"],
        valorDaHora: 
        (req.body["monthly-budget"]/(req.body["days-per-week"]*4*req.body["hours-per-day"])).toFixed(2)
    })
    
    res.redirect("/")
    },
    
}