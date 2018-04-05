const fetch = require("node-fetch");

async function run() {
  for (let i = 0; i < 100; i += 1) {
    fetch('http://localhost:3000')
      .then(res => res.text())
      .then(body => console.log(body));

    // Little wait
    await new Promise((resolve) => setTimeout(resolve, 100));
  }
}

run();