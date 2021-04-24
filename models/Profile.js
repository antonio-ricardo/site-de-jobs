const Database = require("../db/config")



module.exports = {

    async get() {
        const db = await Database()

        const data = await db.get(`SELECT * FROM profile`)
        
        await db.close()

        return data
    },

    async update(newData){
        const db = await Database()
        
        await db.run(`UPDATE profile SET
        nome = "${newData.nome}",
        salarioMensal = ${newData.salarioMensal},
        diasPorSemana = ${newData.diasPorSemana},
        horasPorDia = ${newData.horasPorDia},
        feriasPorAno = ${newData.feriasPorAno},
        valorDaHora  = ${newData.valorDaHora}`)

        await db.close()
    }
}