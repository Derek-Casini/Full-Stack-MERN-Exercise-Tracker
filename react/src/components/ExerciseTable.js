import React from 'react';
import TableRow from './TableRow';

function ExerciseTable({ exercises, onDelete, onEdit }) {
    return(
        <table className="exercise-table">
            <thead>
                <tr>
                    <th>Exercise</th>
                    <th>Reps</th>
                    <th>Weight</th>
                    <th>Unit</th>
                    <th>Date</th>
                    <th></th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {exercises.map((exercise, i) => <TableRow exercise={exercise} onDelete={onDelete} onEdit={onEdit}  key={i} />)}
            </tbody>
        </table>
    );
}

export default ExerciseTable;