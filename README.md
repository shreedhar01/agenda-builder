# Agenda Builder

This is the monorepo for the Agenda Builder application, containing both the frontend and backend services.

## Getting Started

Follow these instructions to get the project up and running on your local machine for development and testing purposes.

### Prerequisites

Make sure you have the following installed on your system:

-   [Node.js](https://nodejs.org/) (v18 or newer recommended)
-   [pnpm](https://pnpm.io/installation)
-   A running [MongoDB](https://www.mongodb.com/try/download/community) instance.
-   [Docker](https://www.docker.com/products/docker-desktop/) (if you wnat to run it in docker)

### Local Development Setup

1.  **Clone the repository:**
    ```
    git clone https://github.com/shreedhar01/agenda-builder.git
    cd agenda-builder
    ```

2.  **Install dependencies from the root directory:**
    ```
    pnpm install
    ```

3.  **Set up Environment Variables:**

    You will find `.env.sample` files in the `apps/backend` directorie. You need to create a `.env` file by copying the sample file and inserting your value.

4.  **Run the application on host machine:**

    To run both the frontend and backend servers for development, use the following command from the root of the project:
    ```
    pnpm dev
    ```

5. **Running with Docker:**

    First build it.
    ```
    docker compose build
    ```
    Then run it.
    ```
    docker compose up
    ```
    This will start:
    -   The frontend application on `http://localhost:3000`
    -   The backend server on `http://localhost:8000`