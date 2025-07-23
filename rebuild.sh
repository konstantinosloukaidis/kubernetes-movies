#!/bin/bash

echo "Stopping and removing containers..."
docker-compose -f docker-compose.prod.yml down

echo "Rebuilding images..."
docker-compose -f docker-compose.prod.yml build

echo "Starting containers (detached)..."
docker-compose -f docker-compose.prod.yml up -d

echo "Done."