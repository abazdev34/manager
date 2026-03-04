import React, { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw, ChevronRight } from 'lucide-react';
import './App.scss'; // SCSS файлын импорттоо

const exercises = [
  { id: 1, name: "Моюнду айлантуу", duration: 180, part: "Моюн" },
  { id: 2, name: "Колдорду тегеретүү", duration: 240, part: "Кол" },
  { id: 3, name: "Белди айлантуу", duration: 240, part: "Бел" },
  { id: 4, name: "Түз эңкейүү", duration: 240, part: "Арка" },
  { id: 5, name: "Отуруп-туруу", duration: 180, part: "Бут" },
  { id: 6, name: "Орунда басуу", duration: 120, part: "Жалпы" }
];

export default function App() {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [timeLeft, setTimeLeft] = useState(exercises[0].duration);
  const [isActive, setIsActive] = useState(false);

  const speak = (text) => {
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'ru-RU';
    window.speechSynthesis.speak(utterance);
  };

  useEffect(() => {
    let timer = null;
    if (isActive && timeLeft > 0) {
      timer = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
    } else if (timeLeft === 0) {
      handleNext();
    }
    return () => clearInterval(timer);
  }, [isActive, timeLeft]);

  const handleNext = () => {
    const nextIdx = (currentIdx + 1) % exercises.length;
    setCurrentIdx(nextIdx);
    setTimeLeft(exercises[nextIdx].duration);
    speak("Кийинки: " + exercises[nextIdx].name);
  };

  return (
    <div className="fitness-container">
      <div className="card">
        <h1>Кечки Машыгуу</h1>
        <p className="subtitle">20 МҮНӨТ • ШАЙМАНСЫЗ</p>

        <div className="timer-box">
          <div className="time">
            {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}
          </div>
          <div className="label">калды</div>
        </div>

        <div className="ex-info">
          <span className="part">{exercises[currentIdx].part}</span>
          <h2>{exercises[currentIdx].name}</h2>
        </div>

        <div className="controls">
          <button onClick={() => setTimeLeft(exercises[currentIdx].duration)}>
            <RotateCcw size={24} />
          </button>
          
          <button className="play-btn" onClick={() => {
            if(!isActive) speak("Баштайбыз: " + exercises[currentIdx].name);
            setIsActive(!isActive);
          }}>
            {isActive ? <Pause size={30} fill="white" /> : <Play size={30} fill="white" />}
          </button>

          <button onClick={handleNext}>
            <ChevronRight size={24} />
          </button>
        </div>
      </div>
    </div>
  );
}
