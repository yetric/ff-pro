import { useState } from "react";
import { Select, Card, CardContent, CardHeader, CardTitle, Table, TableBody, TableCell, TableHead, TableHeader, TableRow, Loader, Text, Box, Alert } from "@yetric/ui";
import { useProAPI } from "../hooks/useProAPI";

export default function NerdViewPage() {
  const [league, setLeague] = useState("allsvenskan");
  const [year, setYear] = useState("2026");

  const { data, isLoading, error } = useProAPI(
    `/leagues/${league}/${year}/nerd`
  );

  const rows = data?.rows?.slice(0, 10).map((row: any) => (
    <TableRow key={row.teamId}>
      <TableCell>{row.pos}</TableCell>
      <TableCell>{row.teamName}</TableCell>
      <TableCell style={{ textAlign: "center" }}>{row.played}</TableCell>
      <TableCell style={{ textAlign: "center" }}>{row.wins}</TableCell>
      <TableCell style={{ textAlign: "center" }}>{row.draws}</TableCell>
      <TableCell style={{ textAlign: "center" }}>{row.losses}</TableCell>
      <TableCell style={{ textAlign: "right", fontWeight: 600 }}>
        {row.points}
      </TableCell>
    </TableRow>
  ));

  return (
    <Box style={{ maxWidth: "1200px", margin: "0 auto" }}>
      <div style={{ marginBottom: "2rem" }}>
        <Text style={{ fontSize: "1.25rem", fontWeight: 700 }}>Nerd View</Text>
        <Text style={{ fontSize: "0.875rem", color: "#6b7280" }}>Detailed league standings and statistics</Text>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "1rem", marginBottom: "2rem" }}>
        <Select
          label="League"
          placeholder="Select league"
          options={[
            { value: "allsvenskan", label: "Allsvenskan" },
            { value: "superettan", label: "Superettan" },
          ]}
          value={league}
          onChange={(v) => setLeague(v)}
        />
        <Select
          label="Year"
          placeholder="Select year"
          options={[
            { value: "2026", label: "2026" },
            { value: "2025", label: "2025" },
          ]}
          value={year}
          onChange={(v) => setYear(v)}
        />
      </div>

      {error && (
        <Alert color="red" style={{ marginBottom: "1rem" }}>
          <Text>{error instanceof Error ? error.message : "Failed to load data"}</Text>
        </Alert>
      )}

      {isLoading ? (
        <div style={{ display: "flex", justifyContent: "center", padding: "2rem" }}>
          <Loader />
        </div>
      ) : (
        <Card>
          <CardContent style={{ padding: 0 }}>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>#</TableHead>
                  <TableHead>Team</TableHead>
                  <TableHead style={{ textAlign: "center" }}>S</TableHead>
                  <TableHead style={{ textAlign: "center" }}>V</TableHead>
                  <TableHead style={{ textAlign: "center" }}>O</TableHead>
                  <TableHead style={{ textAlign: "center" }}>F</TableHead>
                  <TableHead style={{ textAlign: "right" }}>Pts</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>{rows}</TableBody>
            </Table>
          </CardContent>
        </Card>
      )}
    </Box>
  );
}
