FROM node:18

COPY . .

RUN npm install

CMD ["npm", "run", "start"]