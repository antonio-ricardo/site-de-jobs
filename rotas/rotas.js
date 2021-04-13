const express = require("express")
const mongoose = require("mongoose")
const router = express.Router()
require("../models/jobs")
const ProfileControllers = require("../Controllers/ProfileControllers")
const ProfileData = require("../models/Profile")
const JobsControllers = require("../Controllers/JobControllers")


//rota home da pagina
router.get("/", JobsControllers.index)

//rotas de criação de job
router.get("/job", (req, res) => {res.render("job")})

router.post("/job", JobsControllers.jobSave)

//rotas de edição de job
router.get("/job-edit/:id", JobsControllers.jobEdit)

router.post("/job-edit/:id", JobsControllers.jobEditSave)

//rotas de perfil
router.get("/profile", (req, res) => {
    
    res.render("profile", {profile: ProfileData})
})

router.post("/profile", ProfileControllers.profile)

//rotas de deleção de jobs
router.post("/job/delete/:id", JobsControllers.jobDelete)



module.exports = router