import React, { Component } from 'react';
import {Link} from 'react-router-dom'
class TopBar extends Component {
    render() {
        return (
            <div className='shadow mb-2'>
                <nav className='navbar navbar-light bg-light container'>
                    <Link className='navbar-brand' to='/'>
                        <img src='https://w7.pngwing.com/pngs/786/126/png-transparent-logo-contracting-photography-logo-symbol.png' width={62} alt='logo'/>
                         Sigorta Ajendasi
                    </Link>
                    <ul className='nav justify-content-end'>
                        <li>
                            <Link className='nav-link' to="/">
                                Hakkımızda
                            </Link>
                        </li>    
                         <li>
                            <Link className='nav-link' to="/signup">
                                Giriş yap
                            </Link>
                        </li>    
                        
                    </ul>
                </nav>
            </div>
        );
    }
}

export default TopBar;