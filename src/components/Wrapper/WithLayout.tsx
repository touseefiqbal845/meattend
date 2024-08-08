import { Layout } from "../../pages/Dashboard/Layout";
import { ProtectedRoute } from "../../routes/ProtectedRoute";

export const WithLayout = (Component: any) => (props: any) => {
  return (
    <ProtectedRoute>
      <Layout>
        <Component {...props} />
      </Layout>
    </ProtectedRoute>
  );
};
