import './App.css';
import { useState, useEffect, useRef } from 'react';
import PercentageCalculator from './components/PercentageCalculator';
import BmiCalculator from './components/BmiCalculator';
import LoanCalculator from './components/LoanCalculator';
import FuelCalculator from './components/FuelCalculator';
import { CSSTransition, SwitchTransition } from 'react-transition-group';
import { SpeedInsights } from "@vercel/speed-insights/react";

const getSystemDark = () =>
  window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;

function App() {
  const [activeTab, setActiveTab] = useState('percentage');
  const [darkMode, setDarkMode] = useState(getSystemDark());
  const [lang, setLang] = useState('hr');

  useEffect(() => {
    document.body.className = darkMode ? 'dark' : '';
  }, [darkMode]);

  useEffect(() => {
    const listener = e => setDarkMode(e.matches);
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', listener);
    return () =>
      window.matchMedia('(prefers-color-scheme: dark)').removeEventListener('change', listener);
  }, []);

  // Dodaj referencu za animirani sadržaj
  const nodeRef = useRef(null);

  return (
    <div className={`main-layout${darkMode ? ' dark' : ''}`}>
      {/* Lijeva reklama */}
      <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2508471855002470"
     crossorigin="anonymous"></script>
      {/* Glavni sadržaj */}
      <div className={`App${darkMode ? ' dark' : ''}`}>
        <div className="navbar">
          <div className="navbar-title">
            {lang === 'hr' ? 'Višestruki kalkulatori' : 'Multi Calculator'}
          </div>
          <div className="navbar-actions">
            <button
              className="navbar-btn"
              aria-label={lang === 'hr' ? 'Promijeni jezik' : 'Change language'}
              onClick={() => setLang(lang === 'hr' ? 'en' : 'hr')}
            >
              {lang === 'hr' ? 'EN' : 'HR'}
            </button>
            <button
              className="navbar-btn"
              onClick={() => setDarkMode(m => !m)}
              title={darkMode ? 'Svijetli način' : 'Tamni način'}
            >
              {darkMode ? '🌞' : '🌙'}
            </button>
          </div>
        </div>
        <div className="tabs">
          <button
            className={`tab-btn${activeTab === 'percentage' ? ' active' : ''}${darkMode ? ' dark' : ''}`}
            onClick={() => setActiveTab('percentage')}
          >
            {lang === 'hr' ? 'Postotak' : 'Percentage'}
          </button>
          <button
            className={`tab-btn${activeTab === 'bmi' ? ' active' : ''}${darkMode ? ' dark' : ''}`}
            onClick={() => setActiveTab('bmi')}
          >
            {lang === 'hr' ? 'BMI' : 'BMI'}
          </button>
          <button
            className={`tab-btn${activeTab === 'loan' ? ' active' : ''}${darkMode ? ' dark' : ''}`}
            onClick={() => setActiveTab('loan')}
          >
            {lang === 'hr' ? 'Kredit' : 'Loan'}
          </button>
          <button
            className={`tab-btn${activeTab === 'fuel' ? ' active' : ''}${darkMode ? ' dark' : ''}`}
            onClick={() => setActiveTab('fuel')}
          >
            {lang === 'hr' ? 'Gorivo' : 'Fuel'}
          </button>
        </div>
        <SwitchTransition>
          <CSSTransition
            key={activeTab}
            timeout={300}
            classNames="fade"
            nodeRef={nodeRef}
          >
            <div ref={nodeRef}>
              {activeTab === 'percentage' && <PercentageCalculator lang={lang} />}
              {activeTab === 'bmi' && <BmiCalculator lang={lang} />}
              {activeTab === 'loan' && <LoanCalculator lang={lang} />}
              {activeTab === 'fuel' && <FuelCalculator lang={lang} />}
            </div>
          </CSSTransition>
        </SwitchTransition>

        {/* O aplikaciji sekcija */}
        <div style={{
          marginTop: 32,
          padding: 16,
          borderRadius: 10,
          background: darkMode ? '#23272f' : '#f1f1f1',
          color: darkMode ? '#eee' : '#222',
          fontSize: 16
        }}>
          <h2>{lang === 'hr' ? 'O aplikaciji' : 'About the app'}</h2>
          <p>
            {lang === 'hr' ? 'Ova web aplikacija nudi najčešće korištene kalkulatore na jednom mjestu: postotak, BMI, kredit i potrošnju goriva. Cilj je omogućiti brze i jednostavne izračune bez registracije i dodatnih komplikacija.' : 'This web app offers the most commonly used calculators in one place: percentage, BMI, loan, and fuel consumption. The aim is to provide quick and easy calculations without registration and additional complications.'}
          </p>
          <p>
            {lang === 'hr' ? 'Autor: ' : 'Author: '}<b>Filip Marić</b> &middot; Kontakt:  <a href="mailto:fmitprog@gmail.com">fmitprog@gmail.com</a>
          </p>
          <p>
            {lang === 'hr' ? 'Za prijedloge novih kalkulatora ili poboljšanja, slobodno nam se javite!' : 'For suggestions of new calculators or improvements, feel free to contact us!'}
          </p>
        </div>
      </div>
      {/* Desna reklama aa*/}
      <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2508471855002470"
     crossorigin="anonymous"></script>
     <SpeedInsights />
    </div>
  );
}

export default App;
