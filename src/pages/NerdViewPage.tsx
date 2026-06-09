import { useState } from "react";
import {
  Container,
  Stack,
  Group,
  Select,
  Text,
  Table,
  Center,
  Loader,
  Alert,
} from "@yetric/ui";
import { useProAPI } from "../hooks/useProAPI";

export default function NerdViewPage() {
  const [league, setLeague] = useState("allsvenskan");
  const [year, setYear] = useState("2026");

  const { data, isLoading, error } = useProAPI(
    `/leagues/${league}/${year}/nerd`
  );

  const rows = data?.rows?.slice(0, 10).map((row: any) => (
    <Table.Tr key={row.teamId}>
      <Table.Td>{row.pos}</Table.Td>
      <Table.Td>{row.teamName}</Table.Td>
      <Table.Td ta="center">{row.played}</Table.Td>
      <Table.Td ta="center">{row.wins}</Table.Td>
      <Table.Td ta="center">{row.draws}</Table.Td>
      <Table.Td ta="center">{row.losses}</Table.Td>
      <Table.Td ta="right" fw={600}>
        {row.points}
      </Table.Td>
    </Table.Tr>
  ));

  return (
    <Container size="lg">
      <Stack gap="lg">
        <div>
          <Text size="xl" fw={700}>
            Nerd View
          </Text>
          <Text size="sm" c="dimmed">
            Detailed league standings and statistics
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
        </Group>

        {error && (
          <Alert color="red" title="Error">
            {error instanceof Error ? error.message : "Failed to load data"}
          </Alert>
        )}

        {isLoading ? (
          <Center h={300}>
            <Loader />
          </Center>
        ) : (
          <Table striped highlightOnHover>
            <Table.Thead>
              <Table.Tr>
                <Table.Th>#</Table.Th>
                <Table.Th>Team</Table.Th>
                <Table.Th ta="center">S</Table.Th>
                <Table.Th ta="center">V</Table.Th>
                <Table.Th ta="center">O</Table.Th>
                <Table.Th ta="center">F</Table.Th>
                <Table.Th ta="right">Pts</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>{rows}</Table.Tbody>
          </Table>
        )}
      </Stack>
    </Container>
  );
}
