import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { Table } from 'flowbite-react';

export default function DetailAnnoncePage() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const id = queryParams.get('id');
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/product/get/${id}`);
        console.log(response.data.product);
        setProduct(response.data.product);
        try {
          const repUserById = await axios.get(`http://localhost:8080/user/getid/${response.data.product.owner}`);
          console.log(repUserById.data);
          setProduct(prevProduct => ({ ...prevProduct, owner: repUserById.data }));
        } catch (error) {
          console.error('Erreur lors de la récupération du propriétaire', error);
          alert('Erreur lors de la récupération du propriétaire');
        }  
      } catch (err) {
        setError('Failed to fetch product details');
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error || !product) {
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
      {product && (
        <div className="bg-white shadow-md rounded p-4 flex">
          <div className="w-1/2 pr-4">
            {product.images && product.images.length > 0 && (
              <>
                <img src={product.images[0]} alt={product.name} className="w-full h-64 object-cover rounded mb-4" />
                {product.images.slice(1).map((image, index) => (
                  <img key={index} src={image} alt={`${product.name} ${index + 1}`} className="w-full h-32 object-cover rounded mb-4" />
                ))}
              </>
            )}
          </div>
          <div className="w-1/2 pl-4 border-l border-gray-300">
            <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
            <div className="overflow-x-auto">
              <Table>
                <Table.Body className="divide-y">
                  <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                    <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">Description</Table.Cell>
                    <Table.Cell>{product.description}</Table.Cell>
                  </Table.Row>
                  <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                    <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">Prix</Table.Cell>
                    <Table.Cell>{product.price}€</Table.Cell>
                  </Table.Row>
                  <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                    <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">Catégorie</Table.Cell>
                    <Table.Cell>{product.category}</Table.Cell>
                  </Table.Row>
                  <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                    <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">Publié par</Table.Cell>
                    <Table.Cell>{product.owner.username}</Table.Cell>
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