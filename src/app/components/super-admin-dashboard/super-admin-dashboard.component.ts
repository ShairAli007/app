import { Component, OnInit } from '@angular/core';
import { GroupService } from '../../services/group.service';
import { UserService } from '../../services/user.service';
import { Channel } from '../../models/channel.model'; 
import { User } from '../../models/user.model'; 
@Component({
  selector: 'app-super-admin-dashboard',
  templateUrl: './super-admin-dashboard.component.html',
  styleUrls: ['./super-admin-dashboard.component.css']
})
export class SuperAdminDashboardComponent implements OnInit {
  groups: any[] = [];
  users: any[] = [];
  channels: Channel[] = [];

  constructor(private groupService: GroupService, private userService: UserService) {}

  ngOnInit(): void {
    this.groups = this.groupService.getGroups();
    this.users = this.userService.getUsers();
    this.channels = this.getChannelsForAdmin(); 
  }

  createGroup(): void {
    const newGroup = {
      id: this.generateUniqueId(),
      name: 'New Group',
      admins: [],
      members: [],
      channels: []
    };
    this.groupService.addGroup(newGroup);
    this.groups = this.groupService.getGroups();
  }

  deleteGroup(groupId: string): void {
    this.groupService.deleteGroup(groupId);
    this.groups = this.groupService.getGroups();
  }

  createUser(): void {
    const username = prompt('Enter username:');
    const password = prompt('Enter password:');
    const role = prompt('Enter role (Super Admin, Group Admin, User):');
  
    if (username && password && role) {
      const newUser: User = {
        id: this.generateUniqueId(),
        username,
        password, 
        role: role as 'Super Admin' | 'Group Admin' | 'User', 
        email: '', 
        groups: [] 
      };
      this.userService.createUser(newUser);
      this.users = this.userService.getUsers();
    }
  }
  

  promoteUser(userId: string): void {
    const user = this.userService.getUserById(userId);
    if (user) {
      user.role = 'Group Admin';
      this.userService.updateUser(user);
      alert(`${user.username} has been promoted to Group Admin.`);
    }
  }

  deleteUser(userId: string): void {
    this.userService.deleteUser(userId);
    this.users = this.userService.getUsers();
  }

  private generateUniqueId(): string {
    return Math.random().toString(36).substr(2, 9);
  }

  getChannelsForAdmin(): Channel[] {
    let channels: Channel[] = [];
    this.groups.forEach(group => {
      channels = [...channels, ...group.channels];
    });
    return channels;
  }

  createChannel(groupId: string): void {
    const newChannel: Channel = {
      id: this.generateUniqueId(),
      name: 'New Channel',
      groupId: groupId,
      messages: []
    };
    this.groupService.addChannelToGroup(groupId, newChannel);
    this.channels = this.getChannelsForAdmin(); 
  }
  addChannelToGroup(groupId: string, newChannel: Channel): void {
    const group = this.groups.find(g => g.id === groupId);
    if (group) {
      group.channels.push(newChannel);
  
    }
  }
  editChannel(channelId: string): void {
    const channel: Channel | undefined = this.channels.find(c => c.id === channelId); // Specify type
    if (channel) {
      const newName = prompt('Enter new channel name:', channel.name);
      if (newName) {
        channel.name = newName;
        this.channels = this.getChannelsForAdmin(); 
      }
    }
  }

  
}
