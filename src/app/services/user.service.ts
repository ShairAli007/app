import { Injectable } from '@angular/core';

interface User {
  id: string;
  username: string;
  password: string;
  email: string;
  role: 'Super Admin' | 'Group Admin' | 'User';
  groups: string[]; 
}

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private users: User[] = [];

  constructor() {
   
    this.users = [
      {
        id: '1',
        username: 'admin',
        password: 'admin123',
        role: 'Super Admin',
        email: 'admin@example.com',
        groups: []
      }
    ];
  }

  private loadUsers(): void {
    const usersData = localStorage.getItem('users');
    if (usersData) {
      this.users = JSON.parse(usersData);
    } else {
     
      this.users = [
        { id: 'superAdminId', username: 'super',password: '123', email: 'super@example.com', role: 'Super Admin', groups: [] }
      ];
      this.saveUsers();
    }
  }

  private saveUsers(): void {
    localStorage.setItem('users', JSON.stringify(this.users));
  }

  getUsers(): User[] {
    return this.users;
  }

  getUserById(id: string): User | undefined {
    return this.users.find(user => user.id === id);
  }
  createUser(user: User): void {
    this.users.push(user);
  }
  addUser(newUser: User): void {
    const userExists = this.users.some(user => user.username === newUser.username);
    if (userExists) {
      throw new Error('User with this username already exists');
    }
    this.users.push(newUser);
    this.saveUsers();
  }

  updateUser(updatedUser: User): void {
    const index = this.users.findIndex(user => user.id === updatedUser.id);
    if (index > -1) {
      this.users[index] = updatedUser;
      this.saveUsers();
    } else {
      throw new Error('User not found');
    }
  }

  deleteUser(userId: string): void {
    this.users = this.users.filter(user => user.id !== userId);
    this.saveUsers();
  }

  promoteUser(userId: string, newRole: 'Group Admin' | 'Super Admin'): void {
    const user = this.getUserById(userId);
    if (user) {
      user.role = newRole;
      this.updateUser(user);
    } else {
      throw new Error('User not found');
    }
  }
}
