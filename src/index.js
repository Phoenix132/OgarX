const fs = require("fs");
const path = require("path");
const CORE_PATH  = path.resolve(__dirname, "..", "public", "static", "wasm", "server.wasm");
const OGARX_PATH = path.resolve(__dirname, "..", "public", "static", "wasm", "ogarx.wasm");

const Server = require("./network/ws-server");
const OgarXProtocol = require("./network/protocols/ogarx");

const server = new Server();
const engine = server.game.engine;

engine.setOptions({
    VIRUS_COUNT: 0,
    PLAYER_MIN_SPLIT_SIZE: 150,
    PLAYER_MAX_CELLS: 16,
    PLAYER_MERGE_NEW_VER: true,
    // PLAYER_AUTOSPLIT_SIZE: 0,
    PLAYER_AUTOSPLIT_DELAY: 5,
    DYNAMIC_DECAY: 0.25,
    PLAYER_SPLIT_CAP: 8,
    PLAYER_MERGE_TIME: 4,
    VIRUS_MONOTONE_POP: true,
    EJECT_SIZE: 40,
    EJECT_LOSS: 40.4,
    EJECT_DELAY: 10,
    BOTS: 10,
    PELLET_COUNT: 5000,
    PLAYER_SPAWN_SIZE: 1000,
    MAP_HW: 10000,
    MAP_HH: 10000
});

process.on("SIGINT", async () => {
    engine.stop();
    await server.close();
    process.exit(0);
});

(async () => {
    await engine.init(fs.readFileSync(CORE_PATH));
    await OgarXProtocol.init(fs.readFileSync(OGARX_PATH));
    await server.open();
    engine.start();

    setInterval(() => {
        console.log(`Load: ${~~(engine.usage * 100)} %, collisions: ${engine.collisions}`);
    }, 1000);
})();
