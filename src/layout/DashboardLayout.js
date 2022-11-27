import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import Header from '../Pages/Shared/Header/Header';
// import { AuthContext } from '../contexts/AuthProvider/AuthProvider';
// import useAdmin from '../hooks/useAdmin';

const DashboardLayout = () => {
    // const { user } = useContext(AuthContext)
    // const [isAdmin] = useAdmin(user?.email)

    return (
        <div>
            <Header></Header>
            <div className="drawer drawer-mobile drawer-end">
                <input id="dashboard-drawer" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content bg-slate-50">
                    <Outlet></Outlet>
                </div>
                <div className="drawer-side">
                    <label htmlFor="dashboard-drawer" className="drawer-overlay"></label>
                    
                    <ul className="menu p-4 w-80 text-base-content bg-base-100">
                        <li><Link to='/dashboard/myorders'>My Orders</Link></li>
                        <li><Link to='/dashboard/addproduct'>Add A product</Link></li>
                        <li><Link to='/dashboard/myproducts'>My Products</Link></li>
                        {/* {
                            isAdmin && <> */}
                                <li><Link to='/dashboard/allsellers'>All Sellers</Link></li>
                                <li><Link to='/dashboard/allbuyers'>All Buyers</Link></li>
                            {/* </>
                        } */}
                    </ul>

                </div>
            </div>
        </div>
    );
};

export default DashboardLayout;