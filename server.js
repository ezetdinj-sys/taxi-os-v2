
const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors({
  origin: '*',
}));
app.use(express.json());

function getOAuthBase(env) {
  return env === 'PROD'
    ? 'https://mow.api.vlaanderen.be/oauth'
    : 'https://mow-acc.api.vlaanderen.be/oauth';
}

function getRitBase(env) {
  return env === 'PROD'
    ? 'https://mow.api.vlaanderen.be/chiron/taxirit'
    : 'https://mow-acc.api.vlaanderen.be/chiron/taxirit';
}

async function getAccessToken(env, clientId, clientSecret) {
  const url = getOAuthBase(env) + '/token';
  const basic = Buffer.from(`${clientId}:${clientSecret}`).toString('base64');
  const body = 'grant_type=client_credentials';

  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Authorization': `Basic ${basic}`,
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body
  });

  if (!res.ok) {
    const txt = await res.text();
    throw new Error('OAuth error: ' + txt);
  }
  const data = await res.json();
  return data.access_token;
}

function buildPayload(status, trip, cfg) {
  const nowIso = new Date().toISOString();
  const {
    ritnummer,
    startTimeIso,
    endTimeIso,
    startLat,
    startLng,
    endLat,
    endLng,
    distanceKm,
    price
  } = trip;

  return {
    status,
    ritnummer: String(ritnummer),
    rit: {
      taxibedrijf: {
        aanbieder: {
          registratie: cfg.kboNumber || '',
          naam: cfg.companyName || ''
        }
      },
      voertuig: {
        nummerplaat: cfg.defaultPlate || ''
      },
      uitvoerder: {
        bestuurderspasnummer: cfg.driverCardId || ''
      },
      vertrektijdstip: startTimeIso,
      vertrekpunt: {
        lengtegraad: startLng || 0,
        breedtegraad: startLat || 0
      },
      aankomsttijdstip: endTimeIso || startTimeIso,
      aankomstpunt: {
        lengtegraad: endLng || startLng || 0,
        breedtegraad: endLat || startLat || 0
      },
      afstand: {
        waarde: Number(distanceKm || 0).toFixed(2)
      },
      kostprijs: {
        waarde: Number(price || 0).toFixed(2)
      },
      broncreatiedatum: nowIso
    }
  };
}

app.post('/api/chiron/send', async (req, res) => {
  try {
    const { status, trip, cfg } = req.body || {};
    if (!status || !trip || !cfg) {
      return res.status(400).send('Missing status/trip/cfg');
    }
    if (!cfg.clientId || !cfg.clientSecret) {
      return res.status(400).send('Missing clientId/clientSecret in cfg');
    }

    const env = cfg.env === 'PROD' ? 'PROD' : 'TEST';
    const token = await getAccessToken(env, cfg.clientId, cfg.clientSecret);
    const url = getRitBase(env);

    const payload = buildPayload(status, trip, cfg);

    const r = await fetch(url, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    });

    const text = await r.text();
    let json;
    try {
      json = JSON.parse(text);
    } catch {
      json = { raw: text };
    }

    if (!r.ok) {
      return res.status(r.status).json(json);
    }

    return res.json(json);
  } catch (e) {
    console.error('Chiron proxy error:', e);
    return res.status(500).send('Chiron proxy error: ' + e.message);
  }
});

app.get('/', (req, res) => {
  res.send('JOUW TAXI OS 26 backend running. Use /api/chiron/send.');
});

app.listen(PORT, () => {
  console.log('Backend listening on http://localhost:' + PORT);
});
