FROM mcr.microsoft.com/playwright:v1.52.0-jammy

WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Install Playwright browsers (if not fully included, though the image usually has them)
# RUN npx playwright install --with-deps chromium

# Copy application source code
COPY . .

# Expose the port Cloud Run expects (8080 by default)
ENV PORT=8080
EXPOSE 8080

# Start the application
CMD ["npm", "start"]
