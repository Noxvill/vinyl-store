require('dotenv').config();
const app = require('./src/app');

const { PORT } = process.env;

app.listen(PORT || 5000, () => {
    console.log(`Server running on http://localhost:${PORT} || 5000`);
});
