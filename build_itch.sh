#!/bin/bash

# Build the project
echo "Building project..."
npm run build

# Check if build was successful
if [ $? -ne 0 ]; then
    echo "Build failed!"
    exit 1
fi

# Create zip file for itch.io
# Itch.io requires the index.html to be at the root of the zip
echo "Creating zip file for itch.io..."
cd dist
zip -r ../adult_certification_itch.zip ./*

echo "Done! Upload 'adult_certification_itch.zip' to itch.io."
