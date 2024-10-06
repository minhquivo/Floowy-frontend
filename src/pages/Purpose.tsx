import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const PurposePage: React.FC = ({}) => {
  const [selectedPurpose, setSelectedPurpose] = useState<string | null>(null);
  const navigate = useNavigate();

  const purposes = [
    { id: 'daily-work', label: 'Daily Work' },
    { id: 'destressing', label: 'Destressing' },
    { id: 'mood-boosting', label: 'Mood Boosting' },
    { id: 'exploring', label: "I'm Just Exploring" },
  ];

  const handlePurposeSelect = (purposeId: string) => {
    setSelectedPurpose(purposeId);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedPurpose) {
      // Here you would typically save the user's purpose choice
      console.log('Selected purpose:', selectedPurpose);
      // Navigate to the next page (e.g., dashboard or home)
      navigate('/sync');
    }
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
          <h1 className="mt-6 text-3xl font-bold">Hello!</h1>
          <p className="mt-2 text-sm text-gray-400">What would you like to use Floowy for?</p>
        </div>
        <form onSubmit={handleSubmit} className="mt-8 space-y-4">
          {purposes.map((purpose, index) => (
            <div key={purpose.id}>
              <button
                type="button"
                onClick={() => handlePurposeSelect(purpose.id)}
                className={`relative w-full flex items-center px-3 py-2 text-sm font-medium ${
                  index === 0 ? 'rounded-t-md' : ''
                } ${
                  index === purposes.length - 1 ? 'rounded-b-md' : ''
                } ${
                  selectedPurpose === purpose.id
                    ? 'bg-green-600 text-white'
                    : 'text-gray-300 hover:bg-zinc-700'
                } focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-zinc-900`}
              >
                {purpose.label}
              </button>
              {index !== purposes.length - 1 && (
                <div className="h-px bg-zinc-700" aria-hidden="true" />
              )}
            </div>
          ))}
          <div>
            <button
              type="submit"
              disabled={!selectedPurpose}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:bg-zinc-600 disabled:cursor-not-allowed"
            >
              Continue
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PurposePage;