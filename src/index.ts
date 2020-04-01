import './LoadEnv'; // Must be the first import
import app from '@server'; //@ 루트경로
import logger from '@shared/Logger';
import socketConnect from './LiveRatesConnect';

// Start the server
const port = Number(process.env.PORT || 3000);
app.listen(port, () => {
    logger.info('Express server started on port: ' + port);
});
socketConnect();