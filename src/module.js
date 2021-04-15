async function start () {
 return await Promise.resolve('async4')
}

start().then(console.log)
