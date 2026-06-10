import { useState } from "react";
import { Select, Card, CardContent, CardHeader, CardTitle, Badge, Table, TableBody, TableCell, TableHead, TableHeader, TableRow, Loader, Text, Box } from "@yetric/ui";

export default function DashboardPage() {
  const [league, setLeague] = useState("allsvenskan");
  const [year, setYear] = useState("2026");
  const [teamId, setTeamId] = useState<string | null>(null);

  return (
    <Box style={{ maxWidth: "1200px", margin: "0 auto" }}>
      <div style={{ marginBottom: "2rem" }}>
        <Text style={{ fontSize: "1.25rem", fontWeight: 700 }}>Dashboard</Text>
        <Text style={{ fontSize: "0.875rem", color: "#6b7280" }}>Team overview and analytics</Text>
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
        <Select
          label="Team"
          placeholder="Select team"
          options={[]}
          value={teamId}
          onChange={setTeamId}
        />
      </div>

      {!teamId ? (
        <Card>
          <CardContent style={{ padding: "2rem", textAlign: "center" }}>
            <Text style={{ color: "#6b7280" }}>Select a team to view dashboard</Text>
          </CardContent>
        </Card>
      ) : (
        <div style={{ display: "grid", gap: "1.5rem" }}>
          {/* Standing Card */}
          <Card>
            <CardHeader>
              <CardTitle>Standing</CardTitle>
            </CardHeader>
            <CardContent>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(100px, 1fr))", gap: "1rem" }}>
                <div>
                  <Text style={{ fontSize: "0.875rem", color: "#6b7280" }}>Position</Text>
                  <Text style={{ fontSize: "1.5rem", fontWeight: 700 }}>#1</Text>
                </div>
                <div>
                  <Text style={{ fontSize: "0.875rem", color: "#6b7280" }}>Points</Text>
                  <Text style={{ fontSize: "1.5rem", fontWeight: 700 }}>72</Text>
                </div>
                <div>
                  <Text style={{ fontSize: "0.875rem", color: "#6b7280" }}>Played</Text>
                  <Text style={{ fontSize: "1.5rem", fontWeight: 700 }}>24</Text>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Upcoming Matches */}
          <Card>
            <CardHeader>
              <CardTitle>Upcoming Matches</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Match</TableHead>
                    <TableHead style={{ textAlign: "right" }}>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>Match vs Team</TableCell>
                    <TableCell style={{ textAlign: "right" }}>
                      <Badge>Scheduled</Badge>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          {/* Recent Matches */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Matches</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Result</TableHead>
                    <TableHead style={{ textAlign: "right" }}>Outcome</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>Team 2 - 1 Opponent</TableCell>
                    <TableCell style={{ textAlign: "right" }}>
                      <Badge color="green">W</Badge>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      )}
    </Box>
  );
}
