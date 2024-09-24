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
          <TableRow key={day.day} className="border-foreground">
            <TableCell className="font-medium">
              <span>{day.day}</span>
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
