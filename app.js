const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
	res.send('<h1>this p.Art</h1><br>Ewoks in Endor, Pandas Boogie');
});

app.listen(port, () => console.log(`Server running on port ${port}`));
