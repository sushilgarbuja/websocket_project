import { env } from 'process';
import app from './src/app';
import { envConfig } from './src/config/config';
import connection from './src/config/db';


function startServer() {
    connection();
    const port = envConfig.port||4000
    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });
}

startServer();