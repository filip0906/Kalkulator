import React, { useState } from 'react';

function FuelCalculator({ lang }) {
  const [distance, setDistance] = useState('');
  const [fuelUsed, setFuelUsed] = useState('');
  const [consumption, setConsumption] = useState(null);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);

  const t = {
    hr: {
      title: 'Kalkulator potrošnje goriva',
      desc: 'Izračunajte prosječnu potrošnju goriva na 100 km na temelju prijeđene udaljenosti i potrošenog goriva.',
      distance: 'Prijeđena udaljenost (km)',
      fuel: 'Potrošeno gorivo',
      calc: 'Izračunaj',
      error1: 'Molimo unesite obje vrijednosti.',
      error2: 'Vrijednosti moraju biti pozitivni brojevi (gorivo može biti 0).',
      result: 'Potrošnja',
      copy: 'Kopiraj rezultat',
      copied: 'Kopirano!',
      print: 'Ispiši',
      tips: 'Savjeti za štednju goriva',
      tip1: 'Redovito provjeravajte tlak u gumama.',
      tip2: 'Izbjegavajte nagla ubrzanja i kočenja.',
      tip3: 'Uklonite nepotrebni teret iz vozila.',
      tip4: 'Koristite klima uređaj umjereno.',
      faq1q: 'Kako se računa potrošnja goriva?',
      faq1a: 'Potrošnja goriva se računa po formuli: (potrošeno gorivo / prijeđena udaljenost) × 100.',
      faq2q: 'Zašto je važno pratiti potrošnju?',
      faq2a: 'Praćenje potrošnje pomaže u uštedi novca i očuvanju okoliša.'
    },
    en: {
      title: 'Fuel Consumption Calculator',
      desc: 'Calculate average fuel consumption per 100 km based on distance and fuel used.',
      distance: 'Distance travelled (km)',
      fuel: 'Fuel used',
      calc: 'Calculate',
      error1: 'Please enter both values.',
      error2: 'Values must be positive numbers (fuel can be 0).',
      result: 'Consumption',
      copy: 'Copy result',
      copied: 'Copied!',
      print: 'Print',
      tips: 'Fuel saving tips',
      tip1: 'Check tire pressure regularly.',
      tip2: 'Avoid sudden acceleration and braking.',
      tip3: 'Remove unnecessary load from the vehicle.',
      tip4: 'Use air conditioning moderately.',
      faq1q: 'How is fuel consumption calculated?',
      faq1a: 'Fuel consumption is calculated as: (fuel used / distance) × 100.',
      faq2q: 'Why is it important to track consumption?',
      faq2a: 'Tracking consumption helps save money and protect the environment.'
    }
  }[lang];

  const calculate = () => {
    setError('');
    setConsumption(null);
    setCopied(false);

    if (distance === '' || fuelUsed === '') {
      setError(t.error1);
      return;
    }
    if (isNaN(distance) || isNaN(fuelUsed) || Number(distance) <= 0 || Number(fuelUsed) < 0) {
      setError(t.error2);
      return;
    }

    let fuel = Number(fuelUsed);

    setConsumption(((fuel / distance) * 100).toFixed(2));
  };

  const handleCopy = () => {
    if (consumption !== null) {
      navigator.clipboard.writeText(`${t.result}: ${consumption} l/100km`);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    }
  };

  return (
    <div>
      <h2>{t.title}</h2>
      <p>{t.desc}</p>
      <label>
        {t.distance}
        <input
          type="number"
          placeholder={t.distance}
          value={distance}
          onChange={e => setDistance(e.target.value)}
          aria-label={t.distance}
        />
      </label>
      <label>
        {t.fuel}
        <input
          type="number"
          placeholder={t.fuel}
          value={fuelUsed}
          onChange={e => setFuelUsed(e.target.value)}
          aria-label={t.fuel}
        />
      </label>
      <button className="calc-btn" onClick={calculate} aria-label={t.calc}>{t.calc}</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {consumption !== null && (
        <div>
          <p>{t.result}: {consumption} l/100km</p>
          <button onClick={handleCopy} aria-label={t.copy}>{t.copy}</button>
          <button onClick={() => window.print()} style={{marginLeft: 8}} aria-label={t.print}>{t.print}</button>
          {copied && <span style={{ color: 'green', marginLeft: 10 }}>{t.copied}</span>}
        </div>
      )}

      <hr />

      <h3>{t.tips}</h3>
      <ul>
        <li>{t.tip1}</li>
        <li>{t.tip2}</li>
        <li>{t.tip3}</li>
        <li>{t.tip4}</li>
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

export default FuelCalculator;