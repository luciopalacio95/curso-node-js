import { platform, release, arch, freemem, totalmem, uptime } from 'node:os'
console.log('nombre del sistema operativo', platform())
console.log('version del sistema operativo', release())
console.log('arquitectura del sistema operativo', arch())
// console.log('CPUs',os.cpus());
console.log('Memoria libre', freemem() / 1024 / 1024)
console.log('Memoria total', totalmem() / 1024 / 1024)
console.log('Uptime', uptime() / 60 / 60)
