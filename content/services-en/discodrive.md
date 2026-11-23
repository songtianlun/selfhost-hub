---
id: "discodrive"
name: "DiscoDrive"
description: "One self-hosted server for files, photos, calendars, contacts, music and books, served over WebDAV, CalDAV/CardDAV, OpenSubsonic and OPDS so the apps you already use connect to it."
tags:
  - "PolyForm-Noncommercial-1.0.0"
  - "Go"
  - "Docker"
category: "File Transfer & Synchronization"
website: "https://discodrive.app"
repo: "https://github.com/discodrive-cloud/discodrive"
#image: "/placeholder.svg?height=300&width=400"
---

DiscoDrive replaces a set of separate self-hosted services (a file server, a photo gallery, a CalDAV server, a Subsonic server and an ebook library) with one server and one login. Files are stored as ordinary files in ordinary folders on disk, so they stay readable without DiscoDrive.

DiscoDrive is source-available under the PolyForm Noncommercial License 1.0.0: free for personal and other non-commercial use.

## Key Features

- **Files and sync**: Web file manager with previews, versions, trash and public share links; WebDAV mount in Finder, Windows Explorer and Linux file managers; desktop sync app that keeps conflict copies instead of overwriting.
- **Encrypted vault**: End-to-end encrypted folder in the Cryptomator vault format, so it can also be opened with Cryptomator.
- **Calendars, contacts and tasks**: CalDAV/CardDAV that works with the built-in Apple apps, DAVx⁵ and Thunderbird; sharing of calendars and address books.
- **Music**: OpenSubsonic API for any compatible player, plus internet radio, podcasts and a tag editor.
- **Books**: OPDS catalog for KOReader, PocketBook and other readers, with reading progress sync. EPUB, FB2, PDF, MOBI, CBZ and CBR.
- **Photos**: Timeline, map, favorites, shared albums, HEIC/HDR and Live Photos support. Optional face recognition groups photos by person and runs on your own server; a duplicate finder shows repeated photos.
- **Saved**: Bookmarks and read-later through a browser extension, and server-side downloads.
- **Accounts**: Multi-user with quotas, TOTP, passkeys and per-app passwords.
- **Clients**: Desktop apps for macOS, Windows and Linux, an Android app, and an iOS app on the App Store.

## Deployment Requirements

- Docker and Docker Compose; the compose file also starts PostgreSQL and nginx
- Prebuilt server image for amd64 and arm64, including Raspberry Pi
- Face recognition is an optional extra container
- Installation guide: https://discodrive.app/docs/install
