import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import VerifyEmail from './components/auth/VerifyEmail';
import AuthenticatedLandingPage from './components/AuthenticatedLandingPage';
import Dashboard from './components/dashboard/Dashboard';
import ForgotPassword from './components/auth/ForgotPassword';
import Settings from './components/settings/Settings';
import PrivateRoute from './components/common/PrivateRoute';
import { monitorAuthState } from './auth';
import Layout from './components/layout/Layout';

import ReferenceAccordions from './components/admin/referance/ReferenceAccordions';
import ReferenceButtons from './components/admin/referance/ReferenceButtons';
import ReferenceForms from './components/admin/referance/ReferenceForms';
import ReferenceLists from './components/admin/referance/ReferenceLists';
import ReferenceTables from './components/admin/referance/ReferenceTables';
import ReferenceTypography from './components/admin/referance/ReferenceTypography';
import ReferenceContainers from './components/admin/referance/ReferenceContainers';
import Users from './components/admin/Users';
import AccountTypes from './components/admin/AccountTypes';
import TransactionTypes from './components/admin/TransactionTypes';
import CurrencyTypes from './components/admin/CurrencyTypes';
import ValuableAssetTypes from './components/admin/ValuableAssetTypes';

monitorAuthState();

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/verify-email" element={<VerifyEmail />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route
          path="/authenticated-landing"
          element={
            <PrivateRoute>
              <Layout>
                <AuthenticatedLandingPage />
              </Layout>
            </PrivateRoute>
          }
        />
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Layout>
                <Dashboard />
              </Layout>
            </PrivateRoute>
          }
        />
        <Route
          path="/settings"
          element={
            <PrivateRoute>
              <Layout>
                <Settings />
              </Layout>
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/users"
          element={
            <PrivateRoute>
              <Layout>
                <Users />
              </Layout>
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/account-types"
          element={
            <PrivateRoute>
              <Layout>
                <AccountTypes />
              </Layout>
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/transaction-types"
          element={
            <PrivateRoute>
              <Layout>
                <TransactionTypes />
              </Layout>
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/currency-types"
          element={
            <PrivateRoute>
              <Layout>
                <CurrencyTypes />
              </Layout>
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/valuable-asset-types"
          element={
            <PrivateRoute>
              <Layout>
                <ValuableAssetTypes />
              </Layout>
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/reference-elements/accordions"
          element={
            <PrivateRoute>
              <Layout>
                <ReferenceAccordions />
              </Layout>
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/reference-elements/buttons"
          element={
            <PrivateRoute>
              <Layout>
                <ReferenceButtons />
              </Layout>
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/reference-elements/forms"
          element={
            <PrivateRoute>
              <Layout>
                <ReferenceForms />
              </Layout>
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/reference-elements/lists"
          element={
            <PrivateRoute>
              <Layout>
                <ReferenceLists />
              </Layout>
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/reference-elements/tables"
          element={
            <PrivateRoute>
              <Layout>
                <ReferenceTables />
              </Layout>
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/reference-elements/typography"
          element={
            <PrivateRoute>
              <Layout>
                <ReferenceTypography />
              </Layout>
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/reference-elements/containers"
          element={
            <PrivateRoute>
              <Layout>
                <ReferenceContainers />
              </Layout>
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
