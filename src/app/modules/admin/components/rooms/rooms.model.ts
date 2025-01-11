export interface Room {
  roomId: string;
  type: string;
  capacity: number;
  status: string; // For example: "Available", "Occupied", etc.
}
