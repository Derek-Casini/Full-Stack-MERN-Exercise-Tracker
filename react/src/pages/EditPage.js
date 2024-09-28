import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from '../components/Header';
import Footer from '../components/Footer';
import Navigation from "../components/Navigation";


export const EditPage = ({ exerciseToEdit }) => {
    const [name, setName] = useState(exerciseToEdit.name);
    const [reps, setReps] = useState(exerciseToEdit.reps);
    const [weight, setWeight] = useState(exerciseToEdit.weight);
    const [unit, setUnit] = useState(exerciseToEdit.unit);
    const [date, setDate] = useState(exerciseToEdit.date);

    const navigate = useNavigate();

    const editExercise = async () => {
        const response = await fetch(`/exercises/${exerciseToEdit._id}`, {
            method: 'PUT',
            body: JSON.stringify({ name: name, reps: reps, weight: weight, unit: unit, date: date }),
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if(response.status === 200){
            alert("Successfully edited the exercise!");
        } else{
            alert(`Failed to edit exercise, status code = ${response.status}`);
        }
        navigate("/");
    };

    return(
        <div className="App-edit">
            <Header/>
            <Navigation/>
            <div className="App-body">
                <h3>Edit Exercise</h3>
                <table>
                    <thead>
                        <th>Name</th>
                        <th>Reps</th>
                        <th>Unit</th>
                        <th>Weight</th>
                        <th>Date</th>
                    </thead>
                    <tbody>
                        <td>
                            <input
                                type="text"
                                value={name}
                                onChange={e => setName(e.target.value)} />
                        </td>
                        <td>
                            <input
                                type="number"
                                value={reps}
                                onChange={e => setReps(e.target.value)} />
                        </td>
                        <td>
                            <input
                                type="number"
                                value={weight}
                                onChange={e => setWeight(e.target.value)} />
                        </td>
                        <td>
                            <select value={unit} onChange={e => setUnit(e.target.value)}>
                                <option value="lbs">lbs</option>
                                <option value="kgs">kgs</option>
                            </select>
                        </td>
                        <td>
                            <input
                                type="text"
                                value={date}
                                onChange={e => setDate(e.target.value)} />
                        </td>
                    </tbody>
                </table>
                <button id="save-button" onClick={editExercise}>Save</button>
            </div>
            <Footer/>
        </div>
    );
}

export default EditPage;