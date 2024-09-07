export interface User {
  id: string;
  username: string;
  password: string;
  role: 'Super Admin' | 'Group Admin' | 'User'; // Restrict roles to these specific strings
  email: string;
  groups: string[];
}





export interface Group {
  id: string;
  name: string;
  admins: string[];
  members: string[];
  channels: Channel[];
  
}

export interface Channel {
  id: string;
  name: string;
  groupId: string;
  messages: Message[];
}

export interface Message {
  id: string;
  sender: string;
  content: string;
  timestamp: Date;
}
