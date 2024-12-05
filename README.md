# SQLite vs Redis

This project demonstrates the use of SQLite and Redis for managing and retrieving data. It includes implementations for both databases and provides a way to run load tests using k6.

## Setup

### Prerequisites

- Node.js (>= 22.10.0)
- Docker
- Docker Compose

### Installation

1. Clone the repository:

   ```sh
   git clone <repository-url>
   cd <repository-directory>
   ```

2. Install dependencies:

   ```sh
   yarn install
   ```

## Running the Applications

### Using Docker Compose

To start both the SQLite and Redis applications along with Redis itself, run:

```sh
docker-compose up
```

## Load Testing

You can run load tests using [k6](https://k6.io/).

The [load_test.sh](load_test.sh) script helps in running the tests for both SQLite and Redis applications.

**Usage**

```sh
bash load_test.sh <sqlite|redis>
```
