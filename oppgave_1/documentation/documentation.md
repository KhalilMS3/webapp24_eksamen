### oppgave 1

# Documentasjon - Mikro LMS

### Api endepunkter
 For applikasjonen trenger vi 2 endepunkter for å kunne utøfre **CRUD-Funksjonalitet**, hvor vi skal kunne 
 - Lage et kurst **(create)**
 - Hente alle kursene **(read-all)**
 - Hente et spesifikt kurs **(read-one)**
 - Endre et kurs **(update)**
 - Slette et kurs **(delete)**

1. `/api/kurs`

2. `/api/kurs/:id`

### Verb og forespørsler

**```/api/kurs```**
- GET
  - Hente alle kursene
- POST
  - Lage et kurs
  
**```/api/kurs/:id```**
- GET
  - Hente ett spesifikt kurs
- PATCH
    - Endre/oppdatere ett prosjekt
- DELETE
    - Slette ett prosjekt 

### Response og statu 
>**GET:** 

- **Alle Kurs: `/api/kurs`**
     - success: 200 OK
     - Response: alle kurs
     - Failure: 500 Internal Server Error
     - Response: Server error
  
- **spesifikt Kurs: `/api/kurs/:id`**
     - success: 200 OK
     - Response: ett kurs
     - Failure: 404 Not Found
     - Response: Kurs med ID {id} ikke funnet

>**POST**

- **Lage et kurs: `/api/kurs`**
    - success: 201 Created
    - Response: Det nye kurset
    - Failure: 400 Bad Request
    - Response: Ugyldig data

>**PATCH**

- **oppdatere/redigere et kurs: `/api/kurs/:id`**
    - success: 200 OK
    - Response: oppdatert kurs
    - Failure: 400 Bad Request
    - Response: Ugyldig data

>**DELETE**

- **Slette et kurs: `/api/kurs/:id`**
    - success kode: 204 No Content
    - Response: Ingen data 
    - Failure kode: 404 Not Found
    - Response: Kurs med {id} ikke funnet