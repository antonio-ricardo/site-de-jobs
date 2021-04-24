const database = require("../db/config")

module.exports = {
    async get(){
        const db = await database()
        
        const data = await db.all(`SELECT * FROM job`)

        await db.close()
        
        return data
    },

    async update(id, nome, horasPorDia, totalDeHoras){
        const db = await database()

        await db.run(`UPDATE job SET
            nome = "${nome}",
            horasPorDia = ${horasPorDia},
            totalDeHoras = ${totalDeHoras}
            WHERE id = ${id}`)
    },

    async create(id, nome, horasPorDia, totalDeHoras){
        const db = await database()

        await db.run(`INSERT INTO job (
        id,
        nome,
        horasPorDia,
        totalDeHoras,
        createdAt 
        ) VALUES (
            ${id},
            "${nome}",
            ${horasPorDia},
            ${totalDeHoras},
            ${Date.now()}
        )`)

        await db.close()
    },

    async delete(id){
        const db = await database()

        await db.run(`DELETE FROM job WHERE id = ${id}`)

        db.close()
        
    }

}
