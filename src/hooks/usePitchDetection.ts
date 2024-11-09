import { useState, useEffect } from 'react';
import * as Tone from 'tone';

const A4 = 440;
const NOTES = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];

const getNoteFromFrequency = (frequency: number) => {
  const halfStepsBelowA4 = Math.round(12 * Math.log2(frequency / A4));
  const octave = Math.floor((halfStepsBelowA4 + 69) / 12);
  const noteIndex = (halfStepsBelowA4 + 69) % 12;
  return `${NOTES[noteIndex]}${octave}`;
};

const getCents = (frequency: number, note: string) => {
  const noteFreq = Tone.Frequency(note).toFrequency();
  return 1200 * Math.log2(frequency / noteFreq);
};

export const usePitchDetection = () => {
  const [pitch, setPitch] = useState<{ frequency: number; note: string; cents: number }>({
    frequency: 0,
    note: '',
    cents: 0
  });
  const [isListening, setIsListening] = useState(false);

  const startListening = async () => {
    try {
      await Tone.start();
      const mic = new Tone.UserMedia();
      const pitch = new Tone.PitchDetect();
      
      mic.connect(pitch);
      
      pitch.on('pitch', (frequency) => {
        if (frequency) {
          const note = getNoteFromFrequency(frequency);
          const cents = getCents(frequency, note);
          setPitch({ frequency, note, cents });
        }
      });

      await mic.open();
      setIsListening(true);
    } catch (error) {
      console.error('Error accessing microphone:', error);
    }
  };

  const stopListening = () => {
    Tone.Transport.stop();
    setIsListening(false);
  };

  useEffect(() => {
    return () => {
      stopListening();
    };
  }, []);

  return { pitch, isListening, startListening, stopListening };
};