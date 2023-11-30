FROM node:18-alpine

RUN corepack enable

COPY . /chat-group/client

WORKDIR /chat-group/client

RUN pnpm install

RUN pnpm run build

EXPOSE 3000

CMD ["pnpm", "run", "preview", "--port", "3000", "--host"]