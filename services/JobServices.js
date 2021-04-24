module.exports = {
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

    
}