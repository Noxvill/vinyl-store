import React, { useState } from 'react';
import userprofile from '../../assets/emptyuser.png'
import './NewPublication.css';

const NewPublication = () => {
  const [form, setForm] = useState({
    description: '',
    price: '',
    category: '',
    status: '',
    artist: '',
    year: '',
    format: '',
    condition: ''
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(form); // Aquí iría la lógica para enviar el formulario
  };

  return (
    <div className="new-publication-container">
      <h1>Vender Artículo</h1>
      <div className="user-info">
        <img src={userprofile} alt="Usuario" className="user-img" />
        <h2>Usuario</h2>
      </div>

      <form className="new-publication-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Descripción</label>
          <textarea 
            name="description" 
            placeholder="Escribe la descripción del artículo" 
            value={form.description} 
            onChange={handleChange} 
            required 
          />
        </div>
        
        <div className="form-group">
          <label>Subir Foto</label>
          <input type="file" name="photo" />
        </div>
        
        <div className="form-group">
          <label>Precio</label>
          <input 
            type="number" 
            name="price" 
            placeholder="Ingrese el precio" 
            value={form.price} 
            onChange={handleChange} 
            required 
          />
        </div>

        <div className="form-group">
          <label>Categoría</label>
          <select name="category" value={form.category} onChange={handleChange} required>
            <option value="">Seleccione una categoría</option>
            <option value="Rock">Rock</option>
            <option value="Pop">Pop</option>
            <option value="Jazz">Jazz</option>
            <option value="Hip-hop">Hip-hop</option>
          </select>
        </div>

        <div className="form-group">
          <label>Estado</label>
          <select name="status" value={form.status} onChange={handleChange} required>
            <option value="">Seleccione el estado</option>
            <option value="Nuevo">Nuevo</option>
            <option value="Usado">Usado</option>
          </select>
        </div>

        <div className="form-group">
          <label>Artista</label>
          <input 
            type="text" 
            name="artist" 
            placeholder="Nombre del artista" 
            value={form.artist} 
            onChange={handleChange} 
            required 
          />
        </div>

        <div className="form-group">
          <label>Año</label>
          <input 
            type="number" 
            name="year" 
            placeholder="Año de publicación" 
            value={form.year} 
            onChange={handleChange} 
            required 
          />
        </div>

        <div className="form-group">
          <label>Formato</label>
          <select name="format" value={form.format} onChange={handleChange} required>
            <option value="">Seleccione el formato</option>
            <option value="Vinilo">Vinilo</option>
            <option value="CD">CD</option>
            <option value="Cassette">Cassette</option>
          </select>
        </div>

        <div className="form-group">
          <label>Condición</label>
          <select name="condition" value={form.condition} onChange={handleChange} required>
            <option value="">Seleccione la condición</option>
            <option value="Excelente">Excelente</option>
            <option value="Muy Buena">Muy Buena</option>
            <option value="Buena">Buena</option>
            <option value="Regular">Regular</option>
          </select>
        </div>

        <button type="submit" className="submit-btn">Publicar Artículo</button>
      </form>
    </div>
  );
};

export default NewPublication;
