import app from "#app.js";
import config from "#config.js";

app.listen(config.PORT, () => {
    console.log(`Madnessify listening on port ${String(config.PORT)}`);
});
