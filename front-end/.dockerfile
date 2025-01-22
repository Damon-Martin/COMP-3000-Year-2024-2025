# Chose a stable Node Version
FROM node:18

COPY . .

# Installing Packages
RUN npm install

# Build the Next.js app
RUN npm run build

# Running the Next.js app (Uses React)
CMD ["npm", "run", "start"]