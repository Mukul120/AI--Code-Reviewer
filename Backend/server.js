require("dotenv").config();
const App = require("./src/app")
const Port = 4000

App.listen(Port, () => {
    console.log(`App is running on http://localhost:${Port}`);
})