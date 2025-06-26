export interface EmailRequest {
  vorname: string;
  nachname: string;
  email: string;
  telefonnummer: string;
  datum: string; // ISO-Format (z.B. "2025-06-28")
  anlass: string;
  anzahlPersonen: number | null;
  beschreibung: string;
}
