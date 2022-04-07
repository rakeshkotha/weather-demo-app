From nginx:1.21.1-alpine
COPY nginx/nginx.conf /etc/nginx/nginx.conf
COPY /dist /html/Weather
EXPOSE 8080
CMD ["nginx", "-g", "daemon off;"]