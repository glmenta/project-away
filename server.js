const express = require('express');


const app = express();
const port = process.env.port || 3000;


app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
