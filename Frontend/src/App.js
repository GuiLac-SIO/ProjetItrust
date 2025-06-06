import React, { useState, useEffect } from 'react';

function App() {
  const [dateTime, setDateTime] = useState('');
  const [event, setEvent] = useState('');
  const [start, setStart] = useState('');
  const [end, setEnd] = useState('');
  const [results, setResults] = useState([]);

  const API_URL = 'http://127.0.0.1:8000';

 
const storeEvent = async (e) => {
  e.preventDefault();

  try {
    const response = await fetch(`${API_URL}/events`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        datesEvent: new Date(dateTime).toISOString(),
        event
      })
    });

    if (response.ok) {
      alert("Événement ajouté !");
      setDateTime('');
      setEvent('');
    } else {
      console.error("Erreur :", await response.json());
    }
  } catch (err) {
    console.error("Erreur:", err);
  }
};


const getEvent = async () => {
  if (!start || !end) {
    alert("Merci de renseigner les deux dates");
    return;
  }
  if(start > end){
    alert("La date de fin dois être superieur à la date de début");
    return;
  }

  try {
    const startISO = new Date(start).toISOString();
    const endISO = new Date(end).toISOString();

    const reponse = await fetch(`${API_URL}/events?start=${encodeURIComponent(startISO)}&end=${encodeURIComponent(endISO)}`);
    if (!reponse.ok) {
      alert("Erreur lors de la recherche");
      return;
    }

    const data = await reponse.json();
    setResults(data);
  } catch (err) {
    console.error("Erreur :", err);
  }
};


  return (
    <div>
      <h1>Datetime Event Store</h1>

      <h2>Ajouter un événement</h2>
      <form onSubmit={storeEvent}>
        <input type="datetime-local" value={dateTime} onChange={e => setDateTime(e.target.value)} required />
        <input type="text" placeholder="Description" value={event} onChange={e => setEvent(e.target.value)} required />
        <button type="submit">Ajouter</button>
      </form>

      <h2>Rechercher des événements</h2>
      <div>
        <input type="datetime-local" value={start} onChange={e => setStart(e.target.value)} />
        <input type="datetime-local" value={end} onChange={e => setEnd(e.target.value)} />
        <button onClick={getEvent}>Rechercher</button>
      </div>

      <h3>Résultats :</h3>
      <ul>
        {results.map((evenement) => (
          <li >{evenement}</li>
         ))}
      </ul>
    </div>
  );
}

export default App;
