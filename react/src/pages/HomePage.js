import React from 'react';
import { useState, useEffect } from 'react';
import ExerciseTable from '../components/ExerciseTable';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Navigation from "../components/Navigation";

function HomePage({ setExerciseToEdit }){
    const navigate = useNavigate();
    const [exercises, setExercises] = useState([]);

    const onDelete = async _id => {
        const response = await fetch(`/exercises/${_id}`, { method: 'DELETE' });
        if(response.status === 204){
            const newExercises = exercises.filter(m => m._id !== _id);
            setExercises(newExercises);
        } else{
            console.error(`Failed to delete movie with id = ${_id}, status code = ${response.status}`);
        }
    }

    const onEdit = async exerciseToEdit => {
        setExerciseToEdit(exerciseToEdit);
        navigate('/edit');
    }
    
    const loadExercises = async () => {
        const response = await fetch('/exercises');
        const data = await response.json();
        setExercises(data);
    }

     useEffect(() => {
        loadExercises();
    }, []);

    return(
        <div className ="App-home">
            <Header/>
            <Navigation/>
            <div className="App-body">
                <ExerciseTable exercises={exercises} onDelete={onDelete} onEdit={onEdit} />
            </div>
            <Footer/>
        </div>
    );
}

export default HomePage;