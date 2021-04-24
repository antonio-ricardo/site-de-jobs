const database = require("./config")


const initDb = {
    
    async init(){

const db = await database()

await db.exec(`CREATE TABLE profile (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT,
    salarioMensal INT,
    diasPorSemana INT,
    horasPorDia INT,
    feriasPorAno INT,
    valorDaHora INT
)`)

await db.exec(`CREATE TABLE job (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT,
    horasPorDia INT,
    totalDeHoras INT,
    createdAt DATETIME
)`)

await db.run(
    `INSERT INTO profile (
    nome,
    salarioMensal,
    diasPorSemana,
    horasPorDia,
    feriasPorAno,
    valorDaHora
) VALUES (
    "Tonhão",
    3000,
    5,
    8,
    4,
    27
)`)


await db.run(`INSERT INTO job (
    nome,
    horasPorDia,
    totalDeHoras,
    createdAt
) VALUES (
    "Pizzaria Guloso",
    2,
    20,
    1619121021750
)`)

await db.run(`INSERT INTO job (
    nome,
    horasPorDia,
    totalDeHoras,
    createdAt
) VALUES (
    "OneTwo Project",
    3,
    17,
    1619121021750
)`)


await db.close()

    }
}

initDb.init()