import { Skeleton } from "@/components/ui/skeleton";

export default function AllUserLoading() {
  return (
    <tr className="">
      <td className="flex gap-2">
        <Skeleton className="size-10 mt-4 shrink-0 rounded-full" />
        <div className="mt-4">
          <Skeleton className="h-4 w-[150px]" />
          <Skeleton className="h-4 w-[100px] mt-2" />
        </div>
      </td>
      <td>
        <Skeleton className="h-4 w-[50px]" />
      </td>
      <td>
        <Skeleton className="h-4 w-[50px]" />
      </td>
      <td>
        <Skeleton className="h-4 w-[100px]" />
      </td>
      <td>
        <Skeleton className="h-4 w-[30px]" />
      </td>
    </tr>
  );
}
