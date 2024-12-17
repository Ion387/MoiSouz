FROM node:lts as dependencies
WORKDIR /var/www
COPY package.json package-lock.json jsconfig.json .env ./
#RUN npm install
RUN yarn install
EXPOSE 3000

#COPY pages ./pages
#COPY src ./src
#RUN yarn build

#FROM node:lts as builder
#WORKDIR /var/www
#COPY --from=dependencies node_modules ./node_modules
#RUN yarn build

#FROM node:lts as runner
#WORKDIR /var/www
#ENV NODE_ENV production

#COPY --from=builder public ./public
#COPY --from=builder package.json ./package.json
#COPY --from=builder .next ./.next
#COPY --from=builder node_modules ./node_modules


#CMD ["yarn", "start"]
