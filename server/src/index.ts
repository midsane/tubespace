import { app } from "./app";
import { PORT } from "./config";

const port = PORT
app.listen(port, () => {
    console.log(`server is running on port ${port} ⛩️`)
});