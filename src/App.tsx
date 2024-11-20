import React from 'react';
import { Header } from './components/Header';
import { ServiceList } from './components/ServiceList';

const MOCK_LISTS = [
  {
    id: '1',
    title: 'Cloud Storage Solutions',
    description: 'Comparison of various cloud storage providers including features, pricing, and security aspects.',
    services: 8,
    votes: 124,
    collaborators: 5,
    lastUpdated: '2h ago'
  },
  {
    id: '2',
    title: 'Email Marketing Tools',
    description: 'Comprehensive analysis of email marketing platforms with automation capabilities.',
    services: 12,
    votes: 89,
    collaborators: 3,
    lastUpdated: '1d ago'
  },
  {
    id: '3',
    title: 'Project Management Software',
    description: 'Evaluation of project management tools focusing on team collaboration features.',
    services: 15,
    votes: 256,
    collaborators: 7,
    lastUpdated: '3h ago'
  },
  {
    id: '4',
    title: 'Design Tools',
    description: 'Comparison of popular design and prototyping tools for UI/UX designers.',
    services: 10,
    votes: 167,
    collaborators: 4,
    lastUpdated: '5h ago'
  },
  {
    id: '5',
    title: 'Analytics Platforms',
    description: 'Analysis of web and mobile analytics solutions with their key features.',
    services: 6,
    votes: 92,
    collaborators: 2,
    lastUpdated: '2d ago'
  }
];

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Your Lists</h2>
            <p className="mt-1 text-sm text-gray-500">
              Manage and organize your service evaluations
            </p>
          </div>
        </div>

        <ServiceList lists={MOCK_LISTS} />
      </main>
    </div>
  );
}

export default App;