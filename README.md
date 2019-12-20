# NodeJS_IOT_Take_Home_Challenge
Demonstration of Asyncronous communication between two process using IPC in Node.js

Two process named 'Device_Client' and  'Driver_Server' is used for demonstration. 

# Process 1 (Driver_Server) :

Driver_Server process acts like a device driver which uses the "os.loadavg()" in "os module" to provide the maximum load average of the operating system in duration between 1, 5, 15 minutes. 

The OS load average values are put in as map values and  OS load duration are given as map keys. The map is sorted and finally the maximum values is retreived and added to "loadBuf" Buffer. The character "L"  indicating load is added to OS load average by adding hex ascii values to begining and end of load buffer. In the same way, character 'M' is added to "timeBuf" indicating the duration in minutes.

Finally both loadBuf and timeBuf is concat to a "dataBuf" and send it to Device_Client process.

# Process 1 (Device_Client) :

