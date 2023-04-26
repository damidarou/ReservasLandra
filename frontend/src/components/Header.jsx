import React from "react";
import "./styles/Header.css";
import mrlLogo from "../assets/mrlLogo.svg";
import logOut from "../assets/logOut.svg";
import userlogo from "../assets/userLogo.svg";


function Header() {
    return (
        <header>
                <div class="marco">
                    <a href="home.php" id="enlaceInstituto"><img src={mrlLogo} className="logo mel" alt="Mrl logo" /></a>
                    <p id="usuario">
                        <a class='usuario'>Damián</a>
                        <img id='logoUsuario' src={userlogo}/>
                            <a id='cerrarSesion' href='cerrarsesion.php'>
                                <img id='cerrarSesion' src={logOut}/>

                            </a>
                    </p>
                </div>
                <div class="menu">
                    <div class="marco2"></div>
                    <div id="gestion_reservas" class="enlace"><a href="XestionReservas.php">XESTI&Oacute;N DE RESERVAS</a></div>
                    <div id="gestion_aulas" class="enlace"><a href="XestionAulas.php">XESTI&Oacute;N DE AULAS</a></div>
                </div>
        </header>
    );
}
export default Header;
