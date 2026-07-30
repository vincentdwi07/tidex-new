# ---- Build stage ----
FROM golang:1.23-alpine AS builder

WORKDIR /app

# Copy dependency files first for layer caching
COPY go.mod go.sum ./
RUN go mod download

# Copy source code
COPY . .

# Build static binary
RUN CGO_ENABLED=0 GOOS=linux go build -ldflags="-s -w" -o server ./cmd/main.go

# ---- Runtime stage ----
FROM alpine:3.20

# ca-certificates needed for HTTPS outbound calls
RUN apk --no-cache add ca-certificates tzdata

WORKDIR /app

# Copy compiled binary
COPY --from=builder /app/server .

# uploads directory — will be mounted as a volume in production
RUN mkdir -p /app/uploads

EXPOSE 8000

CMD ["./server"]
