const os = require('node:os')
console.log('nombre del sistema operativo', os.platform())
console.log('version del sistema operativo', os.release())
console.log('arquitectura del sistema operativo', os.arch())
// console.log('CPUs',os.cpus());
console.log('Memoria libre', os.freemem() / 1024 / 1024)
console.log('Memoria total', os.totalmem() / 1024 / 1024)
console.log('Uptime', os.uptime() / 60 / 60)
