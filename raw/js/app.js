constructor() {
    this.beakers = [];
    this.placedBeakers = 0;
    this.isMixing = false;
    this.setupDebugLogger();
    this.init();
}

setupDebugLogger() {
    const overlay = document.getElementById('debug-overlay');
    const originalLog = console.log;
    const logs = [];

    console.log = (...args) => {
        originalLog.apply(console, args);
        const msg = args.map(a => typeof a === 'object' ? JSON.stringify(a) : a).join(' ');
        logs.push(msg);
        if (logs.length > 5) logs.shift();
        if (overlay) overlay.textContent = logs.join('\n');
    };

    console.log("AR Lab Ready");
}

init() {
    document.querySelector('a-scene').addEventListener('loaded', () => {
        this.setupWebXR();
    });
}

setupWebXR() {
    const scene = document.querySelector('a-scene');

    if (!navigator.xr) {
        alert("WebXR not supported. Try Chrome on Android.");
        return;
    }

    scene.addEventListener('enter-vr', () => {
        if (scene.is('ar-mode')) {
            document.getElementById('loading').style.display = 'none';
            this.showInstruction("Find a flat surface, then tap to place beakers");
            console.log("Entered AR Mode");
        }
    });

    scene.addEventListener('exit-vr', () => {
        console.log("Exiting AR Mode");
        document.getElementById('loading').style.display = 'flex';
    });

    document.getElementById('start-ar').addEventListener('click', () => {
        scene.enterAR();
    });
}

showInstruction(text) {
    const instruction = document.querySelector('#instruction');
    if (instruction) instruction.setAttribute('value', text);
}
}

document.addEventListener('DOMContentLoaded', () => {
    new ARChemistryLab();
});