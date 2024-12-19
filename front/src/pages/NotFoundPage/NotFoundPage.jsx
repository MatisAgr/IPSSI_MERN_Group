import React from 'react'
import { NavLink } from 'react-router-dom'

export default function NotFoundPage() {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="text-center">
        <h1 className="text-9xl font-bold text-gray-800">404</h1>
        <p className="text-2xl font-medium text-gray-600 mb-8">
          La page que vous recherchez n'existe pas.
        </p>
        <NavLink to="/" className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700">
          Retour à l'accueil
        </NavLink>
      </div>
    </div>
  )
}