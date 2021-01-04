FROM node:latest
RUN mkdir build
WORKDIR /build
ADD ./build ./
ENV NODE_ENV production
RUN yarn install --prod
RUN yarn global add pm2
RUN pm2 link imvx6q7wmaeel5i ocs6wng2zq5k5o2
CMD ["yarn","run","pm2"]
