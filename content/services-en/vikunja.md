---
id: "vikunja"
name: "Vikunja"
description: "Open-source, self-hosted task management and to-do list app to organize your life."
tags:
  - "Productivity"
  - "Collaboration"
  - "Go"
  - "Vue"
  - "Docker"
  - "AGPL-3.0"
rating: 3.5
category: "Task Management & To-do Lists"
website: "https://vikunja.io/"
repo: "https://github.com/go-vikunja/vikunja"
updatedAt: "2026-02-10T00:00:00.000Z"
---

Vikunja is an open-source, self-hosted task management application designed to help users organize their personal and professional lives through a flexible to-do list interface. It offers rich project management features with multiple view modes, suitable for individuals and small teams.

## Key Features

- **Multiple Views**: List, Kanban board, Gantt chart, and table views
- **Project Management**: Create projects and sub-projects with flexible task hierarchy
- **Team Collaboration**: Share projects and namespaces with teams and users
- **Labels & Filters**: Categorize and filter tasks by labels, priorities, and due dates
- **Reminders**: Set task reminders to never miss important deadlines
- **File Attachments**: Upload and associate files with tasks
- **CalDAV Support**: Sync with calendar clients like Thunderbird and DAVx5
- **API-Driven**: Full REST API with Swagger documentation
- **Data Import**: Migrate from Todoist, Trello, Microsoft To-Do, and more

## Deployment Requirements

- Docker / Docker Compose deployment supported
- Backend built with Go, frontend with Vue.js
- Supports SQLite, MySQL, and PostgreSQL databases
- Minimum: 1 CPU core, 512MB RAM
- Recommended: 2+ CPU cores, 1GB+ RAM
- Optional: Reverse proxy (Nginx / Caddy) for HTTPS access
