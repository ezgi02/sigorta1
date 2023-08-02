import React, { useState } from 'react';
import {Link,NavLink} from 'react-router-dom'
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from 'reactstrap';
import PropTypes from 'prop-types';

function TopBar({ direction, ...args }) {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggle = () => setDropdownOpen((prevState) => !prevState);

  return (
    <div>
        <div className='shadow mb-2'>
                <nav className='navbar navbar-light bg-light container'>
                    <Link className='navbar-brand' to='/'>
                        <img src='https://w7.pngwing.com/pngs/786/126/png-transparent-logo-contracting-photography-logo-symbol.png' width={62} alt='logo'/>
                         Sigorta Ajendasi
                    </Link>
                    <ul className='nav justify-content-end'>
                        <li>
                            <Link className='nav-link' to="/hakkimizda">
                                Hakkımızda
                            </Link>
                            
                        </li>
                        <li>
                            <Link className='nav-link' to="/signup">
                                Giriş yap
                            </Link>
                        </li>    
                        <li>
                            <Link className='nav-link' to="/">
                                İletişim
                            </Link>
                        </li>
                        <li>
                            <div >
                                <Dropdown isOpen={dropdownOpen} toggle={toggle} direction={direction}>
                                    <DropdownToggle caret>Ürünlerimiz</DropdownToggle>
                                    <DropdownMenu {...args}>
                                    {/* <DropdownItem header>Header</DropdownItem> */}
                                    <DropdownItem><Link  className='link-dark link-underline-light'  to="/">İletişim</Link></DropdownItem>
                                    <DropdownItem><Link  className='link-dark link-underline-light'  to="/">İletişim</Link></DropdownItem>
                                    <DropdownItem><Link  className='link-dark link-underline-light'  to="/">İletişim</Link></DropdownItem>
                                    <DropdownItem><Link  className='link-dark link-underline-light'  to="/">İletişim</Link></DropdownItem>
                                    </DropdownMenu>
                                </Dropdown>
                            </div>
                        </li>
                    </ul>
                </nav>
        </div>
    
    </div>
  );
}

TopBar.propTypes = {
  direction: PropTypes.string,
};

export default TopBar;