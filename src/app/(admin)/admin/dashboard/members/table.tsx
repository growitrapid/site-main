'use client';

import React, { useEffect, useRef, useState } from 'react'
import { forwardRef } from 'react';
import MaterialTable, { Column } from 'material-table';
import { ThemeProvider, createTheme } from '@mui/material';

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

import './table.scss';
import { UserData } from '@/utils/firebase-client';
import MyAvatar from '../../../../../assets/me.png'
import { BroadcastChannel } from '@/utils/web';

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

const columns: Column<UserData>[] = [
    {
        title: "Avatar",
        field: "image",
        render: rowData => <img
            src={rowData.image || MyAvatar.src}
            style={{ width: 40, borderRadius: "50%" }}
            referrerPolicy='no-referrer'
        />,
        width: 50,
        sorting: false,
        searchable: false,
        export: true,
        grouping: false,
    },
    {
        title: "Name",
        field: "name",
        grouping: false,
    },
    {
        title: "ID",
        field: "id",
        grouping: false,
    },
    {
        title: "Email",
        field: "email",
        grouping: false,
    },
    {
        title: "Email Verified",
        field: "emailVerified",
        type: "boolean",
        grouping: true,
    },
    {
        title: "Role",
        field: "role",
        lookup: { 0: "User", 1: "Editor", 2: "Admin", 3: "Operator" },
        defaultSort: "asc",
    },
    {
        title: "Status",
        field: "status",
        lookup: { 0: "Pending", 1: "Active", 2: "Inactive", 3: "Banned" }
    },
    {
        title: "Created At",
        field: "createdAt",
        type: "date"
    }
];

export default function Table({ theme }: { theme: string }) {
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
    const [isLoading, setIsLoading] = useState(true);
    const [isFiltering, setIsFiltering] = useState(false);
    const [isGrouping, setIsGrouping] = useState(false);
    const [data, setData] = useState<UserData[]>([]);

    useEffect(() => {
        setIsLoading(true);
        fetch('./members/getData').then(res => res.json()).then(data => {
            setData(data.users);
            setIsLoading(false);
        });
    }, []);

    return (
        <ThemeProvider theme={defaultMaterialTheme}>
            <MaterialTable
                title="Members Management"
                isLoading={isLoading}
                icons={tableIcons}
                style={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                }}
                columns={columns as Column<UserData>[]}
                data={data}
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
                    }
                ]}
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
                editable={{
                    isEditable: rowData => true,
                    isEditHidden: rowData => false,
                    isDeletable: rowData => true,
                    isDeleteHidden: rowData => false,
                    onRowAdd: newData => {
                        return new Promise((resolve, reject) => {
                            setIsLoading(true);
                            fetch('./members/getData', {
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/json'
                                },
                                body: JSON.stringify({
                                    newUserData: newData,
                                    type: 'new'
                                })
                            })
                                .then(res => res.json())
                                .then(d => {
                                    setData([...data, newData]);
                                    resolve(newData);
                                    setIsLoading(false);
                                })
                                .catch(err => console.log(err));
                        })
                    },
                    onRowUpdate: (newData, oldData) => {
                        return new Promise((resolve, reject) => {
                            setIsLoading(true);
                            fetch('./members/getData', {
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/json'
                                },
                                body: JSON.stringify({
                                    newUserData: newData,
                                    type: 'update'
                                })
                            })
                                .then(res => res.json())
                                .then(d => {
                                    resolve(newData);
                                    setData(data.map((u) => u.id === oldData?.id ? newData : u))
                                    setIsLoading(false);
                                })
                                .catch(err => console.log(err));
                        })
                    },
                    onRowDelete: oldData => {
                        return new Promise((resolve, reject) => {
                            setIsLoading(true);
                            fetch('./members/getData', {
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/json'
                                },
                                body: JSON.stringify({
                                    type: 'delete'
                                })
                            })
                                .then(res => res.json())
                                .then(d => {
                                    setData(data.filter((u) => u.id !== oldData.id));
                                    resolve(oldData);
                                    setIsLoading(false);
                                })
                                .catch(err => console.log(err));
                        })
                    },
                }}
            />
        </ThemeProvider>
    )
}