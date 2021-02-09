FROM ubuntu:latest
LABEL MAINTAINER="Shivam Malhotra"
LABEL VERSION="0.1.0"

RUN apt-get clean && apt-get update 

# Initialize Locale and TZ
RUN apt-get install -y locales
ENV DEBIAN_FRONTEND noninteractive 
ENV TZ=Asia/Kolkata
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone
ENV LANGUAGE=en_US.UTF-8
ENV LC_ALL=en_US.UTF-8
ENV LANG=en_US.UTF-8
ENV LC_CTYPE=en_US.UTF-8
RUN locale-gen en_US.UTF-8 

RUN apt-get install -y gnupg gosu curl ca-certificates zip unzip git zlibc

# Install NGINX
RUN apt-get install -y nginx 

# Install ORY Stack
RUN bash <(curl https://raw.githubusercontent.com/ory/kratos/v0.4.6-alpha.1/install.sh) -b . v0.5.0-alpha.1
RUN mv ./kratos /usr/local/bin/

RUN bash <(curl https://raw.githubusercontent.com/ory/oathkeeper/master/install.sh) -b . v0.38.6-beta.1
RUN  mv ./oathkeeper /usr/local/bin/

RUN bash <(curl https://raw.githubusercontent.com/ory/keto/master/install.sh) -b . v0.5.7-alpha.1
RUN mv ./keto /usr/local/bin

# Build the server
RUN mkdir /server
WORKDIR /server
COPY ./ ./
RUN go build main.go

# Install Supervisor
RUN apt-get install -y supervisor
RUN mkdir -p /var/log/supervisor
COPY ./devcontainer/supervisord.conf /etc/supervisor/conf.d/supervisord.conf

# Run SupervisorD
CMD ["/usr/bin/supervisord"]
