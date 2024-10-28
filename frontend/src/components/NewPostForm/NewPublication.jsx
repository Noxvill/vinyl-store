import React, { useState, useContext } from 'react';
import { GlobalContext } from '../Context/GlobalContext';
import userprofile from '../../assets/emptyuser.png'; // Imagen predeterminada
import './NewPublication.css';

const NewPublication = () => {
  const { createProduct, user } = useContext(GlobalContext); // Acceder a los datos del usuario
  const [form, setForm] = useState({
    titulo: '', 
    description: '',
    price: '',
    category: '',
    status: '',
    artist: '',
    year: '',
    format: '',
    condition: '',
    imageUrl: '' 
  });

  const [message, setMessage] = useState(''); 
  const [isModalOpen, setModalOpen] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const productData = {
      titulo: form.titulo, 
      descripcion: form.description,
      precio: form.price,
      categoria_id: form.category, 
      artista: form.artist,
      ano: form.year,
      formato: form.format,
      condicion: form.condition,
      imagen_url: form.imageUrl,
    };

    try {
      await createProduct(productData); 
      setMessage('Producto publicado con éxito');
    } catch (error) {
      setMessage('No fue posible realizar la publicación del producto');
    }

    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <div className="new-publication-container">
      <h1>Vender Artículo</h1>
      <div className="user-info">
        {/* Mostrar la foto y el nombre del usuario logueado, o una imagen y nombre predeterminados si no está logueado */}
        <img 
          src={user && user.foto_perfil ? user.foto_perfil : userprofile} 
          alt="Usuario" 
          className="user-img" 
        />
        <h2>{user ? user.nombre : 'Usuario'}</h2>
      </div>

      <form className="new-publication-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Título</label>
          <input 
            type="text" 
            name="titulo"
            placeholder="Escribe el título del artículo"
            value={form.titulo} 
            onChange={handleChange} 
            required 
          />
        </div>
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
          <label>URL de la Foto</label>
          <input 
            type="text" 
            name="imageUrl" 
            placeholder="Ingrese la URL de la imagen" 
            value={form.imageUrl} 
            onChange={handleChange} 
            required 
          />
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
            <option value="1">Rock</option>
            <option value="2">Pop</option>
            <option value="3">Jazz</option>
            <option value="4">Hip-hop</option>
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

      {/* Modal para mostrar el mensaje */}
      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <h2>{message}</h2>
            <button onClick={closeModal}>Cerrar</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default NewPublication;
