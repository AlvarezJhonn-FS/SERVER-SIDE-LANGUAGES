require('dotenv').config();
const connectDB = require('./app/config/db');
const app = require('./app');

connectDB();

const PORT = process.env.PORT || 3000;
console.log(`Server is running on port ${PORT}`);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
}
);