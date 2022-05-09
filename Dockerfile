# syntax = docker/dockerfile:1
FROM registry.dev.kununu.it/core/publish/ubuntu:18.04 AS base-image
FROM base-image AS builder-output

ARG nodejs_major_version=10 \
    nodejs_minor_version=24.1 \
    code_dir=/code \
    BUILDARCH
ENV PATH=$PATH:${code_dir}/node_modules/.bin



RUN apt update && apt install --no-install-recommends -y \
      # npm needs ca-certificates
      wget ca-certificates && \
    wget -O nodejs.deb https://deb.nodesource.com/node_${nodejs_major_version}.x/pool/main/n/nodejs/nodejs_${nodejs_major_version}.${nodejs_minor_version}-deb-1nodesource1_${BUILDARCH}.deb && \
    #wget -O nodejs.deb -q https://deb.nodesource.com/node_${nodejs_major_version}.x/pool/main/n/nodejs/nodejs_${nodejs_major_version}.${nodejs_minor_version}-deb-1nodesource1_${BUILDARCH}.deb && \
    apt install -y ./nodejs.deb && \
    rm nodejs.deb && \
    mkdir -p /output/usr/local/bin && \
    rm -rf /var/lib/apt/lists/*

WORKDIR $code_dir

# For some reason:
#  COPY . $code_dir
# Results in the layer _always_ being invalidated
COPY . /code

RUN npm install && \
    pkg . --output=/output/usr/local/bin/phraseapp-cli -t host

##
## Our completed image
##
FROM base-image

# Our non-volatile labels
LABEL org.opencontainers.image.documentation="https://github.com/kununu/phraseapp-cli" \
      org.opencontainers.image.source="ssh://git@github.com:kununu/phraseapp-cli" \
      org.opencontainers.image.version="2.4.4" \
      org.opencontainers.image.description="An ancient tool to contact phraseapp." \
      docker.cmd="docker run -it registry.dev.kununu.it/core/publish/phraseapp-cli:latest --version" \
      docker.cmd.devel="TODO"

ENTRYPOINT [ "/usr/local/bin/phraseapp-cli" ]

COPY --from=builder-output /output /

# Our mutable labels
ARG source_commit="dirty"
LABEL "org.opencontainers.image.revision"="${source_commit}"
