FROM node:latest
RUN mkdir build
WORKDIR /build
ADD ./build ./
ENV NODE_ENV production
RUN yarn install --prod
CMD ["yarn","start"]
