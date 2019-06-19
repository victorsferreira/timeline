export class TaskManager {
    private timer: NodeJS.Timer;
    private task: () => Promise<any>;
    private interval: number;
    private name: string;

    constructor(name?: string) {
        this.name = name;
    }

    setInterval(interval): TaskManager {
        this.interval = interval;
        return this;
    }

    start(task) {
        this.task = task;

        this.log("has started");
        this.run();
    }

    stop() {
        clearTimeout(this.timer);
        this.timer = null;
    }

    private log(text: string): void {
        const messages = [`Task Manager ${text}`];
        if (this.name) {
            messages.push(`[${this.name}]`);
        }

        console.log(messages.join(": "));
    }

    private async run() {
        this.log("is running");
        await this.task();
        this.timer = setTimeout(() => this.run(), this.interval);
    }
}