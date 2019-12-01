FROM node:12

RUN apt-get update && apt-get install -y nano && apt-get clean

# Create app directory
WORKDIR /pokemon-meltdown

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN npm install

# Bundle app source
COPY . .

EXPOSE 8080
CMD [ "node", "pokemon-showdown", "8080" ]
