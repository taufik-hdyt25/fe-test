import Layout from "@/components/Layout";
import { Table } from "./components";
import { useQuery } from "@tanstack/react-query";
import { getAllUser } from "@/lib/api/user/user.api";

const CustomerPage: React.FC = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["users"],
    queryFn: () => getAllUser(),
  });

  return (
    <Layout>
      <div className="min-h-screen px-5">
        <div className="my-5">Customer Page</div>

        <div className="my-5">
          {isLoading ? (
            <div className="h-screen flex justify-center items-center">
              Loading Data...
            </div>
          ) : (
            <Table data={data?.users} />
          )}
        </div>
      </div>
    </Layout>
  );
};

export default CustomerPage;
