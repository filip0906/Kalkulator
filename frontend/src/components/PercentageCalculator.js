import React, { useState } from 'react';

function PercentageCalculator({ lang }) {
  const [base, setBase] = useState('');
  const [percent, setPercent] = useState('');
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);

  const t = {
    hr: {
      title: 'Kalkulator postotka',
      desc: 'Unesite osnovicu i postotak da biste izračunali koliki je određeni postotak od osnovice.',
      base: 'Osnovica',
      percent: 'Postotak',
      calc: 'Izračunaj',
      error1: 'Molimo unesite obje vrijednosti.',
      error2: 'Vrijednosti moraju biti pozitivni brojevi.',
      result: 'Rezultat',
      copy: 'Kopiraj rezultat',
      copied: 'Kopirano!',
      print: 'Ispiši'
    },
    en: {
      title: 'Percentage Calculator',
      desc: 'Enter the base and percentage to calculate the value.',
      base: 'Base',
      percent: 'Percentage',
      calc: 'Calculate',
      error1: 'Please enter both values.',
      error2: 'Values must be positive numbers.',
      result: 'Result',
      copy: 'Copy result',
      copied: 'Copied!',
      print: 'Print'
    }
  }[lang];

  const calculate = () => {
    setError('');
    setResult(null);
    setCopied(false);

    if (base === '' || percent === '') {
      setError(t.error1);
      return;
    }
    if (isNaN(base) || isNaN(percent) || Number(base) < 0 || Number(percent) < 0) {
      setError(t.error2);
      return;
    }

    setResult((base * percent / 100).toFixed(2));
  };

  const handleCopy = () => {
    if (result !== null) {
      navigator.clipboard.writeText(`${t.result}: ${result}`);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    }
  };

  return (
    <div>
      <h2>{t.title}</h2>
      <p>{t.desc}</p>
      <label>
        {t.base}
        <input
          type="number"
          placeholder={t.base}
          value={base}
          onChange={e => setBase(e.target.value)}
          aria-label={t.base}
        />
      </label>
      <label>
        {t.percent}
        <input
          type="number"
          placeholder={t.percent}
          value={percent}
          onChange={e => setPercent(e.target.value)}
          aria-label={t.percent}
        />
      </label>
      <button className="calc-btn" onClick={calculate} aria-label={t.calc}>
        {t.calc}
      </button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {result !== null && (
        <div>
          <p>{t.result}: {result}</p>
          <button onClick={handleCopy} aria-label={t.copy}>{t.copy}</button>
          <button onClick={() => window.print()} style={{marginLeft: 8}} aria-label={t.print}>{t.print}</button>
          {copied && <span style={{ color: 'green', marginLeft: 10 }}>{t.copied}</span>}
        </div>
      )}
    </div>
  );
}

export default PercentageCalculator;