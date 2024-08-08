import { Layout } from "../../pages/Admin_Dashboard/ReusingDashboardLayout/Layout";
// import { ProtectedRoute } from "../../routes/ProtectedRoute";

export const WithLayout_AdminDashboard = (Component: any) => (props: any) => {
  return (
    // <ProtectedRoute>
    <Layout>
      <Component {...props} />
    </Layout>
    // </ProtectedRoute>
  );
};
