import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CardAnnouce from '../../components/Card/CardAnnouce';
import { Modal, Button, Label, TextInput, Textarea, Select } from 'flowbite-react';

export default function ProfilePage() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [editAnnounceMode, setEditAnnounceMode] = useState(false);
  const [announces, setAnnounces] = useState([]);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [announceData, setAnnounceData] = useState({
    id: '',
    title: '',
    description: '',
    price: '',
    category: '',
    images: '',
  });

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://Groupe5backnode-env.eba-52t5k2gf.eu-north-1.elasticbeanstalk.com:8080/user/get/me', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        console.log(response.data.userProfile);
        setUser(response.data.userProfile);
        setFormData({
          username: response.data.userProfile.username,
          email: response.data.userProfile.email,
          password: '',
          confirmPassword: ''
        });
      } catch (err) {
        setError('Failed to fetch user profile');
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, []);

  // get all announces by user
  useEffect(() => {
    const fetchAnnounces = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://Groupe5backnode-env.eba-52t5k2gf.eu-north-1.elasticbeanstalk.com:8080/product/myproduct', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setAnnounces(response.data);
      } catch (error) {
        console.error('Erreur lors de la récupération des annonces', error);
      }
    };

    fetchAnnounces();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    try {
      const token = localStorage.getItem('token');
      const response = await axios.put('http://Groupe5backnode-env.eba-52t5k2gf.eu-north-1.elasticbeanstalk.com:8080/user/update/me', formData, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setUser(response.data);
      setEditMode(false);
      alert('Profile updated successfully');
    } catch (err) {
      setError('Failed to update profile');
    }
  };

  // edit announce
  const handleEditAnnounce = async (announce) => {
    setEditAnnounceMode(true);
    setAnnounceData({
      id: announce._id,
      name: announce.name,
      description: announce.description,
      price: announce.price,
      category: announce.category,
      images: announce.images
    });
  };

  const handleAnnounceChange = (e) => {
    const { name, value } = e.target;
    setAnnounceData({
      ...announceData,
      [name]: value
    });
  };

  const handleAnnounceSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const response = await axios.put(`http://Groupe5backnode-env.eba-52t5k2gf.eu-north-1.elasticbeanstalk.com:8080/product/update/${announceData.id}`, announceData, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setAnnounces(announces.map(announce => announce._id === announceData.id ? response.data : announce));
      setEditAnnounceMode(false);
      alert('Annonce mise à jour avec succès');
      window.location.reload();
    } catch (err) {
      setError('Failed to update announce');
    }
  };


  // annouce delete
  const handleDelete = async (announceId) => {
    const confirmed = window.confirm('Êtes-vous sûr de vouloir supprimer cette annonce ?');
    if (!confirmed) {
      return;
    }

    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://Groupe5backnode-env.eba-52t5k2gf.eu-north-1.elasticbeanstalk.com:8080/product/delete/${announceId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setAnnounces(announces.filter(announce => announce._id !== announceId));
      alert('Annonce supprimée avec succès');
    } catch (err) {
      setError('Failed to delete announce');
    }
  };

  // user delete
  const handleDeleteAccount = async () => {
    const confirmed = window.confirm('Êtes-vous sûr de vouloir supprimer votre compte ? Cette action est irréversible.');
    if (!confirmed) {
      return;
    }

    try {
      const token = localStorage.getItem('token');
      await axios.delete('http://Groupe5backnode-env.eba-52t5k2gf.eu-north-1.elasticbeanstalk.com:8080/user/delete/me', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      alert('Compte supprimé avec succès');
      localStorage.removeItem('token');
      window.location.href = '/login'; // Rediriger vers la page de connexion après suppression du compte
    } catch (err) {
      setError('Failed to delete account');
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div className="container mx-auto p-4"><div className="bg-white shadow-md rounded p-4"><h1 className="text-3xl font-bold text-center text-red-500">{error}</h1></div></div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold mb-4 text-white">Profile Page</h1>
      {user && (
        <div className="bg-white shadow-md rounded p-4">
          {editMode ? (
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                  Username
                </label>
                <input
                  type="text"
                  name="username"
                  id="username"
                  value={formData.username}
                  onChange={handleChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                  New Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="confirmPassword">
                  Confirm New Password
                </label>
                <input
                  type="password"
                  name="confirmPassword"
                  id="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              <div className="flex items-center justify-between">
                <button
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                  Save Changes
                </button>
                <button
                  type="button"
                  onClick={() => setEditMode(false)}
                  className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                  Cancel
                </button>
              </div>
            </form>
          ) : (
            <>
              <p><strong>Username:</strong> {user.username}</p>
              <p><strong>Email:</strong> {user.email}</p>
              <p><strong>Joined:</strong> {new Date(user.createdAt).toLocaleDateString()}</p>
              <button
                onClick={() => setEditMode(true)}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-4"
              >
                Edit Profile
              </button>
              <button
                onClick={handleDeleteAccount}
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 mx-5 rounded focus:outline-none focus:shadow-outline mt-4"
              >
                Delete Account
              </button>
            </>
          )}
        </div>
      )}

      <h2 className="text-3xl font-bold mt-8 mb-4 text-white">Your Announcements</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {announces.map((announce) => (
          <div key={announce._id} className="relative">
            <span className="absolute top-0 left-0 bg-blue-500 text-white font-bold py-1 px-2 rounded">
              id : {announce._id}
            </span>
            <div className="absolute top-0 right-0 flex space-x-2">
              <button
                onClick={() => handleDelete(announce._id)}
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
              >
                Delete
              </button>
              <button
                onClick={() => handleEditAnnounce(announce)}
                className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-1 px-2 rounded"
              >
                Edit
              </button>
            </div>
            <CardAnnouce
              id={announce._id}
              title={announce.name}
              description={announce.description}
              price={announce.price}
              category={announce.category}
              images={announce.images}
              createdAt={new Date(announce.createdAt).toLocaleDateString()}
              user={user.username}
            />
          </div>        
        ))}
      </div>

      {editAnnounceMode && (
        <Modal show={editAnnounceMode} onClose={() => setEditAnnounceMode(false)}>
        <Modal.Header>Edit Announcement</Modal.Header>
        <Modal.Body>
          <form onSubmit={handleAnnounceSubmit}>
            <div className="mb-4">
              <Label htmlFor="name" value="Name" />
              <TextInput
                id="name"
                name="name"
                value={announceData.name}
                onChange={handleAnnounceChange}
                required
              />
            </div>
            <div className="mb-4">
              <Label htmlFor="description" value="Description" />
              <Textarea
                id="description"
                name="description"
                value={announceData.description}
                onChange={handleAnnounceChange}
                required
              />
            </div>
            <div className="mb-4">
              <Label htmlFor="price" value="Prix" />
              <TextInput
                id="price"
                name="price"
                type="number"
                value={announceData.price}
                onChange={handleAnnounceChange}
                required
              />
            </div>
            <div className="mb-4">
              <Label htmlFor="category" value="Catégorie" />
              <Select
                id="category"
                name="category"
                value={announceData.category}
                onChange={handleAnnounceChange}
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
              </Select>
            </div>
            <div className="mb-4">
              <Label htmlFor="images" value="Image (URL)" />
              <TextInput
                id="images"
                name="images"
                value={announceData.images}
                onChange={handleAnnounceChange}
              />
            </div>
            <div className="flex items-center justify-end">
              <Button type="submit">Save Changes</Button>
              <Button color="gray" onClick={() => setEditAnnounceMode(false)} className="ml-2">
                Cancel
              </Button>
            </div>
          </form>
        </Modal.Body>
      </Modal>
      )}


    </div>
  );
}