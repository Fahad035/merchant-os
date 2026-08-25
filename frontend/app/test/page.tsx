import DashboardLayout from "@/components/layout/DashboardLayout";

export default function Home() {
  return (
    <DashboardLayout>
      <div className="rounded-xl border bg-white p-8">
        <h2 className="text-3xl font-bold">
          Merchant Dashboard
        </h2>

        <p className="mt-4 text-gray-600">
          Dashboard layout is ready.
        </p>
      </div>
    </DashboardLayout>
  );
}