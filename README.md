# NodeJS_IOT_Take_Home_Challenge

Demonstration of Asyncronous communication between two process using IPC in Node.js

Two process named 'Device_Client' and  'Driver_Server' is used for demonstration. 



# Process 1 (Driver_Server) :

Driver_Server process acts like a device driver which uses the "os.loadavg()" in "os module" to provide the maximum load average of the operating system in duration between 1, 5, 15 minutes. 

The OS load average values are put in as map values and  OS load duration are given as map keys. The map is sorted and finally the maximum values is retreived and added to "loadBuf" Buffer. The character "L"  indicating load is added to OS load average by adding hex ascii values to begining and end of load buffer. In the same way, character "M" is added to "timeBuf" indicating the duration in minutes.

Finally both loadBuf and timeBuf is concat to a "dataBuf" and send it to Device_Client process every 5 seconds.

# Process 2 (Device_Client) :

Device_Client process acts like a device which receives the OS load average data from Driver_Server parses the buffer values and retrives the os load average values and load duration seperately and display it to the user.

# IPC Config for communication :

The communication between two process happens using node-ipc which provides interprocess communication. The configuration for IPC is as follows :

ipc.config.encoding    = 'hex'; ('hex' encoding for data sent on sockets)

ipc.config.rawBuffer   = true;  ( Needs to be set to true for sending raw buffer data)

ipc.config.sync        = false; ( Setting syncrhonous request to false)

ipc.config.stopRetrying = true; ( Setting true will immediately stop trying )

ipc.config.unlink = true;       ( Setting true so module will take care of deleting the IPC socket) 

