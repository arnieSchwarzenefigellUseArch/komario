# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Project Overview

Komario is a full-stack web application with:
- **Frontend**: HTML/CSS/JavaScript client-side application
- **Backend**: Go-based server application

## Project Structure

```
komario/
├── frontend/    # Frontend files (HTML, CSS, JavaScript)
├── backend/     # Go backend application
│   ├── src/     # Main source code
│   ├── tests/   # Test files
│   ├── config/  # Configuration files (excluded from git)
│   └── docs/    # Backend documentation
```

## Common Commands

### Backend (Go)

#### Building
```bash
cd backend && go build -o bin/app ./src
```

#### Running
```bash
cd backend && go run ./src
```

#### Testing
```bash
# Run all tests
cd backend && go test ./...

# Run tests with coverage
cd backend && go test -cover ./...

# Run tests with verbose output
cd backend && go test -v ./...

# Run a specific test
cd backend && go test -run TestName ./tests

# Generate coverage profile
cd backend && go test -coverprofile=coverage.out ./...
cd backend && go tool cover -html=coverage.out
```

#### Linting and Formatting
```bash
# Format code
cd backend && go fmt ./...

# Run go vet
cd backend && go vet ./...

# If golangci-lint is installed
cd backend && golangci-lint run
```

#### Dependencies
```bash
# Download dependencies
cd backend && go mod download

# Tidy dependencies
cd backend && go mod tidy

# Vendor dependencies (if needed)
cd backend && go mod vendor
```

### Frontend

Frontend development commands will depend on your specific setup (vanilla HTML/CSS/JS, build tools, etc.)

## Development Guidelines

### Language and Comments
- Code and comments should be written in Russian
- Follow idiomatic conventions for each technology (Go best practices for backend, web standards for frontend)

### Configuration Management
- Configuration files (config.yaml, config.json, .env) are excluded from version control
- Use environment variables or config files in backend/config/ directory for environment-specific settings
- Never commit secrets or sensitive configuration to the repository

### Backend Code Organization
- Place main application code in `backend/src/`
- Keep tests in `backend/tests/` directory
- Maintain clear separation between business logic, handlers, and data layers

### Testing Strategy
- Write table-driven tests where appropriate
- Aim for meaningful test coverage, especially for business logic
- Use subtests for better test organization in Go

### Git Workflow
- Main repository is at the project root (`/home/roman/.projects/komario`)
- Both frontend and backend subdirectories are part of the monorepo
