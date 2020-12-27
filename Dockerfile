FROM node:latest
RUN mkdir build
WORKDIR /build
ENV NODE_ENV production
RUN yarn install --prod
CMD ["yarn","start"]
