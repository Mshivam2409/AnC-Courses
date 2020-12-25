FROM node:12.18.2
RUN mkdir server
WORKDIR /server
ADD ./ ./
ENV PORT=3001
EXPOSE 3001
RUN yarn install
CMD [ "yarn", "start" ]