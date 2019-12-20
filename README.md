# NodeJS_IOT_Take_Home_Challenge
Demonstration of Asyncronous communication between two process using IPC in Node.js

Two process named 'Device_Client' and  'Driver_Server' is used for demonstration. 

# Process 1 (Driver_Server) :

Driver_Server process acts like a device driver which uses the "os.loadavg()" in "os module" to provide the maximum load average of the operating system in duration between 1, 5, 15 minutes. 

The OS load average values are put in as map values and  OS load duration are given as map keys. The map is sorted and finally the maximum values is retreived and added to "loadBuf" Buffer. The corres 
