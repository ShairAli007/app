import { Message } from './message.model';

export interface Channel {
  id: string;
  name: string;
  groupId: string;
  messages: any[];
}
