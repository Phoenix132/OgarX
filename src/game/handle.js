module.exports = class Handle {
    /** @param {import(".")} game */
    constructor(game) {
        this.game = game;
        /** @type {import("./controller")} */
        this.controller = null; 
        
        this.onTick = this.onTick.bind(this);
        this.onJoin = this.onJoin.bind(this);
        this.onChat = this.onChat.bind(this);
        this.onLeave = this.onLeave.bind(this);
        this.onSpawn = this.onSpawn.bind(this);
        this.onError = this.onError.bind(this);
        this.onLeaderboard = this.onLeaderboard.bind(this);

        this.game
            .on("tick", this.onTick)
            .on("join", this.onJoin)
            .on("chat", this.onChat)
            .on("leave", this.onLeave)
            .on("spawn", this.onSpawn)
            .on("error", this.onError)
            .on("leaderboard", this.onLeaderboard);
    };
    
    join() { this.game.addHandler(this); }
    remove() { this.game.removeHandler(this); }

    off() {
        this.remove();
        this.game
            .off("tick", this.onTick)
            .off("join", this.onJoin)
            .off("chat", this.onChat)
            .off("leave", this.onLeave)
            .off("spawn", this.onSpawn)
            .off("error", this.onError)
            .off("leaderboard", this.onLeaderboard);
    }

    // Virtual methods
    onTick() {};
    onJoin(controller) {};
    onChat(sender, message) {};
    onLeave(controller) {};
    onSpawn(controller) {};
    onError(err) {};
    onLeaderboard(controllers) {};
}