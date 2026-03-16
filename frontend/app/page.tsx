"use client";

import { useEffect, useState } from "react";

interface ComplianceControl {
  id: string;
  name: string;
  status: string;
  description: string;
}

interface ComplianceData {
  status: string;
  project: string;
  metrics: {
    overallStatus: string;
    lastAudit: string;
    score: number;
  };
  controls: ComplianceControl[];
}

export default function Home() {
  const [data, setData] = useState<ComplianceData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("http://localhost:3001/api/compliance");
        if (!res.ok) throw new Error("Failed to fetch compliance data");
        const json = await res.json();
        setData(json);
      } catch (err: any) {
        setError(err.message || "Unknown error occurred");
      } finally {
        setTimeout(() => setLoading(false), 500); // Small delay for aesthetic loading state
      }
    };
    fetchData();
  }, []);

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-950 font-sans text-zinc-50 p-6 selection:bg-emerald-500/30">
      <main className="w-full max-w-4xl rounded-2xl border border-zinc-800 bg-zinc-900/50 p-8 shadow-2xl backdrop-blur-xl sm:p-12">
        <header className="mb-10 flex flex-col items-start justify-between gap-4 border-b border-zinc-800 pb-8 sm:flex-row sm:items-center">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-white">
              Compliance Dashboard
            </h1>
            <p className="mt-2 text-sm text-zinc-400">
              ISO 27001 & SOC 2 Status Monitoring
            </p>
          </div>
          {loading ? (
            <div className="h-8 w-24 animate-pulse rounded-full bg-zinc-800" />
          ) : data ? (
            <div className="flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-4 py-1.5 text-sm font-medium text-emerald-400">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500"></span>
              </span>
              System: {data.metrics.overallStatus}
            </div>
          ) : (
            <div className="flex items-center gap-2 rounded-full border border-red-500/20 bg-red-500/10 px-4 py-1.5 text-sm font-medium text-red-400">
              System: OFFLINE
            </div>
          )}
        </header>

        {error && (
          <div className="mb-8 rounded-lg border border-red-900/50 bg-red-900/20 p-4 text-sm text-red-200">
            <p className="font-semibold">Connection Error:</p>
            <p className="text-red-300">
              Could not reach the backend service ("http://localhost:3001"). Ensure it is running.
            </p>
          </div>
        )}

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 mb-10">
          {[
            { label: "Project", value: data?.project || "—" },
            { label: "Audit Score", value: data ? `${data.metrics.score}/100` : "—" },
            { label: "Latest Audit", value: data ? new Date(data.metrics.lastAudit).toLocaleTimeString() : "—" },
            { label: "Controls Validated", value: data ? data.controls.length : "0" },
          ].map((stat, i) => (
            <div
              key={i}
              className="group flex flex-col justify-center rounded-xl border border-zinc-800 bg-zinc-900 p-5 transition-all hover:border-zinc-700 hover:bg-zinc-800/80"
            >
              <span className="text-xs font-medium uppercase tracking-wider text-zinc-500">
                {stat.label}
              </span>
              {loading ? (
                <div className="mt-2 h-6 w-20 animate-pulse rounded bg-zinc-800" />
              ) : (
                <span className="mt-2 text-xl font-semibold text-zinc-100">
                  {stat.value}
                </span>
              )}
            </div>
          ))}
        </div>

        <div>
          <h2 className="mb-4 text-lg font-semibold text-zinc-100">
            Active Security Controls
          </h2>
          <div className="grid gap-4">
            {loading ? (
              [1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="h-20 w-full animate-pulse rounded-xl border border-zinc-800 bg-zinc-900/50"
                />
              ))
            ) : data ? (
              data.controls.map((control) => (
                <div
                  key={control.id}
                  className="flex flex-col gap-3 rounded-xl border border-zinc-800 bg-zinc-900/50 p-4 transition-all hover:bg-zinc-800/80 sm:flex-row sm:items-center sm:justify-between"
                >
                  <div className="flex items-center gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-zinc-800 text-xs font-medium text-zinc-300">
                      {control.id.split("-")[1]}
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-zinc-200">
                        {control.name}
                      </h3>
                      <p className="mt-1 text-xs text-zinc-400">
                        {control.description}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-400">
                      <svg
                        className="h-3.5 w-3.5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      {control.status}
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <div className="flex h-32 items-center justify-center rounded-xl border border-zinc-800 border-dashed text-sm text-zinc-500">
                No compliance data available
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
