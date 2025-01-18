import { Group, Paper, SimpleGrid, Text } from "@mantine/core";
import { IconArrowDownRight, IconArrowUpRight } from "@tabler/icons-react";
import { BsEye, BsPostcardHeart } from "react-icons/bs";
import { FaUsers, FaUsersCog } from "react-icons/fa";

const icons = {
  user: FaUsersCog,
  view: BsEye,
  post: BsPostcardHeart,
  users: FaUsers,
};

export const StatesCards = () => {
  const data = [
    {
      title: "PROYECTOS TOTALES",
      icon: "post",
      diff: 34,
    },
    {
      title: "USUARIOS TOTALES",
      icon: "users",
      diff: -13,
    },
    {
      title: "COMENTARIOS TOTALES",
      icon: "view",
      diff: 18,
    },
    {
      title: "SERVICIOS TOTALES",
      icon: "user",
      diff: -30,
    },
  ];

  const stats = data?.map((stat) => {
    const Icon = icons[stat.icon as keyof typeof icons];
    const DiffIcon = stat.diff > 0 ? IconArrowUpRight : IconArrowDownRight;

    return (
      <div key={stat.title}>
        <Paper withBorder p="md">
          <Group justify="space-between">
            <Text className="capitalize text-sm">{stat.title}</Text>
            <Icon size="1.4rem" />
          </Group>

          <Group align="flex-end" gap="xs" mt={25}>
            <Text className="text-2xl 2xl:text-4xl font-serif">Hoy</Text>

            <Text
              c={stat.diff > 0 ? "teal" : "red"}
              fz="sm"
              fw="500"
              className="font-medium"
            >
              <span>{stat.diff}%</span>
              <DiffIcon size="1rem" stroke={0.5} />
            </Text>
          </Group>

          <Text fz="xs" c="dimmed" mt={7}>
            Comparar con el mes pasado
          </Text>
        </Paper>
      </div>
    );
  });

  return <SimpleGrid cols={{ base: 1, xs: 2, md: 4 }}>{stats}</SimpleGrid>;
};
