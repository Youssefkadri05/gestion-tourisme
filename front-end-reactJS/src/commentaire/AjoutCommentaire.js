import React, { useState } from 'react';

const AjoutCommentaire = ({ onAjouterCommentaire }) => {
  const [commentaire, setCommentaire] = useState('');
  const [image, setImage] = useState(null);

  const handleSubmit = (event) => {
    event.preventDefault();
    onAjouterCommentaire(commentaire, image);
    setCommentaire('');
    setImage(null);
  };

  return (
    <div className="card my-3">
      <div className="card-body">
        <form onSubmit={handleSubmit}>
          <div className="form-group mb-3">
            <label htmlFor="commentaire" className="form-label">Ajouter un commentaire</label>
            <textarea
              className="form-control"
              id="commentaire"
              rows="3"
              value={commentaire}
              onChange={(event) => setCommentaire(event.target.value)}
            />
          </div>
          <div className="form-group mb-3">
            <label htmlFor="image" className="form-label">Ajouter une image</label>
            <input
              className="form-control"
              id="image"
              type="file"
              accept="image/*"
              onChange={(event) => setImage(event.target.files[0])}
            />
          </div>
          <button type="submit" className="btn btn-primary">Ajouter</button>
        </form>
      </div>
    </div>
  );
};

export default AjoutCommentaire;
    