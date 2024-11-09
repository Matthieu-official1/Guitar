import React from 'react';
import { Mic, MicOff, Guitar } from 'lucide-react';
import TuningDial from './components/TuningDial';
import { usePitchDetection } from './hooks/usePitchDetection';

function App() {
  const { pitch, isListening, startListening, stopListening } = usePitchDetection();

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 text-white">
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Guitar className="w-12 h-12" />
            <h1 className="text-4xl font-bold">Guitar Tuner</h1>
          </div>
          <p className="text-lg text-gray-300">Professional-grade chromatic tuner for your browser</p>
        </header>

        <div className="max-w-2xl mx-auto bg-white/10 backdrop-blur-lg rounded-2xl p-8 shadow-2xl">
          <TuningDial 
            cents={pitch.cents} 
            note={pitch.note} 
            frequency={pitch.frequency} 
          />

          <div className="mt-8 flex justify-center">
            <button
              onClick={isListening ? stopListening : startListening}
              className={`
                flex items-center gap-2 px-6 py-3 rounded-full text-lg font-semibold
                transition-all duration-300 transform hover:scale-105
                ${isListening 
                  ? 'bg-red-500 hover:bg-red-600' 
                  : 'bg-green-500 hover:bg-green-600'}
              `}
            >
              {isListening ? (
                <>
                  <MicOff className="w-6 h-6" />
                  Stop Listening
                </>
              ) : (
                <>
                  <Mic className="w-6 h-6" />
                  Start Tuning
                </>
              )}
            </button>
          </div>

          <div className="mt-8 text-center text-gray-300 text-sm">
            <p>Standard Guitar Tuning: E2 - A2 - D3 - G3 - B3 - E4</p>
            <p className="mt-2">Click the button above and play a string to begin tuning</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;