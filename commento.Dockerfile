FROM nginx:mainline
RUN apt update && apt install wget -y
RUN wget https://dl.commento.io/release/commento-v1.8.0-linux-glibc-amd64.tar.gz
RUN tar xvf commento-v1.8.0-linux-glibc-amd64.tar.gz -C /
COPY ./.nginx/commento.nginx.conf /etc/nginx/conf.d/default.conf