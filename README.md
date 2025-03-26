# Developer Resume CMS

A headless CMS built with Next.js and Tailwind CSS for managing developer resume content. This application allows developers to manage their resume content through a clean interface and exposes the data via a .NET Web API, which can be consumed by a separately deployed static resume website.

## Tech Stack

- Frontend: Next.js 15 with Tailwind CSS
- Backend: .NET Web API
- Database: MySQL
- Authentication: Auth0
- API Documentation: https://github.com/ArthurLaurijssen/empower-tech-resume-api
- Resume Site Repository: https://github.com/ArthurLaurijssen/empower-tech-resume

## System Requirements

- Node.js 22
- .NET 9
- MySQL 8
- Docker [optional]

## Features

- Personal Information Management
- Professional Experience
- Project Portfolio
- Social Media Links
- Secure Admin Interface with Auth0 Authentication

## Installation

```bash
# Clone the repository
git clone https://github.com/ArthurLaurijssen/empower-tech-resume-cms

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local