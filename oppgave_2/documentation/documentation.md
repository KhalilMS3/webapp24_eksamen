# Dokumentasjon for Event Management System

## 1. Enkle Low-fi Skisser
### Beskrivelse
- Enkle håndtegnede skisser er laget for å representere strukturen i brukergrensesnittet.
- Sidene inkluderer:
  - **Kunde side (Events Overview)**: Viser alle arrangementer som finnes, med mulighet til å filtrere på tilgjengelige kriterier og melde seg og andre deltakere på
  - **Admin Panel**: Har separate seksjoner for arrangementer, maler og påmeldinger. Kan håndtere redigering, sletting og administrering av arrangamenter, maler og påmeldinger.

## 2. API-Endepunkter
### Liste over API-Endepunkter
- `/events`: Håndterer opprettelse, visning, oppdatering og sletting av arrangementer.
- `/templates`: Håndterer opprettelse, visning, oppdatering og sletting av maler.
- `/participants`: Håndterer opprettelse, visning, oppdatering, sletting av påmeldinger, og inkluderer en funksjon for masseoppdatering.
- `/participants/bulk-update`: Endepunkt for å oppdatere statusen til flere deltakere samtidig.
- `/bookings`: Håndterer opprettelse, visning, oppdatering og sletting av bookings.  (ikke brukt mye i applikasjonen)

## 3. API-Verber per Endepunkt
### `/events`
- **GET `/events`**: Henter alle arrangementer.
- **GET `/events/:eventSlyg`**: Henter et spesifikt arrangementer basert på slug.
- **POST `/events`**: Oppretter et nytt arrangement.
- **PATCH `/events/:id`**: Oppdaterer et arrangement med gitt ID.
- **DELETE `/events/:id`**: Sletter et arrangement med gitt ID.

### `/templates`
- **GET `/templates`**: Henter alle maler.
- **POST `/templates`**: Oppretter en ny mal.
- **PATCH `/templates/:id`**: Oppdaterer en mal med gitt ID.
- **DELETE `/templates/:id`**: Sletter en mal med gitt ID.

### `/participants`
- **GET `/participants/`**: Henter informasjon om deltakere/påmeldinger.
- **GET `/participants/:id`**: Henter informasjon om en spesifikk deltakere/påmeldinger.
- **POST `/participants`**: Legger til en ny deltaker/påmelding.
- **PATCH `/participants/:id`**: Oppdaterer statusen til en deltaker/påmelding.
- **DELETE `/participants/:id`**: Sletter en deltaker/påmelding.

### `/participants/bulk-update`
- **PATCH `/participants/bulk-update`**: Oppdaterer statusen for flere deltakere basert på en liste av deltakere. (logikken er ikke ferdig implementert grunnet dårlig tid, en del bugs må fikses med tanke på inputdata som sendes til serveren er ugyldige)

## 4. Respons og Statuskoder
### `/events`
- **GET**: `200 OK` - Returnerer liste over arrangementer. `500 Internal Server Error` ved feil.
- **POST**: `201 Created` - Arrangementet ble opprettet. `400 Bad Request` hvis inputdata er ugyldige.
- **PATCH**: `200 OK` - Arrangementet ble oppdatert. `404 Not Found` hvis arrangementet ikke finnes.
- **DELETE**: `200 OK` - Arrangementet ble slettet. `404 Not Found` hvis arrangementet ikke finnes.

### `/templates`
- **GET**: `200 OK` - Returnerer liste over maler.
- **POST**: `201 Created` - Malen ble opprettet.
- **PATCH**: `200 OK` - Malen ble oppdatert.
- **DELETE**: `200 OK` - Malen ble slettet. `404 Not Found` hvis malen er i bruk.

### `/participants`
- **GET**: `200 OK` - Returnerer informasjon om deltakere/påmeldinger. `500 Internal Server Error` ved feil.
- **POST**: `201 Created` - deltakeren/påmeldingen. ble lagt til.
- **PATCH**: `200 OK` - Statusen ble oppdatert. `400 Bad Request` ved ugyldig input.
- **DELETE**: `200 OK` - Deltakeren/påmeldingen ble slettet.

### `/participants/bulk-update`
- **PATCH**: `200 OK` - Statusen ble oppdatert for alle angitte deltakere. `400 Bad Request` hvis noen av deltakere ikke finnes.

## 5. Bruk av API-Endepunkter på Sider
### **Kunde side (Events Overview `/kunde/arrangementer`)**
- **Arrangementer**: `/events`
  - Henter alle arrangementer og lar brukeren se detaljer om hvert arrangement.
- **Spesifikt arrangement**: `/events/:eventSlug`
  - Henter et spesifikt arrangementer og lar brukeren se ekstra detaljer om arrangementet, samt melde seg og andre på.
- **Påmelding til et arrangement**: `/bookings`
  - Oppretter en booking, med informasjon til hoved deltaker, og kobles til arrangementet via id til arrangementet. 
- **Påmelding av deltakere**: `/participants`
  - Etter opprettelse av en booking, blir informasjonen til hoved deltaker samt andre deltakere (hvis lagt til) sendt og lagret i egent tabell "participants".
  
### **Admin Panel**
- **Arrangementer (`/admin/events`)**:
  - **API**: `/events`
  - **Handlinger**: Opprett, rediger, slett arrangementer.
  
- **Maler (`/admin/templates`)**:
  - **API**: `/templates`
  - **Handlinger**: Opprett, rediger, slett maler.
  
- **Påmeldinger (`/admin/events/[eventSlug]`)**:
  - **API**: `/participants`
  - **Handlinger**: Se, administrere og oppdatere status for deltakere.
  - **API**: `/participants/:id`
  - **Handlinger**: administrere og oppdatere status for deltakere.

## 6. Filtrering i Frontend og Backend
### Backend:
- Filtrering gjøres ved å bruke SQL-spørringer med `WHERE`-klausuler for å hente spesifikke data basert på kriterier som `status`, `event type`, `available spots`, osv. som blir lagt til i SQL spørringen dynamisk dersom de er gitt i et API-call

### Frontend:
- Filtrering håndteres med `useMemo` for å redusere omberegning av data når filterverdiene endres. Dette gir en rask og responsiv opplevelse.

## 7. Datamodell
### Arrangementer (Events)
- Inneholder felt som `id`, `title`, `slug`, `date`, `location`, `capacity`, `price`, `is_private`, `status`, og `template_id`.
- `template_id` brukes for å knytte et arrangement til en mal.

### Påmeldinger (Participants)
- Knyttet til `bookings` gjennom `booking_id`. Har også felt som `status`, `name`, `email`, og `waitlist_status`.

## 8. Opprette/Gjenbruke en Mal
- Når et arrangement opprettes kan det enten opprettes fra scratch eller gjenbrukes ved å bruke en mal (`template`).
- En mal inneholder forhåndsdefinerte felter som `title`, `description`, `capacity`, og andre regler. Disse kan gjenbrukes for nye arrangementer.

## 9. Databasemodellen
### Arrangementer (Events)
- Relaterer til **Maler (Templates)** ved hjelp av `template_id`.
  
### Bookings og Deltakere (Participants)
- **Bookings** har en `event_id` som referanse til arrangementet.
- **Participants** har en `booking_id` som referanse til bookingen og oppretter relasjonen mellom deltakere og arrangementet.
  
### Relasjoner
- **Arrangementer -> Bookings -> Deltakere**: Denne relasjonen knytter deltakere til arrangementer gjennom bookings.
  
### Diagram
- **Arrangementer (Events)** <---> **Bookings** <---> **Deltakere (Participants)**
- **Maler (Templates)** kan gjenbrukes i flere **Arrangementer** (en-til-mange).

