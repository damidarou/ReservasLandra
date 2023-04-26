import { useEffect, useState } from "react";
import "./App.css";
import Header from "./components/Header";

const { Neutralino } = window;

function App() {
    useEffect(() => {
        Neutralino.events.on("extensionReady", async ({ detail: ext }) => {
            console.log(ext);
        });
    }, []);

    
    return (
        <div>
          <Header />
          <main>
            <h2>Bienvenido a mi sitio web</h2>
            <p>Este es el contenido principal de la página</p>
          </main>
        </div>
      );
    }

export default App;
