# Operasjonell-frontend-utvikling- Emne 2

## 📖 Om prosjektet
Vår kunde er Stay, som har mange små overnattingssteder. De har behov for en brukervennlig digital bookingløsning, slik at besøkende og brukere enkelt kan finne relevant informasjon og booke rom. Prosjektet Stay er en digital tjeneste som gjør det enkelt å finne og booke rom hos små Bed & Breakfast-steder. Løsningen skal gi oversikt over tilgjengelighet, pris og romtype, samt støtte anmeldelser og bookingforespørsler. 

## 🎯 Målgruppe
Vår primærmålgruppe er privatpersoner som ønsker å booke overnatting hos små Bed & Breakfast-steder.

Sekundærmålgruppen er privatpersoner som reiser ofte og ønsker en rask oversikt over sine tidligere opphold, slik at de enkelt kan bestille på samme sted igjen.

## 👥 Ansvarsfordeling og CRUD
| Student | Side | Ressurs | CREATE | READ | UPDATE | DELETE |
|---------|------|---------|--------|------|--------|--------|
| Dastan | Forsiden (index.html) | rooms | ✅ | ✅ | ✅ | ✅ |
| Frida | Mine bookinger (booking.html) | bookings | ✅ | ✅ | ✅ | ✅ |
| Frida | Romside (room.html) | reviews | ✅ | ✅ | ✅ | ✅ |
| Iben | Login/registrering (login.html) | users | ✅ | ✅ | ✅ | ✅ |
| Iben | Brukerprofil (userProfile.html) | users | ✅ | ✅ | ✅ | ✅ |

## 🛠️ Teknologi
- **Frontend:** HTML, CSS, TypeScript
- **API:** https://github.com/DHawrami/crudops (crudops)
- **Versjonskontroll:** GitHub
- **Prosjektstyring:** GitHub Projects

## 🚀 Kom i gang
Du trenger to terminaler, én for APIet og én for frontend.

### Krav 
- Node.js
- npm

### Steg 1 – Sett opp APIet (CrudOps)

1. Klon CrudOps-repoet:
```bash
git clone https://github.com/DHawrami/crudops
cd crudops
```

2. Installer avhengigheter:
```bash
npm install
```

3. Lag en `.env` fil i crudops-mappen:
   TEMPLATE=stay.json
API_KEY=stay123

4. Start APIet:
```bash
npm start
```

APIet kjører nå på `http://localhost:3000`

### Steg 2 – Sett opp frontend

1. Klon dette repoet:
```bash
git clone https://github.com/fridaenoksen-dev/stay-exam
cd stay-exam/frontend
```

2. Installer avhengigheter:
```bash
npm install
```

3. Lag en `.env` fil i frontend-mappen:
   VITE_API_KEY=stay123

4. Start frontend:
```bash
npm run dev
```

5. Åpne lenken som vises i terminalen (vanligvis `http://localhost:5173`)

## 🔑 Testbruker
E-post: ola@example.com
Passord: abc123


## ✅ Funksjonalitet
- Brukerregistrering og innlogging
- Se romliste med pris og egenskaper
- Se romdetaljer med bilder og beskrivelse
- Lese og skrive anmeldelser på romsiden
- Se egne bookinger og legge til nye

