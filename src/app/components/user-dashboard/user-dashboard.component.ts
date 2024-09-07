import { Component, OnInit } from '@angular/core';
import { GroupService } from '../../services/group.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css']
})
export class UserDashboardComponent implements OnInit {
  groups: any[] = [];
  channels: any[] = [];

  constructor(private groupService: GroupService, private userService: UserService) {}


ngOnInit(): void {
  this.groups = this.groupService.getGroupsForUser('currentUserId');
  console.log('Groups:', this.groups);
  this.channels = this.getAvailableChannels();
  console.log('Channels:', this.channels);
}


  joinGroup(groupId: string): void {
    console.log('Joining group:', groupId);
    this.groupService.addUserToGroup(groupId, 'currentUserId');
    this.groups = this.groupService.getGroupsForUser('currentUserId');
  }
  
  leaveGroup(groupId: string): void {
    console.log('Leaving group:', groupId);
    this.groupService.removeUserFromGroup(groupId, 'currentUserId');
    this.groups = this.groupService.getGroupsForUser('currentUserId');
  }
  
  joinChannel(channelId: string): void {
    const channel = this.channels.find(c => c.id === channelId);
    if (channel) {
      console.log('Joining channel:', channelId); 
      alert(`Joined channel: ${channel.name}`);
    }
  }
  
  private getAvailableChannels(): any[] {
    return this.groups.flatMap(group => group.channels);
  }
}
