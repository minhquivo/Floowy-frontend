import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SyncPage: React.FC = () => {
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const navigate = useNavigate();

  const syncOptions = [
    { id: 'calendar', label: 'Sync calendar', logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTfZRzn2OpNq-OaU1QGcrCL9HDxi6k-4HXAyg&s' },
    { id: 'playlists', label: 'Sync playlists', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/84/Spotify_icon.svg/1982px-Spotify_icon.svg.png' },
    { id: 'health', label: 'Sync health data', logo: 'https://i.pinimg.com/736x/f4/c9/a8/f4c9a88e93317977c3d0921b12309578.jpg' },
    { id: 'mental-health', label: 'Sync mental health record', logo: 'https://www.planstreetinc.com/wp-content/uploads/2021/07/what-is-mental-health.png' },
  ];

  const handleOptionToggle = (optionId: string) => {
    setSelectedOptions(prev => 
      prev.includes(optionId) 
        ? prev.filter(id => id !== optionId)
        : [...prev, optionId]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Syncing options:', selectedOptions);
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-zinc-900 to-black text-white flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8">
        <div className="flex flex-col items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-20 w-20 text-green-500 mb-2"
          >
            <path d="M9 18V5l12-2v13" />
            <circle cx="6" cy="18" r="3" />
            <circle cx="18" cy="16" r="3" />
          </svg>
          <h1 className="mt-6 text-3xl font-bold text-center">Sync your data for better recommendations</h1>
        </div>
        <form onSubmit={handleSubmit} className="mt-8 space-y-4">
          {syncOptions.map((option, index) => (
            <div key={option.id}>
              <button
                type="button"
                onClick={() => handleOptionToggle(option.id)}
                className={`relative w-full flex items-center px-3 py-2 text-sm font-medium ${
                  index === 0 ? 'rounded-t-md' : ''
                } ${
                  index === syncOptions.length - 1 ? 'rounded-b-md' : ''
                } ${
                  selectedOptions.includes(option.id)
                    ? 'bg-green-600 text-white'
                    : 'text-gray-300 hover:bg-zinc-700'
                } focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-zinc-900`}
              >
                <img src={option.logo} alt={`${option.label} logo`} className="w-9.5 h-10 mr-3" />
                {option.label}
              </button>
              {index !== syncOptions.length - 1 && (
                <div className="h-px bg-zinc-700" aria-hidden="true" />
              )}
            </div>
          ))}
          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
              Continue
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SyncPage;