// src/components/common/Navbar.js
// src/components/common/Navbar.js
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth, db } from '../../firebase';
import { doc, getDoc } from 'firebase/firestore';
import '../../styles/globalMenus.css';
import logo from '../../assets/logo.png';

const Navbar = () => {
  const [userRole, setUserRole] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserRole = async () => {
      const user = auth.currentUser;
      if (user) {
        const userDoc = await getDoc(doc(db, 'users', user.uid));
        if (userDoc.exists()) {
          const userData = userDoc.data();
          setUserRole(userData.role);
        }
      }
    };

    fetchUserRole();
  }, []);

  const handleLogout = async () => {
    try {
      await auth.signOut();
      navigate('/', { state: { isLogin: true } });
    } catch (error) {
      console.error('Logout failed', error);
    }
  };

  return (
    <header className="navbar">
      <div className="navbar-logo">
        <Link to="/authenticated-landing">
          <img src={logo} alt="iamBudget Logo" />
        </Link>
      </div>
      <nav>
        <ul className="nav-list">
          <li className="nav-item dropdown">
            <span className="dropdown-toggle">Dashboard</span>
            <ul className="dropdown-menu">
              <li className="nav-item">
                <Link to="/dashboard/summary">Summary</Link>
              </li>
              <li className="nav-item">
                <Link to="/dashboard/reports">Reports</Link>
              </li>
            </ul>
          </li>
          <li className="nav-item dropdown">
            <span className="dropdown-toggle">Transactions</span>
            <ul className="dropdown-menu">
              <li className="nav-item">
                <Link to="/transactions/new">New Transaction</Link>
              </li>
              <li className="nav-item">
                <Link to="/transactions/pending">Pending Payments</Link>
              </li>
              <li className="nav-item">
                <Link to="/transactions/list">Transaction List</Link>
              </li>
            </ul>
          </li>
          <li className="nav-item dropdown">
            <span className="dropdown-toggle">Accounts</span>
            <ul className="dropdown-menu">
              <li className="nav-item">
                <Link to="/accounts/new">New Account</Link>
              </li>
              <li className="nav-item">
                <Link to="/accounts/cash">Cash Accounts</Link>
              </li>
              <li className="nav-item">
                <Link to="/accounts/credit-cards">Credit Cards</Link>
              </li>
              <li className="nav-item">
                <Link to="/accounts/loans">Loans</Link>
              </li>
              <li className="nav-item">
                <Link to="/accounts/valuable-assets">Valuable Assets</Link>
              </li>
            </ul>
          </li>
          <li className="nav-item dropdown">
            <span className="dropdown-toggle">Budgets</span>
            <ul className="dropdown-menu">
              <li className="nav-item">
                <Link to="/budgets/create">Create Budget</Link>
              </li>
              <li className="nav-item">
                <Link to="/budgets/version">Create Budget Version</Link>
              </li>
              <li className="nav-item">
                <Link to="/budgets/scenarios">Scenarios</Link>
              </li>
            </ul>
          </li>
          <li className="nav-item dropdown">
            <span className="dropdown-toggle">Settings</span>
            <ul className="dropdown-menu">
              <li className="nav-item">
                <Link to="/settings/profile">Profile</Link>
              </li>
              <li className="nav-item">
                <Link to="/settings/notifications">Notifications</Link>
              </li>
            </ul>
          </li>
          {userRole === 'admin' && (
            <li className="nav-item dropdown">
              <span className="dropdown-toggle">Admin</span>
              <ul className="dropdown-menu">
                <li className="nav-item">
                  <Link to="/admin/users">Users</Link>
                </li>
                <li className="nav-item">
                  <Link to="/admin/account-types">Account Types</Link>
                </li>
                <li className="nav-item">
                  <Link to="/admin/transaction-types">Transaction Types</Link>
                </li>
                <li className="nav-item">
                  <Link to="/admin/currency-types">Currency Types</Link>
                </li>
                <li className="nav-item">
                  <Link to="/admin/valuable-asset-types">Valuable Asset Types</Link>
                </li>
                <li className="nav-item dropdown">
                  <span className="dropdown-toggle">Reference Elements</span>
                  <ul className="dropdown-menu">
                    <li className="nav-item">
                      <Link to="/admin/reference-elements/accordions">Accordions</Link>
                    </li>
                    <li className="nav-item">
                      <Link to="/admin/reference-elements/buttons">Buttons</Link>
                    </li>
                    <li className="nav-item">
                      <Link to="/admin/reference-elements/forms">Forms</Link>
                    </li>
                    <li className="nav-item">
                      <Link to="/admin/reference-elements/lists">Lists</Link>
                    </li>
                    <li className="nav-item">
                      <Link to="/admin/reference-elements/tables">Tables</Link>
                    </li>
                    <li className="nav-item">
                      <Link to="/admin/reference-elements/typography">Typography</Link>
                    </li>
                    <li className="nav-item">
                      <Link to="/admin/reference-elements/containers">Containers</Link>
                    </li>
                  </ul>
                </li>
              </ul>
            </li>
          )}
          <li className="nav-item">
            <span className="logout-link" onClick={handleLogout}>Logout</span>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
