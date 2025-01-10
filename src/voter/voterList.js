import React, { useState, useEffect,useMemo } from 'react';
import '../App.css';
import axios from 'axios';
import { useTable,useFilters,usePagination} from 'react-table';
import Header from "../user/header";

// Define a default UI for filtering
function DefaultColumnFilter({
    column: { filterValue, preFilteredRows, setFilter },
  }) {
    const count = preFilteredRows.length;
  
    return (
      <input
        value={filterValue || ''}
        onChange={e => {
          setFilter(e.target.value || undefined); // Set undefined to remove the filter entirely
        }}
        placeholder={`Search ${count} records...`}
      />
    );
  }


const VoterList = () => {

    const user = JSON.parse(localStorage.getItem("user"));

    const listVoterURL = "http://localhost:8080/voter/listAllVoters";
    
    // Memoize headers to avoid unnecessary re-creation on each render
    const headers = useMemo(() => {
        return {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': true,
            Authorization: `Bearer ${user.accessToken}`,
        };
    }, [user.accessToken]); // Recreate headers only when user.accessToken changes

    const [data, setData] = useState([]);

    useEffect(() => {
        axios.get(listVoterURL,{headers:headers})
            .then(response => {
                setData(response.data);
            })
            .catch(error => {
                console.error('Error fetching voter data:', error);
            });
    }, [headers]); // Re-run effect if 'headers' changes

    const columns = React.useMemo(
        () => [
            {
                Header: 'Voter ID',
                accessor: 'voterId', // accessor is the "key" in the data
                Filter: DefaultColumnFilter,
                
            },
            {
                Header: 'Epic Number',
                accessor: 'epicNumber',
                Filter: DefaultColumnFilter,
            },
            {
                Header: 'First Name',
                accessor: 'firstName',
                Filter: DefaultColumnFilter,
            },
            {
                Header: 'Last Name',
                accessor: 'lastName',
                Filter: DefaultColumnFilter,
            },
        ],
        []
    );


    // Use the useTable hook to create the table instance
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        prepareRow,
        page,
        canPreviousPage,
        canNextPage,
        pageOptions,
        pageCount,
        gotoPage,
        nextPage,
        previousPage,
        setPageSize,
        state: { pageIndex, pageSize },
    } = useTable(
        {
            columns,
            data,
            initialState: { pageIndex: 0 }, // Set the initial page index
        },
        useFilters, // Use filters
        usePagination // Use pagination
    );

    return (

    <div className="container">
        <Header></Header>
        <div className ="row mb-4"></div>
        <h2>Voter List</h2>

        <>
        {/* ... is spread syntex - The Spread syntax is used to deconstruct an array or object into separate variables */}
        <table {...getTableProps()} style={{ width: '90%', border: '1px solid black' }}>
                <thead>
                    {headerGroups.map(headerGroup => (
                        <tr {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map(column => (
                                <th {...column.getHeaderProps()} style={{ padding: '10px', border: '1px solid black' }}>
                                    {column.render('Header')}
                                    <div>
                                        {column.canFilter ? column.render('Filter') : null}
                                    </div>
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                    {page.map(row => {
                        prepareRow(row);
                        return (
                            <tr {...row.getRowProps()}>
                                {row.cells.map(cell => (
                                    <td {...cell.getCellProps()} style={{ padding: '10px', border: '1px solid black' }}>
                                        {cell.render('Cell')}
                                    </td>
                                ))}
                            </tr>
                        );
                    })}
                </tbody>
            </table>

        <div className="pagination" style={{ marginTop: '10px' }}>
            <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
                {'<<'}
            </button>{' '}
            <button onClick={() => previousPage()} disabled={!canPreviousPage}>
                {'<'}
            </button>{' '}
            <button onClick={() => nextPage()} disabled={!canNextPage}>
                {'>'}
            </button>{' '}
            <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
                {'>>'}
            </button>{' '}
            <span>
                Page{' '}
                <strong>
                    {pageIndex + 1} of {pageOptions.length}
                </strong>{' '}
            </span>
            <span>
                | Go to page:{' '}
                <input
                    type="number"
                    defaultValue={pageIndex + 1}
                    onChange={e => {
                        const page = e.target.value ? Number(e.target.value) - 1 : 0;
                        gotoPage(page);
                    }}
                    style={{ width: '50px' }}
                />
            </span>{' '}
            <select
                value={pageSize}
                onChange={e => setPageSize(Number(e.target.value))}
            >
                {[10, 20, 30, 40, 50].map(pageSize => (
                    <option key={pageSize} value={pageSize}>
                        Show {pageSize}
                    </option>
                ))}
            </select>
        </div>
    </>

    </div>

    );
};

export default VoterList;
