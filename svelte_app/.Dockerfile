FROM node:alpine

WORKDIR /app

COPY svelte.config.js ./
COPY vite.config.js ./
COPY tailwind.config.js ./
COPY postcss.config.js ./
COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

RUN ls -l build && test -f build/index.js

EXPOSE 3000

CMD ["node", "build"]
