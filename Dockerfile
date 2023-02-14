FROM node:18.14.0

EXPOSE 8080

ENV NODE_ENV production

ARG APP_DIR=/usr/src/app/

RUN mkdir -p $APP_DIR
WORKDIR $APP_DIR

ARG GH_AUTHOR_LOGIN
ENV GH_AUTHOR_LOGIN ${GH_AUTHOR_LOGIN}

ARG GH_AUTHOR_LINKED_IN
ENV GH_AUTHOR_LINKED_IN ${GH_AUTHOR_LINKED_IN}

ARG GH_AUTHOR_TELEGRAM
ENV GH_AUTHOR_TELEGRAM ${GH_AUTHOR_TELEGRAM}

ARG GH_AUTHOR_MEDIUM
ENV GH_AUTHOR_MEDIUM ${GH_AUTHOR_MEDIUM}

ARG GH_AUTHOR_HABR
ENV GH_AUTHOR_HABR ${GH_AUTHOR_HABR}

ARG GH_AUTHOR_NPM
ENV GH_AUTHOR_NPM ${GH_AUTHOR_NPM}

ARG GH_AUTHOR_TWITTER
ENV GH_AUTHOR_TWITTER ${GH_AUTHOR_TWITTER}

ARG GH_AUTHOR_DEVTO
ENV GH_AUTHOR_DEVTO ${GH_AUTHOR_DEVTO}

ARG SELF_URL
ENV SELF_URL ${SELF_URL}

COPY package.json package-lock.json $APP_DIR
RUN npm ci --include=dev --also=dev && npm cache clean --force

COPY . $APP_DIR

ARG COMMIT_HASH=local
ENV COMMIT_HASH ${COMMIT_HASH}

ARG APP_VERSION=0.0.0
ENV APP_VERSION ${APP_VERSION}

RUN echo ${APP_VERSION} ${COMMIT_HASH}

RUN npm run meta

RUN npm run build

RUN find $APP_DIR/src -type f | xargs -L1 rm -f

USER node

CMD ["npm", "start"]
