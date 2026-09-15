"use client";

import { useEffect, useState } from "react";

type CompensationRecord = {
  id: number;
  role: string;
  level: string;
  location: string;
  baseSalary: string;
  bonus: string;
  stock: string;
  totalCompensation: string;
  currency: string;
  company: {
    name: string;
  };
};

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function Home() {
  const [records, setRecords] = useState<CompensationRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [company, setCompany] = useState("");
  const [role, setRole] = useState("");
  const [level, setLevel] = useState("");
  const [location, setLocation] = useState("");

  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [sort, setSort] = useState("desc");
  const [selectedRecords, setSelectedRecords] = useState<number[]>([]);

  const chartData = records.reduce(
    (acc, record) => {
      const existingCompany = acc.find(
        (item) => item.company === record.company.name
      );

      if (existingCompany) {
        existingCompany.total += Number(record.totalCompensation);
        existingCompany.count += 1;
      } else {
        acc.push({
          company: record.company.name,
          total: Number(record.totalCompensation),
          count: 1,
        });
      }

      return acc;
    },
    [] as { company: string; total: number; count: number }[]
  );


  useEffect(() => {
    fetch(
      `/api/compensation?search=${encodeURIComponent(search)}&company=${encodeURIComponent(company)}&role=${encodeURIComponent(role)}&level=${encodeURIComponent(level)}&location=${encodeURIComponent(location)}&page=${page}&limit=${limit}&sort=${sort}`
    )
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch compensation data");
        }
        return res.json();
      })
      .then((data) => {
        setRecords(data);
        setLoading(false);
        setError("");
      })
      .catch(() => {
        setError("Failed to load compensation data.");
        setLoading(false);
      });
  }, [search, company, role, level, location, page, sort]);

  useEffect(() => {
    setSelectedRecords([]);
  }, [search, company, role, level, location, page]);



  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <div className="mx-auto max-w-7xl px-6 py-10">
        <h1 className="text-4xl font-bold">CompIntel</h1>

        {error && (
  <p className="mt-2 text-sm text-red-400">
    {error}
  </p>
)}

        <p className="mt-2 text-slate-400">
          Compensation Intelligence System
        </p>

        <div className="mt-10 rounded-xl border border-slate-800 bg-slate-900 p-6">
          <h2 className="text-2xl font-semibold">
            Salary Explorer
          </h2>
          <input
            type="text"
            placeholder="Search company, role, level, or location..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="mt-4 w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none placeholder:text-slate-500 focus:border-slate-500"
          />

          <select
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            className="mt-4 w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 text-white"
          >
            <option value="">All Companies</option>
            <option value="Google">Google</option>
            <option value="Microsoft">Microsoft</option>
            <option value="Amazon">Amazon</option>
            <option value="Meta">Meta</option>
            <option value="Adobe">Adobe</option>
            <option value="TCS">TCS</option>
            <option value="Infosys">Infosys</option>
            <option value="Wipro">Wipro</option>
            <option value="Accenture">Accenture</option>
            <option value="Flipkart">Flipkart</option>
            <option value="Razorpay">Razorpay</option>
            <option value="Swiggy">Swiggy</option>
            <option value="IBM">IBM</option>
          </select>

          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="mt-4 w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 text-white"
          >
            <option value="">All Roles</option>
            <option value="Software Engineer">Software Engineer</option>
            <option value="Data Scientist">Data Scientist</option>
            <option value="Product Manager">Product Manager</option>
            <option value="Frontend Engineer">Frontend Engineer</option>
            <option value="Backend Engineer">Backend Engineer</option>
            <option value="DevOps Engineer">DevOps Engineer</option>
          </select>

          <select
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="mt-4 w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 text-white"
          >
            <option value="">All Locations</option>
            <option value="Bangalore">Bangalore</option>
            <option value="Hyderabad">Hyderabad</option>
            <option value="Mumbai">Mumbai</option>
            <option value="Delhi">Delhi</option>
            <option value="Kolkata">Kolkata</option>
            <option value="Pune">Pune</option>
            <option value="Chennai">Chennai</option>
          </select>

          <select
            value={sort}
            onChange={(e) => {
              setSort(e.target.value);
              setPage(1);
            }}
            className="mt-4 w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 text-white"
          >
            <option value="desc">Highest Total Compensation</option>
            <option value="asc">Lowest Total Compensation</option>
          </select>

          <select
            value={level}
            onChange={(e) => setLevel(e.target.value)}
            className="mt-4 w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 text-white"
          >
            <option value="">All Levels</option>
            <option value="Intern">Intern</option>
            <option value="SDE I">SDE I</option>
            <option value="SDE II">SDE II</option>
            <option value="SDE III">SDE III</option>
            <option value="L3">L3</option>
            <option value="L4">L4</option>
            <option value="L5">L5</option>
            <option value="L6">L6</option>
            <option value="62">62</option>
            <option value="63">63</option>
          </select>

          <p className="mt-2 text-slate-400">
            Explore compensation across companies, roles, levels, and locations.
          </p>

          {loading ? (
            <p className="mt-6 text-slate-400">
              Loading compensation data...
            </p>
          ) : (
            <>
              <div className="mt-6 overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead className="border-b border-slate-700 text-slate-400">
                    <tr>
                      <th className="px-4 py-3 text-left">Select</th>
                      <th className="px-4 py-3">Company</th>
                      <th className="px-4 py-3">Role</th>
                      <th className="px-4 py-3">Level</th>
                      <th className="px-4 py-3">Location</th>
                      <th className="px-4 py-3">Base</th>
                      <th className="px-4 py-3">Bonus</th>
                      <th className="px-4 py-3">Stock</th>
                      <th className="px-4 py-3">Total Compensation</th>
                    </tr>
                  </thead>

                  <tbody>
                    {loading ? (
                      <tr>
                        <td
  colSpan={9}
  className="px-4 py-8 text-center text-slate-400"
>
  <div className="flex items-center justify-center gap-2">
    <div className="h-5 w-5 animate-spin rounded-full border-2 border-slate-600 border-t-white" />
    Loading compensation data...
  </div>
</td>
                      </tr>
                    ) : records.length === 0 ? (
                      <tr>
                        <td
                          colSpan={9}
                          className="px-4 py-8 text-center text-slate-400"
                        >
                          No compensation records found.
                        </td>
                      </tr>
                    ) : (
                      records.map((record) => (
                        <tr
                          key={record.id}
                          className="border-b border-slate-800 hover:bg-slate-800"
                        >
                          <td className="px-4 py-3">
                            <input
                              type="checkbox"
                              checked={selectedRecords.includes(record.id)}
                              onChange={() => {
                                setSelectedRecords((prev) => {
                                  if (prev.includes(record.id)) {
                                    return prev.filter((id) => id !== record.id);
                                  }

                                  if (prev.length >= 3) {
                                    alert("You can compare a maximum of 3 records.");
                                    return prev;
                                  }

                                  return [...prev, record.id];
                                });
                              }}
                              className="h-4 w-4"
                            />
                          </td>

                          <td className="px-4 py-3 font-medium">
                            {record.company.name}
                          </td>
                          <td className="px-4 py-3">{record.role}</td>
                          <td className="px-4 py-3">{record.level}</td>
                          <td className="px-4 py-3">{record.location}</td>
                          <td className="px-4 py-3">
                            {record.currency} {record.baseSalary}
                          </td>
                          <td className="px-4 py-3">
                            {record.currency} {record.bonus}
                          </td>
                          <td className="px-4 py-3">
                            {record.currency} {record.stock}
                          </td>
                          <td className="px-4 py-3 font-semibold">
                            {record.currency} {record.totalCompensation}
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>

              <div className="mt-6 flex items-center justify-between">
                <button
                  onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                  disabled={page === 1}
                  className="rounded-lg border border-slate-700 px-4 py-2 text-white disabled:cursor-not-allowed disabled:opacity-40"
                >
                  ← Previous
                </button>

                <span className="text-sm text-slate-400">
                  Page {page}
                </span>

                <button
                  onClick={() => setPage((prev) => prev + 1)}
                  disabled={records.length < limit}
                  className="rounded-lg border border-slate-700 px-4 py-2 text-white disabled:cursor-not-allowed disabled:opacity-40"
                >
                  Next →
                </button>
              </div>

              {selectedRecords.length >= 2 && (
                <div className="mt-6 flex items-center justify-between rounded-xl border border-slate-700 bg-slate-900 p-4">
                  <div>
                    <p className="font-semibold text-white">
                      {selectedRecords.length} records selected
                    </p>
                    <p className="text-sm text-slate-400">
                      Compare the selected compensation records.
                    </p>
                  </div>

                  <button
                    onClick={() => {
                      document
                        .getElementById("comparison")
                        ?.scrollIntoView({ behavior: "smooth" });
                    }}
                    className="rounded-lg bg-white px-4 py-2 font-semibold text-slate-900 hover:bg-slate-200"
                  >
                    Compare Selected
                  </button>
                  <button
                    onClick={() => setSelectedRecords([])}
                    className="rounded-lg border border-slate-700 px-4 py-2 font-semibold text-white hover:bg-slate-800"
                  >
                    Clear Selection
                  </button>
                </div>
              )}

              {selectedRecords.length >= 2 && (
                <div id="comparison" className="mt-8 rounded-xl border border-slate-700 bg-slate-900 p-6">
                  <h2 className="text-2xl font-bold text-white">
                    Compensation Comparison
                  </h2>

                  <p className="mt-2 text-sm text-slate-400">
                    Compare the selected compensation records across company, role, level,
                    location, and total compensation.
                  </p>

                  <div className="mt-6 overflow-x-auto">
                    <table className="w-full text-left text-sm text-slate-300">
                      <thead>
                        <tr className="border-b border-slate-700">
                          <th className="px-4 py-3">Metric</th>

                          {records
                            .filter((record) => selectedRecords.includes(record.id))
                            .map((record) => (
                              <th key={record.id} className="px-4 py-3">
                                {record.company.name}
                              </th>
                            ))}
                        </tr>
                      </thead>

                      <tbody>
                        {[
                          ["Role", (record: CompensationRecord) => record.role],
                          ["Level", (record: CompensationRecord) => record.level],
                          ["Location", (record: CompensationRecord) => record.location],
                          ["Base Salary", (record: CompensationRecord) => `₹${record.baseSalary}`],
                          ["Bonus", (record: CompensationRecord) => `₹${record.bonus}`],
                          ["Stock", (record: CompensationRecord) => `₹${record.stock}`],
                          [
                            "Total Compensation",
                            (record: CompensationRecord) => `₹${record.totalCompensation}`,
                          ],
                        ].map(([label, getValue]) => (
                          <tr key={label as string} className="border-b border-slate-800">
                            <td className="px-4 py-3 font-semibold text-white">
                              {label as string}
                            </td>

                            {records
                              .filter((record) => selectedRecords.includes(record.id))
                              .map((record) => (
                                <td
                                  key={record.id}
                                  className={`px-4 py-3 ${label === "Total Compensation" ? "font-bold text-white" : ""}`}
                                >
                                  {(getValue as (record: CompensationRecord) => string)(record)}
                                </td>
                              ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              <div className="mt-8 rounded-xl border border-slate-700 bg-slate-900 p-6">
                <h2 className="text-2xl font-bold text-white">
                  Compensation Overview
                </h2>

                <p className="mt-2 text-sm text-slate-400">
                  Total compensation represented by each company in the current results.
                </p>

                <div className="mt-6 h-80 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={chartData}>
                      <XAxis
                        dataKey="company"
                        tick={{ fill: "#94a3b8", fontSize: 12 }}
                      />

                      <YAxis tick={{ fill: "#94a3b8", fontSize: 12 }} />

                      <Tooltip />

                      <Bar dataKey="total" name="Total Compensation" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </main>
  );
}
