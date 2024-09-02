const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const os = require('os');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/mydatabase', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const usersRouter = require('./routes/users');

app.use('/users', usersRouter);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

function getLocalIP() {
  const interfaces = os.networkInterfaces();
  for (const interfaceName in interfaces) {
    const iface = interfaces[interfaceName];
    for (const alias of iface) {
      if (alias.family === 'IPv4' && !alias.internal) {
        return alias.address;
      }
    }
  }
  return 'localhost'; 
}

app.listen(PORT, () => {
  const ip = getLocalIP();
  console.log(`Server is running on http://${ip}:${PORT}`);
});
