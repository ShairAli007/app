import { Component, OnInit } from '@angular/core';
import { GroupService } from '../../services/group.service';
import { UserService } from '../../services/user.service';

interface Group {
  id: string;
  name: string;
  admins: string[];
  members: string[];
  channels: Channel[];
}

interface Channel {
  id: string;
  name: string;
  groupId: string;
  messages: any[];
}

@Component({
  selector: 'app-group-admin-dashboard',
  templateUrl: './group-admin-dashboard.component.html',
  styleUrls: ['./group-admin-dashboard.component.css']
})
export class GroupAdminDashboardComponent implements OnInit {
  groups: Group[] = [];
  channels: Channel[] = [];
  selectedGroupId: string | null = null;  

  constructor(private groupService: GroupService, private userService: UserService) {}

  ngOnInit(): void {
    this.groups = [
      {
        id: 'group1',
        name: 'Group 1',
        admins: ['admin1'],
        members: [],
        channels: [
          { id: 'channel1', name: 'Channel 1', groupId: 'group1', messages: [] },
          { id: 'channel2', name: 'Channel 2', groupId: 'group1', messages: [] }
        ]
      }
    ];
    this.channels = this.getChannelsForAdmin();
    console.log('Channels:', this.channels);
  }

  createChannel(groupId: string): void {
    const newChannel: Channel = {
      id: this.generateUniqueId(),
      name: prompt('Enter new channel name:', 'New Channel') || 'New Channel',
      groupId: groupId,
      messages: []
    };

    if (groupId) {
      this.groupService.addChannelToGroup(groupId, newChannel);
      this.channels = this.getChannelsForAdmin();
    } else {
      alert('Please select a group to add the channel to.');
    }
  }

  editChannel(channelId: string): void {
    const channel = this.channels.find(c => c.id === channelId);
    if (channel) {
      const newName = prompt('Enter new channel name:', channel.name);
      if (newName) {
        channel.name = newName;
        this.groupService.updateChannel(channelId, channel);
      }
    }
  }

  deleteChannel(channelId: string): void {
    const groupId = this.groups.find(group => group.channels.some(channel => channel.id === channelId))?.id;
    if (groupId) {
      this.groupService.deleteChannelFromGroup(groupId, channelId);
      this.channels = this.getChannelsForAdmin();
    }
  }

  private getChannelsForAdmin(): Channel[] {
    const currentAdminId = 'admin1'; 
    const adminGroups = this.groups.filter(group => group.admins.includes(currentAdminId));
    return adminGroups.flatMap(group => group.channels);
  }

  private generateUniqueId(): string {
    return Math.random().toString(36).substr(2, 9);
  }
  deleteUserFromGroup(userId: string, groupId: string): void {
    this.groupService.removeUserFromGroup(groupId, userId);
    this.groups = this.groupService.getGroups(); 
  }

}
