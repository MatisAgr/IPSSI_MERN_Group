import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import CardAnnouce from '../../components/Card/CardAnnouce';

export default function CreateAnnouncePage() {

  const navigate = useNavigate();

  
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    images: '',
    owner: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8080/product/create', formData, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}` // Assuming you have a token stored in localStorage
        }
      });
      console.log(response.data);
      alert('Produit créé avec succès');
      navigate('/');
    } catch (error) {
      console.error('Erreur lors de la création du produit', error);
      alert('Erreur lors de la création du produit');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-4xl flex">
        <div className="w-1/2 pr-4">
          <h1 className="text-2xl font-bold mb-6">Créer un produit</h1>
          <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
              Nom
            </label>
            <input
              type="text"
              name="name"
              id="name"
              value={formData.name}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
                Description
              </label>
              <textarea
                name="description"
                id="description"
                value={formData.description}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="price">
                Prix
              </label>
              <input
                type="number"
                name="price"
                id="price"
                value={formData.price}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="category">
                Catégorie
              </label>
              <select
                name="category"
                id="category"
                value={formData.category}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
              >
                <option value="">Sélectionnez une catégorie</option>
                <option value="Suppléments">Suppléments</option>
                <option value="Vêtements">Vêtements</option>
                <option value="Pré-entrainement">Pré-entrainement</option>
                <option value="Salon">Salon</option>
                <option value="SARMs">SARMs</option>
                <option value="Loisirs">Loisirs</option>
                <option value="Machine">Machine</option>
                <option value="Livres">Livres</option>
                <option value="Autres">Autres</option>
              </select>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="images">
                Image (URL)
              </label>
              <input
                type="text"
                name="images"
                id="images"
                value={formData.images}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
              />
            </div>
            <div className="flex items-center justify-between">
              <button
                type="submit"
                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Créer
              </button>
            </div>
          </form>
        </div>
        <div className="w-1/2 pl-4">
          <h2 className="text-xl font-bold mb-4">Aperçu du produit</h2>
          <CardAnnouce
            title={formData.name}
            description={formData.description}
            price={formData.price}
            category={formData.category}
            images={[formData.images]}
            user="Vous"
          />
        </div>
      </div>
    </div>
  );
}