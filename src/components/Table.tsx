import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";

const invoices = [
  {
    day: "Day 1",
    date: "02 Jan 2025",
    location: "Durban",
    arrive: "08:00",
    depart: "09:00",
  },
  {
    day: "Day 2",
    date: "02 Jan 2025",
    location: "Portuguese Island",
    arrive: "08:00",
    depart: "09:00",
  },
  {
    day: "Day 3",
    date: "02 Jan 2025",
    location: "Pomeme",
    arrive: "08:00",
    depart: "09:00",
  },
  {
    day: "Day 4",
    date: "02 Jan 2025",
    location: "Durban",
    arrive: "08:00",
    depart: "09:00",
  },
  {
    day: "Day 5",
    date: "02 Jan 2025",
    location: "Durban",
    arrive: "08:00",
    depart: "09:00",
  },
  {
    day: "Day 6",
    date: "02 Jan 2025",
    location: "Portuguese Island",
    arrive: "08:00",
    depart: "09:00",
  },
  {
    day: "Day 7",
    date: "02 Jan 2025",
    location: "Pomeme",
    arrive: "08:00",
    depart: "09:00",
  },
];

export function TableDemo() {
  return (
    <Table>
      <TableBody>
        {invoices.map((day) => (
          <TableRow key={day.day} className="border-foreground">
            <TableCell className="font-medium">
              <span>
                {day.day}
                <p>{day.date}</p>
              </span>
            </TableCell>
            <TableCell>{day.location}</TableCell>
            <TableCell>{day.depart}</TableCell>
            <TableCell className="text-right">{day.arrive}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
