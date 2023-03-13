import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import jwt_decode from 'jwt-decode';

const SortieDetails = () => {
  const { id } = useParams();
  const [sortie, setSortie] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSortie = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`http://localhost:8000/api/sorties/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setSortie(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchSortie();
  }, [id]);

  const handleOptionChange = (optionId) => {
    const optionIndex = selectedOptions.indexOf(optionId);
    if (optionIndex === -1) {
      setSelectedOptions([...selectedOptions, optionId]);
    } else {
      const newOptions = [...selectedOptions];
      newOptions.splice(optionIndex, 1);
      setSelectedOptions(newOptions);
    }
  };
  // Récupérer le statut admin à partir du token stocké localement
  const token = localStorage.getItem('token');
  const decodedToken = jwt_decode(token);
  const userId = decodedToken.id;
  
  const handleAjouterCommentairelick = (userId,idSortie) => {
    navigate(`/ajouter-commentaire/${userId}/${idSortie}`);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (selectedOptions.length > 0) {
      try {
        
        await axios.post(
          `http://localhost:8000/api/paniers`,
          { selectedOptions, userId, sortie },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        navigate('/mes-reservations');
      } catch (error) {
        console.error(error);
      }
    }
  };
  const [comments] = useState([
    {
      id: 1,
      user: 'John',
      image: 'https://via.placeholder.com/150',
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    },
    {
      id: 2,
      user: 'Jane',
      image: 'https://via.placeholder.com/150',
      text: 'Praesent ut massa quis augue luctus elementum.',
    },
    {
      id: 3,
      user: 'Bob',
      image: 'https://via.placeholder.com/150',
      text: 'Vestibulum eu justo lectus. Mauris euismod nulla eget elit consequat auctor.',
    },
  ]);

  if (!sortie) {
    return <div className="container mt-5">Loading...</div>;
  }

  return (
    <div className="container mt-5">
      <h1>Détails de la sortie</h1>
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">Sortie {sortie.sortie.id}</h5>
          <h6 className="card-subtitle mb-2 text-muted">{sortie.sortie.description}</h6>
        </div>
      </div>
      <h2 className="mt-5">Options</h2>
      <form onSubmit={handleSubmit}>
        {sortie.options.map((option) => (
          <div className="card my-3 card-colorr bg-secondary " key={option.id}>
            <div className="card-body">
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  value={option.id}
                  id={`option-${option.id}`}
                  checked={selectedOptions.includes(option.id)}
                  onChange={() => handleOptionChange(option.id)}
                />
                <label className="form-check-label" htmlFor={`option-${option.id}`}>
                  Option {option.numero}
                </label>
              </div>
              <h6 className="card-subtitle mb-2 text-muted">{option.dateHeure}</h6>
              <p className="card-text">Lieu: {option.lieu}</p>
              <p className="card-text">{option.description}</p>
            </div>
          </div>
        ))}
        <button className="btn btn-primary" type="submit" disabled={selectedOptions.length === 0}>
          Ajouter au panier
        </button>
      </form>

      <h2 className="mt-5">Commentaires</h2>
      <div className="card my-3">
        <div className="card-body">
          {comments.map(comment => (
            <div className="d-flex align-items-center mb-3" key={comment.id}>
              <img src={comment.image} alt={comment.user} className="mr-3" />
              <div>
                <h5>{comment.user}</h5>
                <p>{comment.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <button className="btn btn-success mt-5" onClick={() => handleAjouterCommentairelick(userId,sortie.sortie.id)}>
        Ajouter un commentaire
      </button>

    </div>
  );
};

export default SortieDetails;
