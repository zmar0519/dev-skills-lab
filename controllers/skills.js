import * as skillDb from '../data/skill-db.js'

export {
    index,
    show,
}

function show(req, res) {
    skillDb.findById(req.params.id, function(error, skill) {
        res.render('skills/show', {
            skill: skill,
            error: error
        })
    })
}

function index(req, res) {
    skillDb.find({}, function(error, skills) {
      res.render('skills/index', {
        skills: skills,
        error: error
      })
    })
  }