import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Carousel } from 'flowbite-react';
import CardAnnouce from '../../components/Card/CardAnnouce';

export default function AnnouncePage() {
  const [announces, setAnnounces] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchAnnounces = async () => {
      try {
        const response = await axios.get('http://localhost:8080/announces');
        setAnnounces(response.data);
      } catch (error) {
        console.error('Erreur lors de la récupération des annonces', error);
      }
    };

    fetchAnnounces();
  }, []);

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredAnnounces = announces.filter((announce) => {
    return (
      (selectedCategory ? announce.category === selectedCategory : true) &&
      (searchTerm ? announce.title.toLowerCase().includes(searchTerm.toLowerCase()) : true)
    );
  });

  return (
    <div className="bg-gray-100 min-h-screen">
      <main className="container mx-auto p-4">
        <h1 className="text-4xl font-bold text-center mb-8">Welcome to Le Coin Bon</h1>

        <div className="h-56 sm:h-64 xl:h-80 2xl:h-96 mb-8">
          <Carousel>
            <img src="https://flowbite.com/docs/images/carousel/carousel-1.svg" alt="..." />
            <img src="https://flowbite.com/docs/images/carousel/carousel-2.svg" alt="..." />
            <img src="https://flowbite.com/docs/images/carousel/carousel-3.svg" alt="..." />
            <img src="https://flowbite.com/docs/images/carousel/carousel-4.svg" alt="..." />
            <img src="https://flowbite.com/docs/images/carousel/carousel-5.svg" alt="..." />
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
            <p>Découvrez les dernières annonces pour l'été.</p>
          </div>
        </div>

        <hr className="my-8 border-gray-300 border-5 h-2 rounded-full bg-gray-300" />

        <h2 className="text-2xl font-bold mb-4 mt-5">Annonces</h2>

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
              <option value="Électronique">Électronique</option>
              <option value="Vêtements">Vêtements</option>
              <option value="Maison">Maison</option>
              <option value="Jardin">Jardin</option>
              <option value="Véhicules">Véhicules</option>
              <option value="Loisirs">Loisirs</option>
              <option value="Sport">Sport</option>
              <option value="Livres">Livres</option>
              <option value="Jeux">Jeux</option>
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
          {filteredAnnounces.map((announce) => (
            <CardAnnouce
              key={announce._id}
              id={announce._id}
              title={announce.title}
              description={announce.description}
              price={announce.price}
              category={announce.category}
              location={announce.location}
              images={announce.images}
              createdAt={new Date(announce.createdAt).toLocaleDateString()}
              user={announce.user.username}
            />
          ))}
        </div>
      </main>
    </div>
  );
}