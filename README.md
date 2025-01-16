### Installation

1. **Clone the repository:**

   ```bash
   git clone
   cd
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Start the Docker(recommended)**:

   ```
   cd docker
   docker compose up -d
   ```

4. ** Set up environment variables:**:
   Create a `.env` file in the root directory and add the following environment variables, replacing the placeholders with your actual values:

   ```
   THROTTLE_TTL=60
   THROTTLE_LIMIT=5
   CORS_ORIGIN ="*"

   OPENAI_API_KEY = ""
   JWT_ACCESS_SECRET="JWT_ACCESS_SECRET"
   JWT_REFRESH_SECRET="JWT_REFRESH_SECRET"
   JWT_ACCESS_SECRET_TTL ="15m"
   JWT_REFRESH_SECRET_TTL ="7d"

   DATABASE_URL="postgresql://root:example@localhost:5432/autofunnel"
   ```

5. **Run database migrations:**

   ```bash
   npx prisma migrate dev
   ```

6. **Start the development server:**

   ```bash
   npm run start:dev
   ```
