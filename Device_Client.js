const ipc=require('node-ipc');

const socketPath = '/tmp/ipc.sock';

/***************************************\
 *
 * You should start both Driver_Server  and  Device_Client
 * then you will see them communicating.
 *
 * *************************************/

ipc.config.id = 'Device_Client';
ipc.config.encoding    = 'hex';
ipc.config.rawBuffer   = true;
ipc.config.sync        = false;
ipc.config.stopRetrying = true;
ipc.config.unlink  = true;

ipc.connectTo('Driver_Server',socketPath,() => {

                           // Event listener when client is connected with socket
                           ipc.of.Driver_Server.on('connect',()=> {
                                                                   ipc.log('1. Client Device Online' );
                                                                   ipc.of.Driver_Server.emit([0x43]);
                            }
                           );

                           // Event listener when server sends a data
                           ipc.of.Driver_Server.on('data',(data) => {

                                                                    // Extracting the max os load avg from received buffer data
                                                                    const loadBuf = data.subarray(data.indexOf(76)+1, data.lastIndexOf(76));
                                                                    ipc.log('Received Max OS load avg :' + loadBuf);

                                                                    // Extracting the duration of max os load avg from received buffer data
                                                                    const timeBuf = data.subarray(data.indexOf(77)+1, data.lastIndexOf(77));
                                                                    ipc.log('2. Max OS Load Avg Received is ' + loadBuf.toString('ascii') + ' with duration ' + timeBuf.toString('ascii') , ipc.config.delay );

                           }
                          );

                          // Event listener when server is disconnected
                          ipc.of.Driver_Server.on( 'disconnect', ()=> {
                                                                       ipc.log('3. disconnected from server',  ipc.config.delay);
                                                                       ipc.disconnect('Device_Client');
                           }
                          );


             }
            );



