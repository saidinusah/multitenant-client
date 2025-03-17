import type { ColumnDef } from "@tanstack/vue-table";
import { EyeIcon } from "lucide-vue-next";

export type MemberDetails = {
    id: number,
    foreNames: string,
    lastName: string,
    phoneNumber: string,
    idNumber: string,

}

export const membersTableColumnDefinition: (viewDetails: Function) => ColumnDef<MemberDetails>[] = (viewDetails) => [
    {
        accessorKey: 'foreNames',
        header: 'Forename(s)'
    },
    {
        accessorKey: 'lastName',
        header: 'Last Name',
    }, {
        accessorKey: 'phoneNumber',
        header: 'Contact',
    },

    {
        accessorKey: 'idNumber',
        header: 'Id Number',
    },

    {
        accessorKey: 'actions',
        header: '',
        cell: ({ row }) =>
            h(EyeIcon, {
                onClick: () => viewDetails(row.original.id),
                class: 'text-gray-700 hover:text-gray-300',
                size: 16,

            }
            ),
    }]
