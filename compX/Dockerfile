# inspired by https://medium.com/bb-tutorials-and-thoughts/dockerizing-angular-app-with-nodejs-backend-85e9d332335d

FROM node:alpine AS angular_ui
WORKDIR /app
COPY frontend/ ./companyX
RUN cd companyX && npm install @angular/cli && npm install && npm run build

FROM node:alpine
WORKDIR /root/
COPY --from=angular_ui /app/companyX/dist ./companyX/dist

COPY /Backend/package*.json ./
RUN npm install
COPY /Backend/. .
CMD node server.js
EXPOSE 3000