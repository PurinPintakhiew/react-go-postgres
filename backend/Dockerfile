FROM golang:alpine
RUN mkdir /app
ADD . /app
WORKDIR /app
RUN go mod download
RUN go get -v github.com/cosmtrek/air
CMD [ "air"]