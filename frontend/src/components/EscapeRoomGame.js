import React, { useState, useEffect, useRef } from "react";

const scenes = {
  start: {
    text: `Probudio si se na hladnom, neugodnom metalnom krevetu. Zidovi sobe su hladni, goli beton, a u zraku osjećaš težinu neizgovorenog.  
Tišina je nabijena nekom prisutnom zloćom, kao da te netko ili nešto promatra iz sjenki.  
Pred tobom se nalaze:
- mali stolić s drevnim satom koji polako kucka
- stara ladica s nepoznatim sadržajem
- masivna drvena vrata s ključanicom u obliku ljudskog oka`,
    options: [
      { text: "Istraži ladicu", next: "ladica" },
      { text: "Pogledaj sat", next: "sat" },
      { text: "Pokušaj otvoriti vrata", next: "vrata" },
    ],
  },
  ladica: {
    text: `Otvaraš ladicu i pronalaziš izblijedjelu, staru fotografiju. Na slici si ti, ali... izgledaš kao da spavaš.  
Na poleđini je rukom ispisana poruka: "Ako vidiš sebe budnog, odmah zatvori oči."  
Ono što te najviše plaši jest sjenka iza tebe na fotografiji – pomiče se lagano, gotovo neprimjetno.`,
    options: [
      { text: "Uzmi fotografiju", next: "fotografijaUzet" },
      { text: "Ostavi je, možda je bolje ne znati", next: "fotografijaOstavljena" },
    ],
  },
  sat: {
    text: `Sat na stoliću pokazuje 04:04. Svaki njegov tihi klik kao da odzvanja u tvojoj glavi.  
Iznenada, broj se na trenutak pretvara u 666, i hladan znoj ti oblijeva čelo.  
Čini ti se kao da sat nije samo uređaj za mjerenje vremena – već portal koji može proždrijeti tvoju stvarnost.`,
    options: [
      { text: "Pokušaj isključiti sat", next: "ormar" },
      { text: "Ignoriraj ga i nastavi", next: "start" },
    ],
  },
  vrata: {
    text: `Vrata su stara, masivna, ali zaključana. Ključanicu krasi simbol ljudskog oka koje ti se čini da te nepomično promatra.  
Nešto u toj ključanici tjera te da osjećaš da ćeš napraviti pogrešku ako pokušaš silački otvoriti vrata.`,
    options: [{ text: "Vrati se natrag i potraži drugi put", next: "start" }],
  },
  ormar: {
    text: `Na mjestu gdje nisi prije vidio, sada stoji ormar. Otvaraš ga polako i pred tobom se nalazi ogroman, starinski okvir ogledala.  
Ali ogledalo je prazno – ne reflektira tebe, već mračni prostor iza tebe.`,
    options: [
      { text: "Pogledaj dublje u ogledalo", next: "ogledalo" },
      { text: "Zatvori ormar i vrati se", next: "start" },
    ],
  },
  ogledalo: {
    text: `U ogledalu se pojavljuje lice osobe u kožnatoj maski, blijedo i bezizražno. Šapće ti:  
"On je rekao da neće ponoviti grešku... Ali ti već jesi."  
Osjećaš kako ti misli postaju mutne, gubiš kontrolu nad sobom i prostorom oko sebe...`,
    options: [
      { text: "Povuci se polako od ogledala", next: "start" },
      { text: "Prihvati sudbinu koja te zove", next: "krajLose" },
    ],
  },
  fotografijaUzet: {
    text: `Fotografija u tvojoj ruci kao da pulsira životom. Iz nje dopiru tihi glasovi i slike koje su ti poznate, ali i zastrašujuće.  
Vidiš sebe kako stojiš pred ogledalom, kao da se pripremaš za nešto što ne želiš priznati.`,
    options: [
      { text: "Vrati se i pokušaj pronaći izlaz iz sobe", next: "izlaz" },
      { text: "Istraži ormar", next: "ormar" },
    ],
  },
  fotografijaOstavljena: {
    text: `Okrećeš leđa fotografiji i osjećaju sigurnosti. No, šapat iz ormara postaje glasniji, a tama oko tebe se zgusnula...`,
    options: [
      { text: "Ponovno pristupi ladici", next: "ladica" },
      { text: "Okreni se i pogledaj ormar", next: "ormar" },
    ],
  },
  izlaz: {
    text: `Stavljaš fotografiju pred ključanicu u obliku oka. Vrata se lagano odškrinjavaju, a hladni zrak te miluje po licu.  
Hodnik pred tobom je mračan, ali s daljine vidiš bljesak svjetla. Možda je to tvoj spas, a možda nova zamka...`,
    options: [
      { text: "Zakorači kroz vrata i pronađi spas", next: "pozitivniKraj" },
      { text: "Zatvori vrata i ostani u sobi", next: "start" }
    ],
  },
  pozitivniKraj: {
    text: `Svjetlo iz hodnika se približava i ispunjava te toplinom koju nisi osjetio odavno.  
Dok hodaš kroz vrata, osjećaš kako se tamna magla u tvojoj glavi razrješava.  
Napokon si slobodan — ova noćna mora je gotova.  
Ali negdje duboko znaš da je hrabrost tvoja najjača snaga, i spreman si na sve što te čeka u stvarnom svijetu.`,
    options: []
  },
  krajDobar: {
    text: `IZLAZ

Izlaziš iz sobe i osjećaš kako ti se tijelo opušta. Ali u daljini čuješ novi šapat, novi poziv...  
Krug se možda i ne zatvara, samo se ponavlja.`,
    options: [],
  },
  krajLose: {
    text: `TI SI NOVI ČUVAR

Ogledalo se ugasilo, a ti sada čuvaš tamu iznutra. Tvoje lice postaje novo lice na zidu... Igra počinje ponovno...`,
    options: [],
  },
  ormarBezFotografije: {
    text: `Otvaraš ormar, ali tamu u njemu osjećaš jače nego ikad. Bez fotografije u rukama, ogledalo u njemu ne otkriva ništa, samo prazninu...`,
    options: [
      { text: "Zatvori ormar i potraži nešto drugo", next: "start" },
    ],
  },
};

export default function EscapeRoomGame() {
  const [currentScene, setCurrentScene] = useState("start");
  const [hasPhoto, setHasPhoto] = useState(false);
  const [textVisible, setTextVisible] = useState(true);
  const audioRef = useRef(null);

  useEffect(() => {
    setTextVisible(false);
    const timeout = setTimeout(() => setTextVisible(true), 100);
    return () => clearTimeout(timeout);
  }, [currentScene]);

  const playClickSound = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play();
    }
  };

  const handleOptionClick = (next) => {
    playClickSound();

    if (next === "fotografijaUzet") setHasPhoto(true);

    if (next === "ormar" && !hasPhoto) {
      setCurrentScene("ormarBezFotografije");
    } else {
      setCurrentScene(next);
    }
  };

  const scene = scenes[currentScene];
  const isEnd = scene.options.length === 0;

  return (
    <div
      style={{
        maxWidth: "600px",
        margin: "2rem auto",
        padding: "1rem",
        backgroundColor: "#111",
        color: "#f5f5f5",
        fontFamily: "Segoe UI, Tahoma, Geneva, Verdana, sans-serif",
        borderRadius: "8px",
        boxShadow: "0 4px 32px #0006",
        userSelect: "none",
      }}
    >
      <h1 style={{ marginBottom: 16 }}>Soba 404</h1>
      <pre
        style={{
          whiteSpace: "pre-wrap",
          fontSize: "1.1rem",
          marginBottom: 0,
          opacity: textVisible ? 1 : 0,
          transition: "opacity 0.3s ease-in-out",
          minHeight: "140px",
        }}
      >
        {scene.text}
      </pre>
      <div style={{ marginTop: "1.5rem" }}>
        {isEnd && (
          <>
            <p style={{ fontStyle: "italic" }}>Igra je završila.</p>
            <button
              onClick={() => {
                setCurrentScene("start");
                setHasPhoto(false);
              }}
              style={{
                display: "block",
                width: "100%",
                padding: "0.8rem",
                margin: "0.4rem 0",
                backgroundColor: "#1976d2",
                color: "#fff",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
                fontSize: "1.08rem",
                fontWeight: 500,
                transition: "background 0.2s, transform 0.2s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "#1565c0";
                e.currentTarget.style.transform = "scale(1.03)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "#1976d2";
                e.currentTarget.style.transform = "none";
              }}
            >
              Igraj ponovno
            </button>
          </>
        )}
        {scene.options.map((option, idx) => (
          <button
            key={idx}
            onClick={() => handleOptionClick(option.next)}
            style={{
              display: "block",
              width: "100%",
              padding: "0.8rem",
              margin: "0.4rem 0",
              backgroundColor: "#222",
              color: "#f5f5f5",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
              fontSize: "1.08rem",
              fontWeight: 500,
              transition: "background 0.2s, transform 0.2s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "#1976d2";
              e.currentTarget.style.transform = "scale(1.03)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "#222";
              e.currentTarget.style.transform = "none";
            }}
          >
            {option.text}
          </button>
        ))}
      </div>
      <audio ref={audioRef} preload="auto">
        <source src="https://actions.google.com/sounds/v1/ui/click.ogg" type="audio/ogg" />
        <source src="https://cdn.pixabay.com/audio/2022/03/15/audio_115b9c_14816.mp3" type="audio/mp3" />
      </audio>
    </div>
  );
}