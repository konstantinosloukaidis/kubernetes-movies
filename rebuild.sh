#!/bin/bash

echo "Stopping and removing containers..."
docker-compose -f docker-compose.db.yml down

echo "Rebuilding images..."
docker-compose -f docker-compose.db.yml build

echo "Starting containers (detached)..."
docker-compose -f docker-compose.db.yml up -d

echo "Done."