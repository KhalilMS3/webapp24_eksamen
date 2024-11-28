
// hjelp fra chatGPT. auto generering av slug basert på tittelen
export function slugify(title: string): string {
    return title
        .toLowerCase()                 // Gjør om til små bokstaver
        .replace(/[^a-z0-9 -]/g, '')    // Fjern alle tegn som ikke er alfanumeriske, mellomrom eller bindestreker
        .replace(/\s+/g, '-')           // Bytt ut mellomrom med bindestreker
        .replace(/-+/g, '-')            // Fjern flere bindestreker etter hverandre
        .trim();                        // Trim eventuelle bindestreker i starten eller slutten
}
