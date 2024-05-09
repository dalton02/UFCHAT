FROM node:alpine

RUN apk update && \
    apk add --no-cache postgresql postgresql-contrib

WORKDIR /app

COPY package*.json ./
COPY tsconfig.json ./

RUN npm install

COPY . .

EXPOSE 4005

CMD ["npm", "run","build"]
