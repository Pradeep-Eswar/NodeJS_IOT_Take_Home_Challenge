const ipc=require('node-ipc');

const socketPath = '/tmp/ipc.sock';


/***************************************\
 *
 * You should start both Driver_Server and Device_Client
 * then you will see them communicating.
 *
 * *************************************/

ipc.config.id = 'Driver_Server';
ipc.config.encoding    = 'hex';
ipc.config.rawBuffer   = true;
ipc.config.sync        = false;
ipc.config.stopRetrying = true;
ipc.config.unlink = true;


ipc.serve(socketPath,()=> {

                            // Event Listener when server is connected to socket
                            ipc.server.on( 'connect',() => {
                                          ipc.log('1. Server Driver Online');
                            }
                          );



                            // Event listener  when client is connected
                            ipc.server.on('data',(data, socket) => {

                            // Checking  whether the client is connected
                            if(data.toString('ascii')=== 'C') {
                                  ipc.log('2. Client is Succesfully Connected to server');

                                function sender() {
									
                                      //Calculating the OS load Average for 1,5 and 15 minutes
                                      var os = require('os');
                                      let map = new Map();
                                      let loadArray =Array.from(os.loadavg());
									  
									  
                                      // Adding the minutes as key and os load as value in map
                                      let temp=0;
                                      loadArray.forEach(function (item, index) {
                                           temp = temp + Math.pow(3, index);
                                           let key = index+ temp;
                                            map.set(key,item);
                                       });

                                       // sort the load OS avg by  value
                                       const mapSort1 = new Map([...map.entries()].sort((a, b) => a[1] - b[1]));

                                       // Retreving the Maximum os load average in values and duration in keys
                                       let maxValue = mapSort1.values().next().value.toString();
                                       let maxKey = mapSort1.keys().next().value.toString();

                                       // Putting the  maximum OS load  average  data in  loadBuf
                                       const loadBufLen = maxValue.length+2;
                                       const loadBuf = Buffer.alloc(loadBufLen);

                                       loadBuf.writeUInt8(0x4C,0);
                                       loadBuf.writeUInt8(0x4C,loadBufLen-1);

                                       for (let i = 1; i < loadBufLen-1; i++) {
                                              loadBuf[i] = maxValue.charCodeAt(i-1);
                                       }

                                       // putting the maximum os load average duration in timeBuf
                                       const timeBufLen = maxKey.length+2;
                                       const timeBuf = Buffer.alloc(timeBufLen);

                                       timeBuf.writeUInt8(0x4D,0);
                                       timeBuf.writeUInt8(0x4D,timeBufLen-1);

                                       for (let i = 1; i < timeBufLen-1; i++) {
                                               timeBuf[i] = maxKey.charCodeAt(i-1);
                                       }

                                       // Concating both loadBuf and timeBuf in dataBuf
                                       const totalLength = loadBuf.length + timeBuf.length ;
                                       const dataBuf = Buffer.concat([loadBuf,timeBuf], totalLength);

                                       ipc.log('3. Sending the max os load avg to Device Client : ' + dataBuf);
                                       ipc.server.emit(socket,dataBuf);
									   
									   }

                                setInterval(sender, 5000);
                           }
                     }
                    );


                     // Event listener when socket got disconnected
                    ipc.server.on('socket.disconnected',
                      function(socket, destroyedSocketID) {
                           ipc.log('4. client ' + destroyedSocketID + ' has disconnected!');
                      }
                    );

       }
     );

ipc.server.start();



									   
