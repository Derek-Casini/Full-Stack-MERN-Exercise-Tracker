import mongoose from 'mongoose';
import 'dotenv/config';

mongoose.connect(
    process.env.MONGODB_CONNECT_STRING,
    { useNewUrlParser: true }
);

const db = mongoose.connection;

const exerciseSchema = mongoose.Schema({
    name: { type: String, required: true },
    reps: { type: Number, required: true },
    weight: { type: Number, required: true },
    unit: { type: String, required: true },
    date: { type: String, required: true }
});

const Exercise = mongoose.model("Exercise", exerciseSchema);

const createExercise = async (name, reps, weight, unit, date) => {
    const exercise = new Exercise({ name: name, reps: reps, weight: weight, unit: unit, date: date });
    return exercise.save();
}

const findExercises = async (filter) => {
    const query = Exercise.find(filter);
    return query.exec();
}

const findById = async (id) => {
    const query = Exercise.findById(id);
    return query.exec();
}

const updateExercise = async (id, update) => {
    const result = await Exercise.findByIdAndUpdate(id, update, { new: true });
    return result;
}

const deleteExercise = async (id) => {
    const result = await Exercise.findByIdAndDelete(id);
    return result;
}

db.once("open", () => {
    console.log("Successfully connected to MongoDB using Mongoose!");
});

export { createExercise, findExercises, findById, updateExercise, deleteExercise }