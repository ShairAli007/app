# Chat Application

## Overview

This project is a web-based chat application built using the MEAN stack (MongoDB, Express, Angular, Node.js) along with Peer.js for video communication. The app allows users to chat in groups and channels, with different levels of roles and permissions (Super Admin, Group Admin, and User). This documentation outlines the goals of the project, features implemented, and the technologies used.

## Features

### User Roles
- **Super Admin**: 
  - Can promote users to Group Admins. 
  - Can access and manage all groups and channels.
  - Has full administrative privileges.
  
- **Group Admin**:
  - Can create groups and channels.
  - Manages members and content within their assigned groups.
  - Can ban users from groups.

- **Chat User**:
  - Can join and leave groups.
  - Can send and receive messages in channels.
  - Can create new channels in existing groups.

### Functionalities
- **User Authentication**: 
  - Users can log in with their credentials, and their access rights are determined by their assigned role.
  
- **Group and Channel Management**: 
  - Group Admins can create groups, add channels, and manage users within the group.
  - Users can join/leave groups and channels.

- **Real-time Communication**:
  - Text chat between users in the same group and channel.
  - (Phase 2) Video chat using Peer.js for peer-to-peer video communication.

## Technologies Used

- **Angular**: Frontend framework for building the user interface.
- **Node.js**: Backend environment for server-side logic.
- **Express**: Web framework for handling server routes and APIs.
- **MongoDB**: (Phase 2) Database for storing user, group, and chat data.
- **Peer.js**: (Phase 2)For implementing peer-to-peer video chat.
- **RxJS**: Used for handling asynchronous data streams in the frontend.
  
## Project Structure

Chat Application/ 
	│ ├── src/ 
		│ ├── app/ 
			│ │ ├── components/ 
				│ │ │ ├── user-dashboard/ 
				│ │ │ ├── login/ 
				│ │ │ ├── group-admin-dashboard/ 
				│ │ │ ├── super-admin-dashboard/ 
			│ │ ├── services/ 
				│ │ │ server.js/ 
				│ │ │ ├── group.service.ts/ 
				│ │ │ ├── user.service.ts/ 
			│ │ ├── models/ 
				│ │ │ ├── user.model.ts/ 
				│ │ │ ├── group.model.ts 
				│ │ │ ├── channel.model.ts 
				│ │ │ ├── message.model.ts 



## Phase 1

### Implementation
Phase 1 focuses on setting up the user interface, user management, and group/channel creation without the need for a database. Data is stored in the browser’s local storage for the frontend and simple in-memory storage for the backend. The app’s pages are navigable, though not all functionalities are yet operational.

- **User Login**: Basic user login where the role determines the user interface.
- **Group and Channel Management**: Admin users can create groups and channels, while regular users can view and join groups/channels.

## Phase 2 (Planned)

- **Real-time Text/Video Chat**: Adding real-time communication features, including peer-to-peer video chat using Peer.js.
- **Database Integration**: MongoDB will be introduced for persistent storage of user, group, and chat data.
- **Socket.io**: For real-time communication to handle text chat between users.

## How to Run

### Prerequisites
- Node.js and npm installed on your machine.

### Backend Setup
1. Navigate to the `Chat Application/src/app/services/` folder.
2. Install dependencies:
3. Run the backend server:

### Frontend Setup
1. Navigate to the `Chat Application/` folder.
2. Install dependencies:
3. Run the Angular app:

### Access the App
Once both the backend and frontend servers are running, open a browser and go to:

## Future Work
- Implement real-time chat features using Socket.io and Peer.js.
- Migrate to a persistent database (MongoDB).
- Add comprehensive user management with role-based access controls.

