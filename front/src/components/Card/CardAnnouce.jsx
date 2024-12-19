import React from 'react';
import { Link } from 'react-router-dom';

export default function CardAnnouce({ id, title, description, price, category, location, images, createdAt, user }) {
  return (
    <div className="w-full rounded-3xl overflow-hidden shadow-lg bg-white">
      {images[0] && (
        <img className="w-full max-h-48 object-cover" src={images[0]} alt="Image de l'annonce" />
      )}
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{title}</div>
        <p className="text-gray-700 text-base line-clamp-3 overflow-hidden">{description}</p>
      </div>
      <div className="px-6 pt-4 pb-2">
        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">Prix: {price}€</span>
        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">Catégorie: {category}</span>
        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">Lieu: {location}</span>
      </div>
      <div className="px-6 pt-4 pb-2">
        <span className="text-gray-600 text-sm">Publié par: {user}</span>
        <span className="text-gray-600 text-sm float-right">Le: {createdAt}</span>
      </div>
      <div className="px-6 py-4">
      <Link to={id ? `/announce/detail?id=${id}` : '#'}>
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Voir l'annonce
          </button>
        </Link>
      </div>
    </div>
  );
}