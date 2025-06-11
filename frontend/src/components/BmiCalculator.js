import React, { useState } from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

function BmiCalculator({ lang }) {
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [bmi, setBmi] = useState(null);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);

  const t = {
    hr: {
      title: 'BMI kalkulator',
      desc: 'Izračunajte indeks tjelesne mase (BMI) na temelju svoje težine i visine.',
      weight: 'Težina (kg)',
      height: 'Visina (cm)',
      calc: 'Izračunaj',
      error1: 'Molimo unesite obje vrijednosti.',
      error2: 'Vrijednosti moraju biti pozitivni brojevi.',
      result: 'BMI',
      copy: 'Kopiraj rezultat',
      copied: 'Kopirano!',
      table: 'Tablica BMI kategorija',
      faq1q: 'Što je BMI?',
      faq1a: 'BMI (Body Mass Index) je pokazatelj odnosa tjelesne mase i visine.',
      faq2q: 'Zašto je BMI važan?',
      faq2a: 'Pomaže u procjeni rizika od bolesti povezanih s prekomjernom ili nedovoljnom težinom.',
      cat1: 'Pothranjenost',
      cat2: 'Normalna težina',
      cat3: 'Prekomjerna težina',
      cat4: 'Pretilost'
    },
    en: {
      title: 'BMI Calculator',
      desc: 'Calculate your Body Mass Index (BMI) based on your weight and height.',
      weight: 'Weight (kg)',
      height: 'Height (cm)',
      calc: 'Calculate',
      error1: 'Please enter both values.',
      error2: 'Values must be positive numbers.',
      result: 'BMI',
      copy: 'Copy result',
      copied: 'Copied!',
      table: 'BMI Categories Table',
      faq1q: 'What is BMI?',
      faq1a: 'BMI (Body Mass Index) is an indicator of the ratio between body mass and height.',
      faq2q: 'Why is BMI important?',
      faq2a: 'It helps assess the risk of diseases related to overweight or underweight.',
      cat1: 'Underweight',
      cat2: 'Normal weight',
      cat3: 'Overweight',
      cat4: 'Obesity'
    }
  }[lang];

  const calculate = () => {
    setError('');
    setBmi(null);
    setCopied(false);

    if (weight === '' || height === '') {
      setError(t.error1);
      return;
    }
    if (isNaN(weight) || isNaN(height) || Number(weight) <= 0 || Number(height) <= 0) {
      setError(t.error2);
      return;
    }

    const h = height / 100;
    setBmi((weight / (h * h)).toFixed(2));
  };

  const handleCopy = () => {
    if (bmi !== null) {
      navigator.clipboard.writeText(`${t.result}: ${bmi}`);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    }
  };

  // Dodaj funkciju za određivanje boje prema BMI vrijednosti
  const getBmiColor = (bmi) => {
    if (bmi < 18.5) return '#2196f3'; // plava
    if (bmi < 25) return '#43a047';   // zelena
    if (bmi < 30) return '#ffa000';   // narančasta
    return '#e53935';                 // crvena
  };

  return (
    <div>
      <h2>{t.title}</h2>
      <p>{t.desc}</p>
      <input
        type="number"
        placeholder={t.weight}
        value={weight}
        onChange={e => setWeight(e.target.value)}
      />
      <input
        type="number"
        placeholder={t.height}
        value={height}
        onChange={e => setHeight(e.target.value)}
      />
      <button className="calc-btn" onClick={calculate} aria-label={t.calc}>
        {t.calc}
      </button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {bmi !== null && (
        <div>
          <div style={{ width: 120, margin: '24px auto' }}>
            <CircularProgressbar
              value={Math.min(bmi, 40)}
              maxValue={40}
              text={bmi}
              styles={buildStyles({
                textColor: getBmiColor(bmi),
                pathColor: getBmiColor(bmi),
                trailColor: '#eee',
              })}
            />
            <div style={{ textAlign: 'center', marginTop: 8, fontSize: 14 }}>
              BMI vizualizacija (max 40)
            </div>
          </div>
          <p>{t.result}: {bmi}</p>
          <button onClick={handleCopy} aria-label={t.copy}>{t.copy}</button>
          <button onClick={() => window.print()} style={{marginLeft: 8}} aria-label={lang === 'hr' ? 'Ispiši' : 'Print'}>
            {lang === 'hr' ? 'Ispiši' : 'Print'}
          </button>
          {copied && <span style={{ color: 'green', marginLeft: 10 }}>{t.copied}</span>}
        </div>
      )}

      <hr />

      <h3>{t.table}</h3>
      <ul>
        <li>&lt; 18.5: {t.cat1}</li>
        <li>18.5 – 24.9: {t.cat2}</li>
        <li>25 – 29.9: {t.cat3}</li>
        <li>≥ 30: {t.cat4}</li>
      </ul>

      <hr />

      <h3>FAQ</h3>
      <b>{t.faq1q}</b>
      <p>{t.faq1a}</p>
      <b>{t.faq2q}</b>
      <p>{t.faq2a}</p>
    </div>
  );
}

export default BmiCalculator;