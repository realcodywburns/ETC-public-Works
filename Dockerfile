FROM node:8

WORKDIR /root

RUN git clone git://github.com/burnscapital/ETC-public-Works.git  &&\
    cd ETC-public-Works &&\
    git checkout master &&\
    npm install --production

WORKDIR /root/ETC-public-Works

CMD ["node","index.js"]
