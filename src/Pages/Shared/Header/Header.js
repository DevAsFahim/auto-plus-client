import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../../contexts/AuthProvider/AuthProvider';
import './Header.css'

const Header = () => {
    const { user, logOut } = useContext(AuthContext)

    const handleLogOut = () => {
        logOut()
        .then(() => {})
        .catch(err => console.error(err))
    }

    const menuItems = <React.Fragment>
        <li><Link to='/'>Home</Link></li>
        <li><Link to='/blogs'>Blogs</Link></li>

        {
            user?.uid ?
                <>
                    <li><Link to='/dashboard'>Dashboard</Link></li>
                    <li><button onClick={handleLogOut} className='btn btn-secondary ml-5 text-white'>Sign Out</button></li>
                </> 
                :
                <li><Link to='/login'  className='btn btn-secondary ml-5 text-white'>Login</Link></li>
        }

    </React.Fragment>

    return (
        <div className="navbar justify-between">
            <div className="navbar-start ">
                <div className="dropdown ">
                    <label tabIndex={0} className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </label>
                    <ul tabIndex={1} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-primary rounded-box w-52">
                        {menuItems}
                    </ul>
                </div>
                <Link to='/' className="btn btn-ghost normal-case text-xl">Auto Plus</Link>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal p-0">
                    {menuItems}
                </ul>
            </div>
            <label htmlFor="dashboard-drawer" tabIndex={2} className="btn btn-ghost lg:hidden">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
            </label>
        </div>
    );
};

export default Header;