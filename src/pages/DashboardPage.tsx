import { useState } from "react";
import {
  Container,
  Stack,
  Group,
  Select,
  Card,
  Text,
  Grid,
  Badge,
  Table,
  Loader,
  Center,
} from "@yetric/ui";

export default function DashboardPage() {
  const [league, setLeague] = useState("allsvenskan");
  const [year, setYear] = useState("2026");
  const [teamId, setTeamId] = useState<string | null>(null);

  // TODO: Fetch dashboard data using useProAPI hook
  // const { data, isLoading, error } = useProAPI(
  //   `/dashboard?league=${league}&year=${year}&teamId=${teamId}`
  // );

  return (
    <Container size="lg">
      <Stack gap="lg">
        <div>
          <Text size="xl" fw={700}>
            Dashboard
          </Text>
          <Text size="sm" c="dimmed">
            Team overview and analytics
          </Text>
        </div>

        <Group grow>
          <Select
            label="League"
            placeholder="Select league"
            data={[
              { value: "allsvenskan", label: "Allsvenskan" },
              { value: "superettan", label: "Superettan" },
            ]}
            value={league}
            onChange={(v) => setLeague(v || "allsvenskan")}
          />
          <Select
            label="Year"
            placeholder="Select year"
            data={[
              { value: "2026", label: "2026" },
              { value: "2025", label: "2025" },
            ]}
            value={year}
            onChange={(v) => setYear(v || "2026")}
          />
          <Select
            label="Team"
            placeholder="Select team"
            data={[]}
            value={teamId}
            onChange={setTeamId}
          />
        </Group>

        {!teamId ? (
          <Center h={300}>
            <Text c="dimmed">Select a team to view dashboard</Text>
          </Center>
        ) : (
          <Stack gap="lg">
            {/* Standing Card */}
            <Card withBorder>
              <Stack gap="sm">
                <Text fw={600}>Standing</Text>
                <Group justify="space-between">
                  <div>
                    <Text size="sm" c="dimmed">
                      Position
                    </Text>
                    <Text size="xl" fw={700}>
                      #1
                    </Text>
                  </div>
                  <div>
                    <Text size="sm" c="dimmed">
                      Points
                    </Text>
                    <Text size="xl" fw={700}>
                      72
                    </Text>
                  </div>
                  <div>
                    <Text size="sm" c="dimmed">
                      Played
                    </Text>
                    <Text size="xl" fw={700}>
                      24
                    </Text>
                  </div>
                </Group>
              </Stack>
            </Card>

            {/* Next Matches */}
            <Card withBorder>
              <Stack gap="sm">
                <Text fw={600}>Upcoming Matches</Text>
                <Table>
                  <Table.Tbody>
                    <Table.Tr>
                      <Table.Td>
                        <Text size="sm">Match vs Team</Text>
                      </Table.Td>
                      <Table.Td ta="right">
                        <Badge>Scheduled</Badge>
                      </Table.Td>
                    </Table.Tr>
                  </Table.Tbody>
                </Table>
              </Stack>
            </Card>

            {/* Recent Matches */}
            <Card withBorder>
              <Stack gap="sm">
                <Text fw={600}>Recent Matches</Text>
                <Table>
                  <Table.Tbody>
                    <Table.Tr>
                      <Table.Td>
                        <Text size="sm">Team 2 - 1 Team</Text>
                      </Table.Td>
                      <Table.Td ta="right">
                        <Badge color="green">W</Badge>
                      </Table.Td>
                    </Table.Tr>
                  </Table.Tbody>
                </Table>
              </Stack>
            </Card>
          </Stack>
        )}
      </Stack>
    </Container>
  );
}
