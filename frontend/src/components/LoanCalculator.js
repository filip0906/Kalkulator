import React, { useState } from 'react';

function LoanCalculator({ lang }) {
  const [amount, setAmount] = useState('');
  const [rate, setRate] = useState('');
  const [years, setYears] = useState('');
  const [monthly, setMonthly] = useState(null);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);

  const t = {
    hr: {
      title: 'Kreditni kalkulator',
      desc: 'Izračunajte mjesečnu ratu kredita na temelju iznosa, kamate i roka otplate.',
      amount: 'Iznos kredita',
      rate: 'Godišnja kamata (%)',
      years: 'Godina otplate',
      calc: 'Izračunaj',
      error1: 'Molimo unesite sve vrijednosti.',
      error2: 'Vrijednosti moraju biti pozitivni brojevi (kamata može biti 0).',
      result: 'Mjesečna rata',
      copy: 'Kopiraj rezultat',
      copied: 'Kopirano!',
      print: 'Ispiši',
      tips: 'Savjeti za uzimanje kredita',
      tip1: 'Usporedite ponude više banaka.',
      tip2: 'Provjerite ukupne troškove kredita.',
      tip3: 'Izračunajte koliko rata možete realno plaćati.',
      faq1q: 'Kako se računa rata kredita?',
      faq1a: 'Rata se računa pomoću formule za anuitet, uzimajući u obzir iznos, kamatu i rok otplate.',
      faq2q: 'Što ako je kamata 0%?',
      faq2a: 'Rata je tada jednostavno ukupni iznos podijeljen s brojem mjeseci otplate.'
    },
    en: {
      title: 'Loan Calculator',
      desc: 'Calculate your monthly loan payment based on amount, interest rate and repayment period.',
      amount: 'Loan amount',
      rate: 'Annual interest rate (%)',
      years: 'Repayment years',
      calc: 'Calculate',
      error1: 'Please enter all values.',
      error2: 'Values must be positive numbers (interest can be 0).',
      result: 'Monthly payment',
      copy: 'Copy result',
      copied: 'Copied!',
      print: 'Print',
      tips: 'Loan tips',
      tip1: 'Compare offers from several banks.',
      tip2: 'Check the total cost of the loan.',
      tip3: 'Calculate how much you can realistically pay monthly.',
      faq1q: 'How is the loan payment calculated?',
      faq1a: 'The payment is calculated using the annuity formula, considering amount, interest and period.',
      faq2q: 'What if the interest rate is 0%?',
      faq2a: 'The payment is simply the total amount divided by the number of months.'
    }
  }[lang];

  const calculate = () => {
    setError('');
    setMonthly(null);
    setCopied(false);

    if (amount === '' || rate === '' || years === '') {
      setError(t.error1);
      return;
    }
    if (
      isNaN(amount) || isNaN(rate) || isNaN(years) ||
      Number(amount) <= 0 || Number(rate) < 0 || Number(years) <= 0
    ) {
      setError(t.error2);
      return;
    }

    const principal = parseFloat(amount);
    const monthlyRate = parseFloat(rate) / 100 / 12;
    const n = parseInt(years) * 12;
    const payment = monthlyRate === 0
      ? principal / n
      : (principal * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -n));
    setMonthly(payment.toFixed(2));
  };

  const handleCopy = () => {
    if (monthly !== null) {
      navigator.clipboard.writeText(`${t.result}: ${monthly}`);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    }
  };

  return (
    <div>
      <h2>{t.title}</h2>
      <p>{t.desc}</p>
      <label>
        {t.amount}
        <input
          type="number"
          placeholder={t.amount}
          value={amount}
          onChange={e => setAmount(e.target.value)}
          aria-label={t.amount}
        />
      </label>
      <label>
        {t.rate}
        <input
          type="number"
          placeholder={t.rate}
          value={rate}
          onChange={e => setRate(e.target.value)}
          aria-label={t.rate}
        />
      </label>
      <label>
        {t.years}
        <input
          type="number"
          placeholder={t.years}
          value={years}
          onChange={e => setYears(e.target.value)}
          aria-label={t.years}
        />
      </label>
      <button className="calc-btn" onClick={calculate} aria-label={t.calc}>
        {t.calc}
      </button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {monthly !== null && (
        <div>
          <p>{t.result}: {monthly}</p>
          <p>
            {lang === 'hr' ? 'Ukupno plaćeno:' : 'Total paid:'} {(monthly * years * 12).toFixed(2)}
          </p>
          <button onClick={handleCopy} aria-label={t.copy}>{t.copy}</button>
          <button onClick={() => window.print()} style={{marginLeft: 8}} aria-label={t.print}>{t.print}</button>
          {copied && <span style={{ color: 'green', marginLeft: 10 }}>{t.copied}</span>}
        </div>
      )}

      {monthly !== null && (
        <details style={{marginTop:10}}>
          <summary>{lang === 'hr' ? 'Prikaži amortizacijsku tablicu' : 'Show amortization table'}</summary>
          <table style={{width:'100%', fontSize:13, marginTop:8, borderCollapse:'collapse'}}>
            <thead>
              <tr>
                <th>{lang === 'hr' ? 'Mjesec' : 'Month'}</th>
                <th>{lang === 'hr' ? 'Anuitet' : 'Payment'}</th>
                <th>{lang === 'hr' ? 'Glavnica' : 'Principal'}</th>
                <th>{lang === 'hr' ? 'Kamata' : 'Interest'}</th>
                <th>{lang === 'hr' ? 'Preostalo' : 'Remaining'}</th>
              </tr>
            </thead>
            <tbody>
              {(() => {
                let rows = [];
                let balance = Number(amount);
                let mRate = Number(rate) / 100 / 12;
                let pay = Number(monthly);
                for (let i = 1; i <= years * 12; i++) {
                  let interest = mRate === 0 ? 0 : balance * mRate;
                  let principal = pay - interest;
                  balance -= principal;
                  rows.push(
                    <tr key={i}>
                      <td>{i}</td>
                      <td>{pay.toFixed(2)}</td>
                      <td>{principal.toFixed(2)}</td>
                      <td>{interest.toFixed(2)}</td>
                      <td>{balance > 0 ? balance.toFixed(2) : '0.00'}</td>
                    </tr>
                  );
                  if (balance <= 0) break;
                }
                return rows;
              })()}
            </tbody>
          </table>
        </details>
      )}

      <hr />

      <h3>{t.tips}</h3>
      <ul>
        <li>{t.tip1}</li>
        <li>{t.tip2}</li>
        <li>{t.tip3}</li>
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

export default LoanCalculator;