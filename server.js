const app = require("./src/app");

const PORT = process.env.PORT || 9005;
app.listen(9005,'0.0.0.0', () => console.log(`Server running on port ${PORT}`));
