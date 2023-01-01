FROM node:10.7

# Install utilities
RUN apt-get update
# RUN apt-get install bash nginx nano curl --force-yes

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY . /usr/src/app/

# Rebuild node-sass
RUN npm install
RUN npm rebuild node-sass

EXPOSE 3000
CMD npm run dev
