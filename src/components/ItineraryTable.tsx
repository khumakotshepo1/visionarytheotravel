import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";

export function ItineraryTable({
  itenerary,
}: {
  itenerary: CruiseItineraryPropsType[];
}) {
  return (
    <Table>
      <TableBody>
        {itenerary?.map((day) => (
          <TableRow
            key={day.day}
            className="border-foreground text-center capitalize"
          >
            <TableCell className="font-medium">
              <span>{day.day}</span>
            </TableCell>
            <TableCell>{day.location}</TableCell>
            <TableCell>{day.depart === null ? "-" : day.depart}</TableCell>
            <TableCell>{day.arrive === null ? "-" : day.arrive}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
