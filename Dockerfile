FROM node:23

WORKDIR /app

COPY package*.json ./
COPY tsconfig*.json ./
COPY . .

RUN npm install -g @nestjs/cli
RUN npm install

RUN npm run build

EXPOSE 3000

CMD ["npm", "run", "start:prod"]