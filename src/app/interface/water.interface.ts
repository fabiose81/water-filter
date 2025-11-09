import { Status } from "./status.interface";

export interface Water {
  id: string;
  finished: boolean;
  status: Status[];
}