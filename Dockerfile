# Base Image for node js
FROM node:18-alpine  

#app directory
WORKDIR /app

#Install dependencies 
COPY package*.json ./
RUN npm install

#Copy all pages
COPY . .

# Docker port
EXPOSE 3001

#Run as non-root user for security
USER node

#Command to run your application
CMD ["npm", "start"]