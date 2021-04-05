
const express = require("express");
const router = express.Router();
const Question = require("../models/question.js")

//---Pruebita de enrutamiento gg

router.get("/", (req, res) => {
    res.send("Nice one, this seems like a well routing crap")

        }
    )
;


//-Tanto profesor como alumno puede hacer este Get y acceder a las preguntas. Al alumno se le pintará en el Quiz y al profesor le aparecerá en modo de lista para que luego pueda usar los siguientes métodos.

router.get("/questions", async (req, res) => {
    try {
            const question = await Question.find()
            return res.status(200).json(question)

    } catch(err) {
            return res.status(500).json({"error":err})

            }
        }
    )
;


//-Estos métodos están reservado al área profesor.

router.post("/question", async (req, res) => {
    try{
            const { description } = req.body
            const { alternatives } = req.body

            const question = await Question.create({
                description,
                alternatives
        })      
            return res.status(201).json(question)
    } catch(err) {
            return res.status(500).json({"error":err})

            }
        }
    )
;
//(!)Sale Catch


router.put("/question/:id", async (req, res) => {
    try{
            const _id = req.params.id
            const { description, alternatives} = req.body

            let question = await Question.findOne({_id})

            if(!question){
                question = await Question.create({
                    description,
                    alternatives
                })
            return res.status(201).json(question)
            } else {
                    question.description = description
                    question.alternatives = alternatives
                    await question.save()
                    return res.status(200).json(question)
                
    }
    } catch (err){
            return res.status(500).json({"error":err})

            }
        } 
    )
;


router.delete("/question/:id", async (req, res) => {
    try{
            const _id = req.params.id
            const question = await Question.deleteOne({_id})

        if(question.deletedCount === 0){
            return res.status(404).json()
   
        } else {
            return res.status(204).json()
        }
    } catch(err) {
        return res.status(500).json({"error":err})

            }
        }
    )
;



//------Export!
module.exports = router;