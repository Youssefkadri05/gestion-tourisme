import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AjouterSortie = () => {
    const [description, setDescription] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const token = localStorage.getItem('token');
            await axios.post('http://localhost:8000/api/sorties', {
                description,
            }, {
                headers: { Authorization: `Bearer ${token}` },
            });
            navigate('/sorties');
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="container">
            <h1 className="my-4">Ajouter une sortie</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Description</label>
                    <textarea className="form-control" id="description" value={description} onChange={(event) => setDescription(event.target.value)}></textarea>
                </div>
                <div className="d-flex justify-content-end">
                    <button type="submit" className="btn btn-primary">Ajouter</button>
                </div>
            </form>
        </div>
    );
};

export default AjouterSortie;
