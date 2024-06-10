import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Outlet } from "react-router-dom";

function App() {
  const client = new QueryClient();
  return (
    <div className=" min-h-screen bg-slate-200 flex justify-center items-center ">
      <QueryClientProvider client={client}>
        <Outlet />
      </QueryClientProvider>
    </div>
  );
}

export default App;
