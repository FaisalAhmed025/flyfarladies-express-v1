import config from "./config/index";
import app from "./mainapp";


async function mainserver() {
  app.listen(3000, () => {
    console.log(`Application listening on port 3000`);
  });
}

mainserver();
