import { Channel } from './channel.model';

export interface Group {
  id: string;
  name: string;
  admins: string[];
  members: string[];
  channels: Channel[];
}
