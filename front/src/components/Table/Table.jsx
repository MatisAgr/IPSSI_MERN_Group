import React from 'react';

export default function Table({ data }) {
  if (!data || data.length === 0) {
    return <div>Aucune donnée disponible</div>;
  }

  const headers = Object.keys(data[0]);

  return (
    <table className="min-w-full bg-white rounded-2xl overflow-hidden shadow-lg">
      <thead>
        <tr>
          {headers.map((header) => (
            <th key={header} className="py-2 px-4 border-b border-gray-200 bg-gray-100 text-left text-sm leading-4 text-gray-600 uppercase tracking-wider">
              {header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row, rowIndex) => (
          <tr key={rowIndex} className="hover:bg-gray-100">
            {headers.map((header) => (
              <td key={header} className="py-2 px-4 border-b border-gray-200">
                {row[header]}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}