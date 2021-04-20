const fs = require('fs');
const WASI = require('wasi');

const wasi = new WASI({
  args: process.argv,
  env: process.env,
  preopens: {
    // '/sandbox': '/some/real/path/that/wasm/can/access'
  }
});
const importObject = { wasi_snapshot_preview1: wasi.wasiImport };



async function startWasm(){
  const wasm = await WebAssembly.compile(fs.readFileSync('./helloworld.wasm'));
  const instance = await WebAssembly.instantiate(wasm, importObject);

  wasi.start(instance);
}

startWasm()
