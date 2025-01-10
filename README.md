# KoinX Backend Internship Assignment

This project is a backend server-side application built using **Node.js** and **MongoDB**. It fetches cryptocurrency data from the **CoinGecko API** and provides APIs to get statistics about cryptocurrencies like Bitcoin, Ethereum, and Matic. It also calculates the standard deviation of the price of a selected cryptocurrency based on the data stored in the database.

## Features

- Background job that fetches the latest data (price, market cap, and 24-hour change) for **Bitcoin**, **Matic**, and **Ethereum** every 2 hours.
- API `/stats` to get the latest data for a specific cryptocurrency.
- API `/deviation` to calculate the standard deviation of the price of a selected cryptocurrency based on the last 100 records.

## Technologies Used

- **Node.js**: Backend runtime.
- **Express.js**: Web framework for Node.js.
- **MongoDB**: NoSQL database to store cryptocurrency data.
- **CoinGecko API**: Fetch real-time cryptocurrency data.
- **node-cron**: For scheduling the background job to fetch data every 2 hours.

## Installation

To get started with this project, follow these steps:

1. **Clone the repository**:

   ```bash
   git clone <repository_url>
   cd <project_directory>
   ```

2. **Install dependencies**: Ensure you have `Node.js` installed and then run:

   ```bash
   npm install
   ```

3. **Set up environment variables**: Create a `.env` file in the root of the project and add the following:

   ```plaintext
   MONGO_URI=your_mongo_connection_string
   PORT=5000
   ```

   Replace `your_mongo_connection_string` with the actual MongoDB connection string from **MongoDB Atlas** or any other MongoDB service you're using.

4. **Run the application**: Start the server:
   ```bash
   node app.js
   ```
   The server will now be running on `http://localhost:5000`.

## API Endpoints

### 1. **GET /api/stats**

Fetch the latest data for a specific cryptocurrency.

#### Query Params:

```plaintext
coin=bitcoin  // or matic-network or ethereum
```
