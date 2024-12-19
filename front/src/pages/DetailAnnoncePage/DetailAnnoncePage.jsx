import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { Table } from 'flowbite-react';

export default function DetailAnnoncePage() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const id = queryParams.get('id');
  const [announce, setAnnounce] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAnnounce = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/announce/${id}`);
        setAnnounce(response.data);
      } catch (err) {
        setError('Failed to fetch announce details');
      } finally {
        setLoading(false);
      }
    };

    fetchAnnounce();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error || !announce) {
    return (
      <div className="container mx-auto p-4">
        <div className="bg-white shadow-md rounded p-4">
          <h1 className="text-3xl font-bold text-center text-red-500">L'annonce que vous cherchez n'existe pas</h1>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      {announce && (
        <div className="bg-white shadow-md rounded p-4 flex">
          <div className="w-1/2 pr-4">
            <img src={announce.images[0]} alt={announce.title} className="w-full h-64 object-cover rounded mb-4" />
            {announce.images.slice(1).map((image, index) => (
              <img key={index} src={image} alt={`${announce.title} ${index + 1}`} className="w-full h-32 object-cover rounded mb-4" />
            ))}
          </div>
          <div className="w-1/2 pl-4 border-l border-gray-300">
            <h1 className="text-3xl font-bold mb-4">{announce.title}</h1>
            <div className="overflow-x-auto">
              <Table>
                <Table.Body className="divide-y">
                  <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                    <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">Description</Table.Cell>
                    <Table.Cell>{announce.description}</Table.Cell>
                  </Table.Row>
                  <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                    <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">Prix</Table.Cell>
                    <Table.Cell>{announce.price}€</Table.Cell>
                  </Table.Row>
                  <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                    <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">Catégorie</Table.Cell>
                    <Table.Cell>{announce.category}</Table.Cell>
                  </Table.Row>
                  <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                    <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">Lieu</Table.Cell>
                    <Table.Cell>{announce.location}</Table.Cell>
                  </Table.Row>
                  <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                    <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">Publié par</Table.Cell>
                    <Table.Cell>{announce.user.username}</Table.Cell>
                  </Table.Row>
                  <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                    <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">Date de création</Table.Cell>
                    <Table.Cell>{new Date(announce.createdAt).toLocaleDateString()}</Table.Cell>
                  </Table.Row>
                </Table.Body>
              </Table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}