window.LAB_CONFIG = {
    // Placement Reticle Configuration
    reticle: {
        radiusInner: 0.2,
        radiusOuter: 0.25,
        color: "#3498db"
    },

    // Beaker (Acid, Base, Product) Configuration
    beaker: {
        scale: { x: 1, y: 1, z: 1 },
        hitBoxRadius: 0.2,
        hitBoxHeight: 0.1,
        labelY: 0.05,
        labelWidth: 1
    },

    // Interaction Logic Configuration
    interaction: {
        mixingDistance: 0.02 // Threshold to trigger chemical reaction
    }
};
