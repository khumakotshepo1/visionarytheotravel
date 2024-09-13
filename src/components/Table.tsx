import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { cruiseIteneraryProps } from "./_cruises/Cruise";

export function TableDemo({
  itenerary,
}: {
  itenerary: cruiseIteneraryProps[];
}) {
  return (
    <Table>
      <TableBody>
        {itenerary?.map((day) => (
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
