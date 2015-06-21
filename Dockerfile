FROM node:0.10.38

RUN groupadd -r wphcuser && useradd -r -g wphcuser wphcuser

USER wphcuser

MAINTAINER Julien Renaux <contact@julienrenaux.fr>
RUN mkdir /wphc

ENV HOST 0.0.0.0
EXPOSE 8080

WORKDIR /wphc
ADD . /wphc

RUN \
    npm install -g bower@1.4.1  # && \
