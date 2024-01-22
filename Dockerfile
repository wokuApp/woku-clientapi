###################
# BUILD FOR LOCAL DEVELOPMENT
###################

FROM node:20-alpine As development

# Create api directory
WORKDIR /usr/src/api

COPY package*.json ./

# Install app dependencies using the `npm ci` command instead of `npm install`
RUN npm ci

COPY . .

# Run tests
RUN npm run test

# Run build
RUN npm run build

###################
# PRODUCTION
###################

FROM node:20-alpine As production

ENV NODE_ENV=production

WORKDIR /usr/src/api

COPY package*.json ./

RUN npm ci --omit=dev --legacy-peer-deps && npm cache clean --force

COPY  . .

COPY --from=development /usr/src/api/dist ./dist

EXPOSE 8080

CMD [ "node", "dist/main" ]