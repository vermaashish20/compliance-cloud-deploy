const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

app.get("/api/compliance", (req, res) => {
  res.json({
    status: "success",
    project: "Azure Compliant Demo",
    metrics: {
      overallStatus: "PASS",
      lastAudit: new Date().toISOString(),
      score: 100,
    },
    controls: [
      { id: "ISO-001", name: "Encryption at Rest", status: "PASS", description: "Azure Platform-Managed Keys (PMK) enabled for all storage." },
      { id: "ISO-002", name: "TLS 1.2+ Enforced", status: "PASS", description: "In-transit encryption enabled on App Gateway and ACA." },
      { id: "SOC2-001", name: "VNet Isolation", status: "PASS", description: "Backend ACA segregated into private virtual network." },
      { id: "SOC2-002", name: "Principle of Least Privilege", status: "PASS", description: "Managed Identities utilized in place of credentials." },
    ]
  });
});

app.get("/api/health", (req, res) => {
  res.json({ status: "UP", timestamp: new Date().toISOString() });
});

app.get("/api/initial-data", (req, res) => {
  res.json({
    status: "success",
    project: "Azure Compliant Demo (Old Data)",
    metrics: {
      overallStatus: "WARNING",
      lastAudit: new Date().toISOString(),
      score: 75,
    },
    controls: [
      { id: "ISO-001", name: "Encryption at Rest", status: "PASS", description: "Azure Platform-Managed Keys (PMK) enabled for all storage." },
      { id: "SOC2-001", name: "VNet Isolation", status: "FAIL", description: "Backend ACA segregated into private virtual network." },
    ]
  });
});

app.get("/api/button-data", (req, res) => {
  res.json({
    status: "success",
    project: "Azure Compliant Demo (New Data)",
    metrics: {
      overallStatus: "EXCELLENT",
      lastAudit: new Date().toISOString(),
      score: 100,
    },
    controls: [
      { id: "ISO-001", name: "Encryption at Rest", status: "PASS", description: "Azure Platform-Managed Keys (PMK) enabled for all storage." },
      { id: "ISO-002", name: "TLS 1.2+ Enforced", status: "PASS", description: "In-transit encryption enabled on App Gateway and ACA." },
      { id: "SOC2-001", name: "VNet Isolation", status: "PASS", description: "Backend ACA segregated into private virtual network." },
      { id: "SOC2-002", name: "Principle of Least Privilege", status: "PASS", description: "Managed Identities utilized in place of credentials." },
      { id: "NEW-001", name: "AI Anomaly Detection", status: "PASS", description: "Real-time AI monitoring enabled across all endpoints." },
    ]
  });
});

app.listen(PORT, () => {
  console.log(`Backend service is running on http://localhost:${PORT}`);
});
