#!/bin/bash

# Exit immediately if any command returns a non-zero status
set -e

echo "Clearing optimization cache..."
php artisan optimize:clear

echo "Pulling latest changes from repository..."
git pull

echo "Building production assets..."
npm run build

echo "Restarting Inertia SSR service..."
sudo systemctl restart inertia-ssr

echo "Reloading Laravel Octane..."
php artisan octane:reload

echo "Optimizing application configuration and routes..."
php artisan optimize

echo "Deployment completed successfully!"