FROM golang:latest
LABEL MAINTAINER="Shivam Malhotra"
LABEL VERSION="0.1.0"

# Build the server
RUN mkdir /server
WORKDIR /server
COPY ./ ./
RUN make install

FROM tutum/curl:latest
SHELL ["/bin/bash", "-c"]
WORKDIR /home/download/
RUN bash <(curl https://raw.githubusercontent.com/ory/kratos/v0.5.0-alpha.1/install.sh) -b . v0.5.0-alpha.1

RUN bash <(curl https://raw.githubusercontent.com/ory/oathkeeper/master/install.sh) -b . v0.38.6-beta.1

RUN bash <(curl https://raw.githubusercontent.com/ory/keto/master/install.sh) -b . v0.5.7-alpha.1

FROM ubuntu:latest
RUN mkdir -p /var/www/bin/
COPY --from=0 /server/bin/main /var/www/bin/fiber
COPY --from=1 /home/download/kratos /var/www/bin/kratos 
COPY --from=1 /home/download/keto /var/wwwbin/keto 
COPY --from=1 /home/download/oathkeeper /var/www/bin/oathkeeper 
# Install Supervisor
RUN apt update && apt install -y supervisor nginx
RUN mkdir -p /var/www/log/supervisor
COPY ./supervisord.conf /etc/supervisor/conf.d/supervisord.conf
COPY .commento/ /var/www/bin/commento
RUN chmod +x /var/www/bin/commento/commento
ENV DEBIAN_FRONTEND noninteractive 
ENV TZ=Asia/Kolkata
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone
ENV LANGUAGE=en_US.UTF-8
ENV LC_ALL=en_US.UTF-8
ENV LANG=en_US.UTF-8
ENV LC_CTYPE=en_US.UTF-8

# COPY CONFIG FILES
COPY ./.kratos/.kratos.prod.yml /etc/config/kratos/.kratos.yml
COPY ./.oathkeeper/oathkeeper.yml /etc/config/oathkeeper/oathkeeper.yml
COPY ./.oathkeeper/access-rules.prod.yml /etc/config/oathkeeper/access-rules.yaml
COPY ./.nginx/nginx.prod.conf /etc/nginx/conf.d/default.conf 
RUN mkdir -p /var/www/log/kratos /var/www/log/oathkeeper /var/www/log/fiber
# Run SupervisorD
CMD ["/usr/bin/supervisord","-c", "/etc/supervisor/conf.d/supervisord.conf"]
