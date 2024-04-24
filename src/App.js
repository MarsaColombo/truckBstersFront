import "./App.css";
import EtBrowser from './icons/browser.js';
import Scheduler from './components/sheduler.js';

function App() {
  return (
    <body class="AppBody">
      {/* <div class="AppHeaderContainer">
        <header class="AppHeader">
          <p class="HeaderLogo">
            <EtBrowser />
          </p>
        </header>
      </div> */}

      {/* <div class="container mx-auto mt-8">
        <form
          action="#"
          method="POST"
          class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
        >
          <div class="mb-4">
            <label
              for="name"
              class="block text-gray-700 text-sm font-bold mb-2"
            >
              Nom:
            </label>
            <input
              type="text"
              id="name"
              name="name"
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div class="mb-4">
            <label
              for="email"
              class="block text-gray-700 text-sm font-bold mb-2"
            >
              Email:
            </label>
            <input
              type="email"
              id="email"
              name="email"
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div class="mb-4">
            <label
              for="date"
              class="block text-gray-700 text-sm font-bold mb-2"
            >
              Date du rendez-vous:
            </label>
            <input
              type="date"
              id="date"
              name="date"
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div class="mb-6">
            <label
              for="message"
              class="block text-gray-700 text-sm font-bold mb-2"
            >
              Message:
            </label>
            <textarea
              id="message"
              name="message"
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            ></textarea>
          </div>
          <div class="flex items-center justify-between">
            <button
              type="submit"
              class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Envoyer
            </button>
          </div>
        </form>
      </div> */}

      <div class="CalendarContainer">
        <Scheduler />
      </div>
    </body>
  );
}

export default App;
