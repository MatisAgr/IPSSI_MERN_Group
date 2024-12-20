import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Carousel } from 'flowbite-react';
import CardAnnouce from '../../components/Card/CardAnnouce';
import Logo from '../../pics/finalFormLogoNoBg.png';
import Image1 from '../../pics/manThink.jpg';
import Image2 from '../../pics/bigSchwarzy.jpg';
import Image3 from '../../pics/cBumMoon.jpg';
import Image4 from '../../pics/ronnieColeman.png';
import Image5 from '../../pics/ippoMatch.jpg';

export default function AnnouncePage() {
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:8080/product/get');
        setProducts(response.data.products || []); // Ensure response data is an array
      } catch (error) {
        console.error('Erreur lors de la récupération des produits', error);
      }
    };

    fetchProducts();
  }, []);

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredProducts = Array.isArray(products) ? products.filter((product) => {
    return (
      (selectedCategory ? product.category === selectedCategory : true) &&
      (searchTerm ? product.name.toLowerCase().includes(searchTerm.toLowerCase()) : true)
    );
  }) : [];

  return (
    <div className="bg-grey-900 min-h-screen">
      <main className="container mx-auto p-4">
        <img src={Logo} className='block mx-auto w-40' />
        <h1 className="text-5xl font-bold text-center mb-8 text-white">WebLift</h1>

        <div className="h-56 sm:h-64 xl:h-80 2xl:h-96 mb-8">
          <Carousel>
            <img src={Image1} alt="..." className='object-cover object-top w-full h-full' />
            <img src={Image2} alt="..." className='object-cover object-top w-full h-full' />
            <img src={Image3} alt="..." className='object-cover object-top w-full h-full' />
            <img src={Image4} alt="..." className='object-cover object-top w-full h-full' />
            <img src={Image5} alt="..." className='object-cover object-top w-full h-full' />
          </Carousel> 
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white p-4 rounded shadow">
            <h2 className="text-xl font-bold mb-2">Noël</h2>
            <p>Découvrez les dernières annonces pour Noël.</p>
          </div>
          <div className="bg-white p-4 rounded shadow">
            <h2 className="text-xl font-bold mb-2">Printemps</h2>
            <p>Explorez les dernières annonces pour le printemps.</p>
          </div>
          <div className="bg-white p-4 rounded shadow">
            <h2 className="text-xl font-bold mb-2">Été</h2>
            <p>Découvrez les dernières produits pour l'été.</p>
          </div>
        </div>

        <hr className="my-8 border-gray-300 border-5 h-2 rounded-full bg-gray-300" />

        <h2 className="text-2xl font-bold mb-4 mt-5 text-white">Produits</h2>

        <div className="mb-4 flex space-x-4 bg-gray-500 p-4 rounded-2xl shadow">
          <div>
            <label htmlFor="category" className="block text-sm font-medium text-gray-200">
              Filtrer par catégorie
            </label>
            <select
              id="category"
              name="category"
              value={selectedCategory}
              onChange={handleCategoryChange}
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
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

          <div>
            <label htmlFor="search" className="block text-sm font-medium text-gray-200">
              Rechercher par nom
            </label>
            <input
              type="text"
              id="search"
              name="search"
              value={searchTerm}
              onChange={handleSearchChange}
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
              placeholder="Rechercher..."
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
          {filteredProducts.map((product) => (
            <CardAnnouce
              key={product._id}
              id={product._id}
              title={product.name}
              description={product.description}
              price={product.price}
              category={product.category}
              images={product.images}
              user={product.owner.username}
            />
          ))}
        </div>
      </main>
    </div>
  );
}