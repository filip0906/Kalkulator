import React, { useState, useEffect } from 'react';

function CalorieCalculator({ lang }) {
  const [gender, setGender] = useState('male');
  const [age, setAge] = useState('');
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [activity, setActivity] = useState('1.2');
  const [goal, setGoal] = useState('maintain');
  const [result, setResult] = useState(null);
  const [goalResult, setGoalResult] = useState(null);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);

  const t = {
    hr: {
      title: 'Kalkulator kalorija',
      desc: 'Izračunajte svoj dnevni preporučeni unos kalorija prema spolu, dobi, visini, težini, aktivnosti i cilju.',
      gender: 'Spol',
      male: 'Muški',
      female: 'Ženski',
      age: 'Godine',
      height: 'Visina (cm)',
      weight: 'Težina (kg)',
      activity: 'Razina aktivnosti',
      activities: [
        'Sjedenje, bez vježbanja',
        'Lagano aktivan (1-3 dana vježbanja/tjedno)',
        'Umjereno aktivan (3-5 dana vježbanja/tjedno)',
        'Vrlo aktivan (6-7 dana vježbanja/tjedno)',
        'Izuzetno aktivan (težak fizički rad ili 2x dnevno trening)'
      ],
      goal: 'Cilj',
      maintain: 'Održavanje težine',
      lose: 'Mršavljenje',
      gain: 'Dobivanje na težini',
      calc: 'Izračunaj',
      error1: 'Molimo unesite sve vrijednosti.',
      error2: 'Vrijednosti moraju biti pozitivni brojevi.',
      result: 'Vaš dnevni unos kalorija za održavanje',
      goalResultLose: 'Za mršavljenje preporučeni unos je oko',
      goalResultGain: 'Za dobivanje na težini preporučeni unos je oko',
      kcalDay: 'kcal/dan',
      copy: 'Kopiraj rezultat',
      copied: 'Kopirano!',
      print: 'Ispiši',
      info: 'Ova procjena koristi Mifflin-St Jeor formulu za BMR i uključuje faktor aktivnosti (TDEE).',
      tipsTitle: 'Savjeti',
      tipsMaintain: [
        'Jedite raznovrsno i uravnoteženo.',
        'Pazite na unos voća i povrća.',
        'Redovito se krećite.'
      ],
      tipsLose: [
        'Smanjite unos kalorija za 300–500 kcal/dan.',
        'Povećajte unos povrća i proteina.',
        'Izbjegavajte zaslađena pića i grickalice.',
        'Redovito vježbajte (kardio i snaga).'
      ],
      tipsGain: [
        'Povećajte unos kalorija za 300–500 kcal/dan.',
        'Jedite češće i birajte energetski bogate namirnice.',
        'Dodajte zdrave masnoće (orašasti plodovi, avokado).',
        'Vježbajte snagu za rast mišića.'
      ]
    },
    en: {
      title: 'Calorie Calculator',
      desc: 'Calculate your recommended daily calorie intake based on gender, age, height, weight, activity and goal.',
      gender: 'Gender',
      male: 'Male',
      female: 'Female',
      age: 'Age',
      height: 'Height (cm)',
      weight: 'Weight (kg)',
      activity: 'Activity level',
      activities: [
        'Sedentary (little or no exercise)',
        'Lightly active (1-3 days/week)',
        'Moderately active (3-5 days/week)',
        'Very active (6-7 days/week)',
        'Extra active (hard physical job or 2x training/day)'
      ],
      goal: 'Goal',
      maintain: 'Maintain weight',
      lose: 'Lose weight',
      gain: 'Gain weight',
      calc: 'Calculate',
      error1: 'Please enter all values.',
      error2: 'Values must be positive numbers.',
      result: 'Your daily calorie intake for maintenance',
      goalResultLose: 'For weight loss, recommended intake is about',
      goalResultGain: 'For weight gain, recommended intake is about',
      kcalDay: 'kcal/day',
      copy: 'Copy result',
      copied: 'Copied!',
      print: 'Print',
      info: 'This estimate uses the Mifflin-St Jeor formula for BMR and includes activity factor (TDEE).',
      tipsTitle: 'Tips',
      tipsMaintain: [
        'Eat a varied and balanced diet.',
        'Include plenty of fruits and vegetables.',
        'Be physically active regularly.'
      ],
      tipsLose: [
        'Reduce calorie intake by 300–500 kcal/day.',
        'Increase vegetables and protein intake.',
        'Avoid sugary drinks and snacks.',
        'Exercise regularly (cardio and strength).'
      ],
      tipsGain: [
        'Increase calorie intake by 300–500 kcal/day.',
        'Eat more frequently and choose energy-dense foods.',
        'Add healthy fats (nuts, avocado).',
        'Do strength training for muscle growth.'
      ]
    }
  }[lang];

  const calculate = () => {
    setError('');
    setResult(null);
    setGoalResult(null);
    setCopied(false);

    if (!age || !height || !weight) {
      setError(t.error1);
      return;
    }
    if (isNaN(age) || isNaN(height) || isNaN(weight) ||
        Number(age) <= 0 || Number(height) <= 0 || Number(weight) <= 0) {
      setError(t.error2);
      return;
    }

    // Mifflin-St Jeor BMR formula
    let bmr;
    if (gender === 'male') {
      bmr = 10 * Number(weight) + 6.25 * Number(height) - 5 * Number(age) + 5;
    } else {
      bmr = 10 * Number(weight) + 6.25 * Number(height) - 5 * Number(age) - 161;
    }
    // TDEE
    const tdee = Math.round(bmr * Number(activity));
    setResult(tdee);

    // Izračun za cilj (15% od TDEE, minimalno BMR za mršavljenje)
    let goalValue = tdee;
    if (goal === 'lose') {
      goalValue = Math.max(Math.round(tdee * 0.85), Math.round(bmr));
    }
    if (goal === 'gain') {
      goalValue = Math.round(tdee * 1.15);
    }
    setGoalResult(goalValue);
  };

  const handleCopy = () => {
    if (result !== null) {
      let text = `${t.result}: ${result} ${t.kcalDay}`;
      if (goal !== 'maintain' && goalResult) {
        text += `\n${goal === 'lose' ? t.goalResultLose : t.goalResultGain}: ${goalResult} ${t.kcalDay}`;
      }
      navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    }
  };

  // Odabir savjeta prema cilju
  const tips = goal === 'maintain' ? t.tipsMaintain : goal === 'lose' ? t.tipsLose : t.tipsGain;

  // Resetiraj rezultat kad se promijeni neki od inputa
  useEffect(() => {
    setResult(null);
    setGoalResult(null);
    setError('');
    setCopied(false);
  }, [gender, age, height, weight, activity, goal]);

  return (
    <div>
      <h2>{t.title}</h2>
      <p>{t.desc}</p>
      <label>
        {t.gender}:
        <select value={gender} onChange={e => setGender(e.target.value)}>
          <option value="male">{t.male}</option>
          <option value="female">{t.female}</option>
        </select>
      </label>
      <label>
        {t.age}
        <input
          type="number"
          placeholder={t.age}
          value={age}
          onChange={e => setAge(e.target.value)}
          aria-label={t.age}
        />
      </label>
      <label>
        {t.height}
        <input
          type="number"
          placeholder={t.height}
          value={height}
          onChange={e => setHeight(e.target.value)}
          aria-label={t.height}
        />
      </label>
      <label>
        {t.weight}
        <input
          type="number"
          placeholder={t.weight}
          value={weight}
          onChange={e => setWeight(e.target.value)}
          aria-label={t.weight}
        />
      </label>
      <label>
        {t.activity}
        <select value={activity} onChange={e => setActivity(e.target.value)}>
          <option value="1.2">{t.activities[0]}</option>
          <option value="1.375">{t.activities[1]}</option>
          <option value="1.55">{t.activities[2]}</option>
          <option value="1.725">{t.activities[3]}</option>
          <option value="1.9">{t.activities[4]}</option>
        </select>
      </label>
      <label>
        {t.goal}
        <select value={goal} onChange={e => setGoal(e.target.value)}>
          <option value="maintain">{t.maintain}</option>
          <option value="lose">{t.lose}</option>
          <option value="gain">{t.gain}</option>
        </select>
      </label>
      <button className="calc-btn" onClick={calculate} aria-label={t.calc}>
        {t.calc}
      </button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {result !== null && (
        <div>
          <p>{t.result}: <b>{result} {t.kcalDay}</b></p>
          {goal !== 'maintain' && goalResult && (
            <p>
              {goal === 'lose' ? t.goalResultLose : t.goalResultGain}: <b>{goalResult} {t.kcalDay}</b>
            </p>
          )}
          <button onClick={handleCopy} aria-label={t.copy}>{t.copy}</button>
          <button onClick={() => window.print()} style={{marginLeft: 8}} aria-label={t.print}>{t.print}</button>
          {copied && <span style={{ color: 'green', marginLeft: 10 }}>{t.copied}</span>}
          <p style={{fontSize: 13, marginTop: 10, color: '#888'}}>{t.info}</p>
        </div>
      )}
      <hr />
      <h3>{t.tipsTitle}</h3>
      <ul>
        {tips.map((tip, i) => <li key={i}>{tip}</li>)}
      </ul>
    </div>
  );
}

export default CalorieCalculator;