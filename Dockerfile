FROM node:20.5.0

#Set the working directory inside the container
WORKDIR /

#Copy package.json and package-lock.json to the container
COPY . /

#Install dependencies
RUN npm install

#Build the Node.js application
RUN npm run build

#Expose any necessary ports
EXPOSE 5000

#Start the application with pm2
CMD node  --max-old-space-size=8192 dist/server.js