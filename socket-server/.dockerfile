# Chose a stable Node Version
FROM node:18

COPY . .

# Installing Packages
RUN npm install

# Running the Next.js app (Uses React)
CMD ["npm", "run", "start"]