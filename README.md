# Moon &middot; [![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/gitsignore/moon/blob/master/LICENSE) [![GuardRails badge](https://badges.production.guardrails.io/gitsignore/moon.svg)](https://www.guardrails.io)

Moon is a beautiful web interface to define team statuses like online, busy, away or offline.Your team should be focus on their work only, let Moon manage your time availability.

![moon-preview](src/assets/preview/moon.gif)

In addition, you can set a focus time to keep your attention on specific tasks.

## Installation

To use `Moon` app you also need to install [moon-storage](https://github.com/gitsignore/moon-storage).

1. Docker installation

   - Install `Moon` by running:

   ```sh
   git clone https://github.com/gitsignore/moon && cd moon
   ```

   - Use `Moon`'s integrated console to launch the app:

   ```sh
   bin/console start
   ```

   - Open your browser to <http://localhost:3000>

2. Local Node/npm installation

   - Install `Moon` by running:

   ```sh
   git clone https://github.com/gitsignore/moon && cd moon
   ```

   - Then install dependencies:

   ```sh
   npm install
   ```

   - Launch `Moon` app with:

   ```sh
   npm start
   ```

   - Open your browser to <http://localhost:3000>

## License

Moon is MIT licensed.
