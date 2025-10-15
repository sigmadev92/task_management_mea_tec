# Task Management Application With Mocked API

### Assignment by MEATec Battery Intelligence

A task management application (mocked API) built with Vite, React, TypeScript, TailwindCSS, Ant Design, Redux Toolkit, Formik, React Router and Mock Service Worker (MSW).

### Table of Contents

0. Login Credentials
1. Project Overview
2. Key features
3. Tech Stack
4. Prerequisites
5. Getting Started
6. Environment Varibales
7. Project Structure
8. Type Definition
9. Routing and Navigation
10. Formik
11. MSW
12. Layout and Styling
13. Troubleshoting
14. Deployment
15. Bonus (Optional Enhancements)

### Login Credentials

```
Website URL : https://task-management-mea-tec.vercel.app
username : test
password : test123

```

### Project Overview

This project is an Assignment for the first step assessment of the candidate for the role of Frontend Developer at Mea Tec Battery Intelligence organization.
The project is a frontend specific (simulation of a task management application) using mocked API.

### Key features

- Create / update / delete tasks

- Authentication flows (login/logout) mocked by MSW

- Protected routes with createBrowserRouter

- Global state with Redux Toolkit

- Form handling with Formik

- Responsive UI using Tailwind + AntD components

- Mock server (MSW) for API isolation

### Tech Stack

- Vite + React + TypeScript

- Redux Toolkit for Global state management

- React Router For routing

- Formik - For handling forms

- Tailwind CSS (For styling)

- Ant Design (AntD v5) For layout, components and icons

- MSW (Mock Service Worker) for Mock server responses

### Prerequisites

- Install LTS version of Nodejs. It works will work fine.

### Getting Started

1.  Clone the Repo

```
bash

git clone https://github.com/sigmadev92/task_management_mea_tec.git
cd <repo-folder>

```

2.  Install Dependencies (via npm)

```
bash

npm install
# or
# yarn
# pnpm install
```

3.  Run the development Server

```
bash

npm run dev
```

4.  Check if the MSW is running properly.

- Go to Browser console. Reload once. You will see this message

```
MSW is Enabled
# or similar
```

### Environment Variables

- This app is using no environment variables. We are just checking if the current environment is development or Production for MSW configurations.

```
.env

VITE_NODE_ENV = "DEV"
```

### Project Structure

```
public/
  |--- mockServiceWorker.js      # Generated automatically by MSW init command
  |--- mea_tec_inc_logo.jpg      # For Logo. (Replacable)
src/
  |--- main.tsx                  # Entry point of the application
  |--- App.tsx
  |--- index.css                 # global css file
  |--- types/                     # for defining types
        |--- user.types.ts         # contains type definitions for users
        |--- task.types.ts         # for tasks
  |--- layouts/
        |--- LayouSecond.tsx     # Main Layout for the app
        |--- RootLayout.tsx      # Secondary Layout (Can delete the file)
  |--- routes
  |--- pages
  |--- components
  |--- redux_toolkit             # contains store, slices and reducers
  |--- mock_api                  # contains configuration for MSW
```

### <span style="color:red;">Type definition</span>

- We have two features in the app - <code>User</code> and <code>Task</code>
- The types for both the features are defined in

  - <code>/types/user.types.ts</code> - for user related types
  - <code>/types/task.types.ts</code> - for task related types

- These files are used by every page and component in both fronted and mocked server

### Routing and Navigation

#### Routing

- We have used React Router for routing which is provided by <code>react-router-dom</code>
- We created router using <code>createBrowserRouter</code> and routes using <code><RouterProvider\></code>
- We also made protected routes to protect sensitive routes
  - #### Protected Routes - To protect Dashboard page
    - By creating <code>components/ExposedRoute.tsx</code>

```
  const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
    const { loggedIn } = useAppSelector((state) => state.user);
    if (!loggedIn) {
       return <Navigate to="/login" replace />;
    }

    return <>{children}</>;
  };
```

- #### Exposed Routes - To prevent authenticated user on going /login page
  - By creating <code>components/ExposedRoute.tsx</code>

```

  const ExposedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
    const { loggedIn } = useAppSelector((state) => state.user);
    if (loggedIn) {
        return <Navigate to="/dashboard" replace />;
    }
    return <>{children}</>;
    };
```

#### Navigation

- We can use <code><NavLink\></code> components from <code>react-router-dom</code> but we used <code>Menu</code> component from <code>antd</code> as it is necessary to used Antd.

### State Management Redux Toolkit

```
src/
 |--- redux_toolkit/                           # redux for global state management
        |--- reducers/                           # contains reducers
               |--- user/
                      |--- userSlice.ts            # contains user slice, reducer, actions and sideffects
               |--- task/
                      |--- tasksSlice.ts           # contains task slice, reducer, actions and sideeffects
        |--- store/
               |--- store.ts
               |--- hooks.ts
```

### Forms (Formik)

- We have used Formik for creating 3 forms
  1. For Login
  2. For Adding New Task
  3. For Editing an Existing Task

### MSW - For Mock API

```
src/
 |--- mock_api/
        |--- browser.ts
        |--- server.ts
        |--- handlers/                        # Contains routes for the features
               |--- index.ts                     #
               |--- taskHandler.ts               # contains endpoints and handlres for task
               |--- userHandler.ts               # contains endpoints and handlres for users
        |--- sample_data
               |--- task.data.ts                 # in-memory sample data for tasks
               |--- users.data.ts                # in-memory sample data for user
```

- <code>mock_api/handlers/userHandler.ts</code>

```
export const userHandlers = [
 http.post("/api/login", async ({ request }) => {...}),

 http.get("/api/logout", async ({ cookies }) => {...}),

 http.post("/api/auth", async ({ cookies }) => {...}),
];
```

- Sample data for user <code>mock_api/sample_data/users.data.ts</code>

```
import { type User } from "../../types/user.types";
export const users: User[] = [
 {
   id: "1",
   fullName: "Devansh Singh",
   email: "user1@test.com",
   password: "user@Pass1",
   sessionId: "devansh123",
 },
 {
   id: "2",
   fullName: "Ashika Gupta",
   email: "user2@test.com",
   password: "user@Pass2",
   sessionId: "ashika123",
 },
];
```

- <code>mock_api/handlers/taskHandler.ts</code>

```
export const tasksHandlers = [
 # fetch all tasks of a user
 http.get("/api/tasks", ({ cookies }) => {...}),

 # create a new task
 http.post("/api/tasks", async ({ request, cookies }) => {...}),

 # edit an existing task
 http.put("/api/tasks/:taskId", async ({ request, params, cookies }) => {})

 # delete an existing task
 http.delete("/api/tasks/:taskId", ({ params, cookies }) => {})

];
```

- Sample data for tasks <code>mock_api/sample_data/tasks.data.ts</code>

```
import { type Task } from "../../types/task.types";
export const tasks: Task[] = [
 {
   id: "1",
   userId: "1",
   title: "Learn Redux Toolkit",
   description: "Leaning currently",
   status: "pending",
 },
 {
   id: "2",
   userId: "2",
   title: "Setup MSW",
   description: "MSW is wroking great",
   status: "completed",
 },
];

```

- combining the handlers in 1 file <code>mock_api/handlers/index.ts</code>

```
import { userHandlers } from "./userHandler";
import { tasksHandlers } from "./tasksHandler";

export const handlers = [...userHandlers, ...tasksHandlers];
```

- starting the MSW server in <code>main.tsx</code>

```
if (import.meta.env.VITE_NODE_ENV === "DEV") {
 async function mod() {
   const { worker } = await import("./mock_api/browser");
   worker.start();
 }
 mod();
}
```

### Layout and Styling

- We have used TailwindCss for Styling and Antd for layouts, components and icons
- The Css for these two libraries clash with each other. So to avoid clash, we have to first use antd css library and then tailwind library.

```
import "@ant-design/v5-patch-for-react-19"; // for React V19
import "./index.css"; // tailwind Css
```

- Also, don't try to style Antd components with tailwindcss classes

### Troubleshooting

1. Can't Find Route (404)
   This error happens when we reload the browser. Our MSW server also restarts in some time but the <code>fetchLoginStatus</code> API is called immediatly which gets no endpoint and results in <code>Error 404</code>.

- Solution : Delay the API call. In <code>/src/App.tsx</code>

```
useEffect(() => {
  setLoader(true);
  setTimeout(() => {
    dispatch(fetchLoginStatus());
    setLoader(false);
  }, 500);
}, []);
```

### Deployment

- Deployed Links

```
github url : https://github.com/sigmadev92/task_management_mea_tec
Vercel url : https://task-management-mea-tec.vercel.app
```

### Bonus (Optional Enhancements)

    - Dark Mode Toggle [Not done]
    - Unite tests for Components [ Not Done]
    - Using Formik [ Done]
