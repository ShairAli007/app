
import { Injectable } from '@angular/core';

interface Channel {
  id: string;
  name: string;
  groupId: string;
  messages: any[]; 
}

interface Group {
  id: string;
  name: string;
  admins: string[]; 
  members: string[];
  channels: Channel[];
}

@Injectable({
  providedIn: 'root'
})
export class GroupService {

  private groups: Group[] = [];

  constructor() {
    this.loadGroups();
  }

  private loadGroups(): void {
    const groupsData = localStorage.getItem('groups');
    if (groupsData) {
      this.groups = JSON.parse(groupsData);
    } else {
      this.groups = [];
      this.saveGroups();
    }
  }

  private saveGroups(): void {
    localStorage.setItem('groups', JSON.stringify(this.groups));
  }

  getGroups(): Group[] {
    return this.groups;
  }

  
  getGroupById(id: string): Group | undefined {
    return this.groups.find(group => group.id === id);
  }

  addGroup(newGroup: Group): void {
    const groupExists = this.groups.some(group => group.name === newGroup.name);
    if (groupExists) {
      throw new Error('Group with this name already exists');
    }
    this.groups.push(newGroup);
    this.saveGroups();
  }

  updateGroup(updatedGroup: Group): void {
    const index = this.groups.findIndex(group => group.id === updatedGroup.id);
    if (index > -1) {
      this.groups[index] = updatedGroup;
      this.saveGroups();
    } else {
      throw new Error('Group not found');
    }
  }

  deleteGroup(groupId: string): void {
    this.groups = this.groups.filter(group => group.id !== groupId);
    this.saveGroups();
  }

  addChannelToGroup(groupId: string, newChannel: Channel): void {
    const group = this.groups.find(g => g.id === groupId);
    if (group) {
      group.channels.push(newChannel);
     
    }
  }

  deleteChannelFromGroup(groupId: string, channelId: string): void {
    const group = this.groups.find(g => g.id === groupId);
    if (group) {
      group.channels = group.channels.filter(c => c.id !== channelId);
      this.saveGroups();
    }
  }
  updateChannel(channelId: string, updatedChannel: Channel): void {
    const group = this.groups.find(g => g.channels.some(c => c.id === channelId));
    if (group) {
      const channel = group.channels.find(c => c.id === channelId);
      if (channel) {
        Object.assign(channel, updatedChannel); // Update channel details
        this.saveGroups();
      }
    }
  }
  addUserToGroup(groupId: string, userId: string): void {
    const group = this.getGroupById(groupId);
    if (group) {
      if (!group.members.includes(userId)) {
        group.members.push(userId);
        this.updateGroup(group);
      }
    } else {
      throw new Error('Group not found');
    }
  }

  removeUserFromGroup(groupId: string, userId: string): void {
    const group = this.getGroupById(groupId);
    if (group) {
      group.members = group.members.filter(member => member !== userId);
      this.updateGroup(group);
    } else {
      throw new Error('Group not found');
    }
  }



getGroupsForUser(userId: string): any[] {
  return [
    { id: 'group1', name: 'Group 1', channels: [{ id: 'channel1', name: 'Channel 1' }] },
    { id: 'group2', name: 'Group 2', channels: [{ id: 'channel2', name: 'Channel 2' }] }
  ];
}

getChannelsForUser(userId: string): any[] {
  return this.getGroupsForUser(userId).flatMap(group => group.channels);
}

}
