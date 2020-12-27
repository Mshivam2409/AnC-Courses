FROM node:latest
RUN mkdir build
WORKDIR /build
ADD ./build build/
ENV NODE_ENV production
RUN yarn install --prod
CMD ["yarn","start"]
