# Dokumentasjon for API-endepunkter og Applikasjonssider

## 1. API-Endepunkter

### `/api/courses`
- **Verb**: `GET`, `POST`
  - **GET**: Hent alle tilgjengelige kurs.
  - **POST**: Opprett et nytt kurs med detaljer som tittel, slug, kategori osv.
- **Respons og statuskoder**:
  - **GET 200**: Returnerer en liste over kurs (JSON-format).
  - **GET 500**: Intern serverfeil, hvis data ikke kan hentes.
  - **POST 201**: Kurs opprettet, returnerer detaljer om kurset.
  - **POST 400**: Ugyldig forespørsel, feil i inputdata.

### `/api/courses/:courseSlug`
- **Verb**: `GET`, `PATCH`, `DELETE`
  - **GET**: Hent et spesifikt kurs basert på kurs-slug.
  - **PATCH**: Oppdater kategori for et eksisterende kurs.
  - **DELETE**: Slett et kurs basert på kurs-slug.
- **Respons og statuskoder**:
  - **GET 200**: Returnerer detaljer for et spesifikt kurs.
  - **GET 500**: Intern serverfeil, hvis kurset ikke finnes.
  - **PATCH 200**: Kurs oppdatert, returnerer oppdatert informasjon.
  - **PATCH 400**: Ugyldig forespørsel, f.eks. mangler kategori.
  - **DELETE 200**: Kurs slettet, returnerer suksessmelding.
  - **DELETE 404**: Kurs ikke funnet.

### `/api/courses/:courseSlug/:lessonSlug`
- **Verb**: `GET`
  - **GET**: Hent en spesifikk leksjon basert på kurs-slug og leksjon-slug.
- **Respons og statuskoder**:
  - **GET 200**: Returnerer detaljer for en spesifikk leksjon.
  - **GET 404**: Leksjon ikke funnet, returnerer feilmelding.

## 2. Sider i Applikasjonen

### `/courseForm`
- **Beskrivelse**: Side for å opprette eller redigere et kurs.
- **Handlinger**:
  - Fyll ut kursinformasjon som tittel, slug, beskrivelse og kategori.
  - Legg til leksjoner i kurset.

### `/courses`
- **Beskrivelse**: Viser en liste over alle tilgjengelige kurs.
- **Handlinger**:
  - Brukeren kan se en oversikt over eksisterende kurs.
  - Mulighet til å navigere til detaljsiden for hvert kurs.

### `/courses/[courseSlug]`
- **Beskrivelse**: Viser detaljer for et spesifikt kurs basert på kurs-slug.
- **Handlinger**:
  - Se detaljer om kurset.
  - Rediger eller slett kurset.
  - Naviger til tilhørende leksjoner for redigering.

### `/courses/[courseSlug]/[lessonSlug]`
- **Beskrivelse**: Viser detaljer for en spesifikk leksjon basert på kurs-slug og leksjon-slug.
- **Handlinger**:
  - Se detaljer om leksjonen.
  - Rediger eller slett leksjonen.
  - 
## TipTap implementasjonen
- For bruk av TipTap i prosjektet har jeg følgt dokumentasjonen som er i TipTap sin nettside
- **editor**
TipTap tilbyr useEditor() som er rammen/input feltet du kan bruke for å skrive inne reachtext, som automagisk konverter teksten du skriver til HTML, mens EditorContent er komponenten som tar imot innholdet som blir skrevet.


```
const editor = useEditor({
    extensions: [starterKit.configure()],
    content,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
     },
     editorProps: {
        attributes: {
           class: 
           "rounded-md border min-h-[200px] border-input bg-back "
       }
    }
  });

<EditorContent editor={editor} />

```

- for å kunne ta i bruk disse delen av TipTap i andre deler av applikasjonen bør du importere følgende

`import { useEditor, EditorContent } from "@tiptap/react";`

`import starterKit from "@tiptap/starter-kit";`