import 'dotenv/config';
import express from 'express';
import asyncHandler from 'express-async-handler';
import * as exercises from './exercise_model.mjs';
import { body, validationResult } from 'express-validator';

const app = express();

const PORT = process.env.PORT;

app.use(express.json());

app.post('/exercises', [body('name').isString().notEmpty(),
    body('reps').isInt({ min: 1 }),
    body('weight').isInt({ min: 1 }),
    body('unit').isIn(['lbs', 'kgs']),
    body('date').matches(/^(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])-\d{2}$/)], asyncHandler(async (req, res) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).send({ Error: "Invalid request" });
        }
        const exercise = await exercises.createExercise(req.body.name, req.body.reps, req.body.weight, req.body.unit, req.body.date);
        res.status(201).send(exercise);
}));

app.get('/exercises', asyncHandler(async (req, res) => {
    const result = await exercises.findExercises({});
    res.status(200).send(result);
}));

app.get('/exercises/:_id', asyncHandler(async (req, res) => {
    const result = await exercises.findById(req.params);
    if(result == null){
        res.status(404).send({ Error: "Not found" });
    }
    else{
        res.status(200).send(result);
    }
}));

app.put('/exercises/:_id', [body('name').isString().notEmpty(),
    body('reps').isInt({ min: 1 }),
    body('weight').isInt({ min: 1 }),
    body('unit').isIn(['kgs', 'lbs']),
    body('date').matches(/^(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])-\d{2}$/)], asyncHandler(async (req, res) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            res.status(400).send({ Error: "Invalid request" });
        }
        else if(await exercises.findById(req.params) == null){
            res.status(404).send({ Error: "Not found" });
        }
        else{
            const update = {...req.body};
            const result = await exercises.updateExercise(req.params._id, update);
            res.status(200).send(result);
        }
}));

app.delete('/exercises/:_id', asyncHandler(async (req,res) => {
    const result = await exercises.deleteExercise({_id: req.params._id});
    if(result == null){
        res.status(404).send({ Error: "Not found" });
    }
    else{
        res.status(204).send(result);
    }
}));

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}...`);
});