FROM node:0.10.38
MAINTAINER Julien Renaux <contact@julienrenaux.fr>
RUN mkdir /wphc

ENV HOST 0.0.0.0
EXPOSE 8080

WORKDIR /wphc
ADD . /wphc

RUN \
    npm install -g bower@1.4.1  # && \
