'use client';

import React, { forwardRef, useEffect, useRef, useState } from 'react'
import { BlogData } from './page';
import { BroadcastChannel } from '@/utils/web';
import { ThemeProvider, createTheme } from '@mui/material';
import MaterialTable, { Column, Query, QueryResult } from 'material-table';

import AddBox from '@material-ui/icons/AddBox';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';
import GroupWork from '@material-ui/icons/GroupWork';
import { Icons } from 'material-table';
import Link from 'next/link';
import { BiLinkExternal, BiPlus, BiRefresh, BiTrash } from 'react-icons/bi';

import MyAvatar from '../../../../../assets/me.png';
import './table.scss';
import { useRouter } from 'next/navigation';

const tableIcons: Icons = {
    Add: forwardRef(function Icon(props, ref) { return <AddBox {...props} ref={ref} /> }),
    Check: forwardRef(function Icon(props, ref) { return <Check {...props} ref={ref} /> }),
    Clear: forwardRef(function Icon(props, ref) { return <Clear {...props} ref={ref} /> }),
    Delete: forwardRef(function Icon(props, ref) { return <DeleteOutline {...props} ref={ref} /> }),
    DetailPanel: forwardRef(function Icon(props, ref) { return <ChevronRight {...props} ref={ref} /> }),
    Edit: forwardRef(function Icon(props, ref) { return <Edit {...props} ref={ref} /> }),
    Export: forwardRef(function Icon(props, ref) { return <SaveAlt {...props} ref={ref} /> }),
    Filter: forwardRef(function Icon(props, ref) { return <FilterList {...props} ref={ref} /> }),
    FirstPage: forwardRef(function Icon(props, ref) { return <FirstPage {...props} ref={ref} /> }),
    LastPage: forwardRef(function Icon(props, ref) { return <LastPage {...props} ref={ref} /> }),
    NextPage: forwardRef(function Icon(props, ref) { return <ChevronRight {...props} ref={ref} /> }),
    PreviousPage: forwardRef(function Icon(props, ref) { return <ChevronLeft {...props} ref={ref} /> }),
    ResetSearch: forwardRef(function Icon(props, ref) { return <Clear {...props} ref={ref} /> }),
    Search: forwardRef(function Icon(props, ref) { return <Search {...props} ref={ref} /> }),
    SortArrow: forwardRef(function Icon(props, ref) { return <ArrowDownward {...props} ref={ref} /> }),
    ThirdStateCheck: forwardRef(function Icon(props, ref) { return <Remove {...props} ref={ref} /> }),
    ViewColumn: forwardRef(function Icon(props, ref) { return <ViewColumn {...props} ref={ref} /> })
};

const columns: Column<BlogData>[] = [
    {
        title: "Title",
        field: "title",
        type: "string",
        grouping: false,
        filtering: false,
        sorting: true,
        searchable: true,
        render: (rowData) => <p className={`max-w-[250px] min-w-[200px]`}>{rowData.title}</p>,
    },
    {
        title: "Author",
        field: "author",
        render: (rowData) => {
            return <Link className='no-after' href={rowData.author.url} target='_blank'><div className={`
                flex flex-row items-center justify-start p-1
                w-full h-full border-[1px] border-[var(--border-primary-color)] rounded-full
                max-w-[200px] min-w-[200px]
            `}>
                <img
                    src={rowData.author.image || MyAvatar.src}
                    alt={rowData.author.name}
                    referrerPolicy='no-referrer'
                    className={`
                        w-[32px] h-[32px] rounded-full
                    `}
                />
                <span className={`
                    ml-[8px] text-[var(--text-primary-color)] font-medium
                `}>
                    {rowData.author.name}
                </span>
            </div></Link>
        },
        grouping: false,
        filtering: false,
        sorting: false,
        searchable: false,
    },
    {
        title: "Description",
        field: "description",
        type: "string",
        grouping: false,
        filtering: false,
        sorting: false,
        searchable: true,
        render: (rowData) => <p className={`
            max-w-[300px] min-w-[200px]
            text-ellipsis overflow-hidden
        `}>{rowData.description.slice(0, 62) + "..."}</p>,
    },
    {
        title: "Tags",
        field: "tags",
        type: "string",
        grouping: false,
        filtering: false,
        sorting: true,
        searchable: true,
        render: (rowData) => <p className={`
            max-w-[300px]
            text-ellipsis overflow-hidden
        `}>{rowData.tags.join(", ")}</p>,
    },
    {
        title: "Time To Read",
        field: "time_to_read",
        type: "numeric",
        grouping: true,
        filtering: false,
        sorting: true,
        searchable: true,
        render: (rowData) => <p className={`
            max-w-[300px]
            text-ellipsis overflow-hidden
        `}>{rowData.time_to_read} min.</p>,
    },
    {
        title: "Updated At",
        field: "_updatedAt",
        type: "string",
    },
    {
        title: "Created At",
        field: "_createdAt",
        type: "string",
    },
]

export default function Table({
    data: initialData,
    theme
}: {
    data: BlogData[];
    theme: string;
}) {
    const [isDark, setIsDark] = useState(theme === "dark" ? true : false);
    const themeBroadcast = useRef(new BroadcastChannel("theme", { should_receive_own_messages: true }));

    themeBroadcast.current.onReceiveMessage((event, data) => {
        if (event === "theme_toggle") {
            setIsDark(data.theme === "dark" ? true : false);
        }
    })

    const defaultMaterialTheme = createTheme({
        palette: {
            mode: !isDark ? 'light' : 'dark',
        },
    });
    const ref = useRef<any>(null);
    const router = useRouter();
    const [isFirstRender, setIsFirstRender] = useState(true);
    const [isLoading, setIsLoading] = useState(true);
    const [isFiltering, setIsFiltering] = useState(false);
    const [isGrouping, setIsGrouping] = useState(false);
    const [data, setData] = useState<BlogData[]>(initialData);

    useEffect(() => {
        if (isFirstRender) {
            setIsFirstRender(false);
            return;
        }
    }, [isFirstRender]);

    const getData = (query: Query<BlogData>): Promise<QueryResult<BlogData>> => {
        setIsLoading(true);

        return new Promise((resolve, reject) => {
            const currentPage = query.page === 0 ? 1 : query.page + 1;
            const pageSize = query.pageSize || 10;
            const APIUrl = `./blogs/api?currentPage=${currentPage}&pageSize=${pageSize}`;

            // if (currentPage === 0 && pageSize === 10 && isFirstRender) {
            //     setIsLoading(false);
            //     return resolve({
            //         data: initialData,
            //         page: 0,
            //         totalCount: initialData.length,
            //     });
            // }

            fetch(APIUrl)
                .then(response => response.json())
                .then(result => {
                    setIsLoading(false);
                    resolve({
                        data: result.data,
                        page: result.page - 1,
                        totalCount: result.total,
                    })
                }).catch(error => {
                    setIsLoading(false);
                    reject(error);
                });
        });
    };

    return (
        <ThemeProvider theme={defaultMaterialTheme}>
            <MaterialTable
                title="Blogs Management"
                ref={ref}
                isLoading={isLoading}
                icons={tableIcons}
                style={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                }}
                data={getData}
                columns={columns}
                options={{
                    exportButton: true,
                    filtering: isFiltering,
                    grouping: isGrouping,
                    sorting: true,
                    search: true,
                    paging: true,
                    // selection: true,
                    pageSize: 10,
                    pageSizeOptions: [10, 20, 50, 100],
                    paginationType: "stepped",
                    showFirstLastPageButtons: true,
                    draggable: true,
                    emptyRowsWhenPaging: true,
                    exportAllData: true,
                    exportFileName: "members",
                    exportDelimiter: ",",
                    // exportCsv: (columns, data) => {
                    //     alert('You should develop a code to export ' + data.length + ' rows');
                    // },
                    maxBodyHeight: "100%",
                    minBodyHeight: "100%",
                    padding: "dense",
                    overflowY: "auto",
                }}
                actions={[
                    {
                        icon: () => <FilterList />,
                        tooltip: 'Enable Filtering',
                        isFreeAction: true,
                        onClick: (event, rowData) => setIsFiltering(!isFiltering)
                    },
                    {
                        icon: () => <GroupWork />,
                        tooltip: 'Enable Grouping',
                        isFreeAction: true,
                        onClick: (event, rowData) => setIsGrouping(!isGrouping)
                    },
                    {
                        icon: () => <BiRefresh />,
                        tooltip: 'Refresh Data',
                        isFreeAction: true,
                        onClick: (event, rowData) => ref.current && ref.current.onQueryChange(),
                    },
                    {
                        icon: () => <BiPlus />,
                        tooltip: 'Add Blog',
                        isFreeAction: true,
                        onClick: (event, rowData) => { },
                    },
                    {
                        icon: () => <BiTrash />,
                        tooltip: 'Delete Blogs',
                        onClick: (event, rowData) => { },
                    },
                    {
                        icon: () => <Edit />,
                        tooltip: 'Edit Blog',
                        isFreeAction: false,
                        onClick: (event, rowData) => {
                            // @ts-ignore
                            router.push(`./blogs/${rowData.slug}`);
                        },
                    },
                    {
                        icon: () => <BiLinkExternal />,
                        tooltip: 'Open Blog',
                        isFreeAction: false,
                        onClick: (event, rowData) => { },
                    }
                ]}
            />
        </ThemeProvider>
    )
}