# Docker Containerization Guide

## Building and Running with Docker

### Quick Start
```bash
# Build the Docker image
docker build -t syst-pos .

# Run the container
docker run -p 3000:3000 syst-pos
```

### Using Docker Compose (Recommended)
```bash
# Start the application
docker-compose up -d

# View logs
docker-compose logs -f

# Stop the application
docker-compose down
```

### Development Mode
```bash
# For development with hot reload (optional)
docker-compose -f docker-compose.dev.yml up
```

## Environment Variables

The following environment variables can be configured:

| Variable | Description | Default |
|----------|-------------|---------|
| `NODE_ENV` | Environment mode | `production` |
| `PORT` | Application port | `3000` |
| `NEXT_PUBLIC_APP_NAME` | Application display name | `Syst POS` |
| `NEXT_PUBLIC_API_URL` | External API URL | `` |

### Setting Environment Variables

#### Option 1: Docker Compose
Create a `.env` file in the project root:
```env
NODE_ENV=production
PORT=3000
NEXT_PUBLIC_APP_NAME=Syst POS
NEXT_PUBLIC_API_URL=https://your-api.com
```

#### Option 2: Docker Run
```bash
docker run -p 3000:3000 \
  -e NODE_ENV=production \
  -e NEXT_PUBLIC_APP_NAME="Syst POS" \
  syst-pos
```

## Multi-Stage Build Features

The Dockerfile uses multi-stage builds for optimal image size:

1. **Builder Stage**: Installs all dependencies and builds the Next.js application
2. **Production Stage**: Uses a minimal Node.js Alpine image for runtime

### Benefits:
- **Smaller Image Size**: Only necessary files are copied to the final image
- **Security**: Non-root user execution in production
- **Performance**: Optimized layer caching during builds
- **Dependencies**: Only production dependencies included

## Production Deployment

### Health Check
The container includes a health check endpoint at `/health`:
```bash
curl http://localhost:3000/health
```

### Security Features
- Non-root user execution
- Security headers configured
- Minimal attack surface with standalone output

### Scaling
For production deployment, consider:
- Load balancer for multiple instances
- Reverse proxy (nginx) configuration
- SSL/TLS certificates
- Monitoring and logging

## Troubleshooting

### Common Issues

1. **Port already in use**
   ```bash
   # Change the port mapping
   docker run -p 3001:3000 syst-pos
   ```

2. **Build fails due to dependencies**
   ```bash
   # Clear npm cache and rebuild
   docker build --no-cache -t syst-pos .
   ```

3. **Permission issues**
   ```bash
   # Check if .next directory exists and has correct permissions
   ls -la .next
   ```

### Logs
```bash
# View container logs
docker logs <container-id>

# Follow logs in real-time
docker logs -f <container-id>
```
