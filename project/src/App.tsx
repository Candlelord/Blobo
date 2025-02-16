import React from 'react';
import { Toaster } from 'react-hot-toast';
import Sidebar from './components/Sidebar';
import MainContent from './components/MainContent';
import { useStore } from './store';

function App() {
  const darkMode = useStore((state) => state.darkMode);

  return (
    <div className={`min-h-screen font-vt323 ${
      darkMode ? 'dark bg-retro-bg text-retro-text' : 'bg-gray-100 text-gray-900'
    }`}>
      <div className="container mx-auto p-4 flex gap-4 h-screen">
        <Sidebar />
        <MainContent />
      </div>
      <Toaster 
        position="top-right"
        toastOptions={{
          className: 'retro-border',
          style: {
            fontFamily: 'VT323, monospace',
            fontSize: '1.2rem',
          },
        }}
      />
    </div>
  );
}

export default App;