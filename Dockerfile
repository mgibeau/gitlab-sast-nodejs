FROM node:alpine

WORKDIR /usr/app

VOLUME /src/code
VOLUME /output

COPY package.json .
COPY package-lock.json .

RUN npm install

COPY .eslintrc.yml .
COPY lib lib
COPY scan.js .

ENTRYPOINT ["node", "/usr/app/scan.js", "--out", "/output/gl-sast-report.json"]
CMD ["/src/code"]
