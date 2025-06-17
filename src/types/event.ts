export interface Event {
  id: number;
  name: string;
  numTickets: number;
  description: string;
  hostId: number; // FK_Host
  picture: string; // z.B. URL oder Base64
  availableDiets: string[]; // z.B. ["vegan", "vegetarisch", "glutenfrei"]
}
