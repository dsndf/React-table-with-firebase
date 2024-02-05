import React, { useEffect, useMemo, useState } from "react";
import { usePagination, useSortBy, useTable } from "react-table";
import { data } from "../../assets/data.json";
import "./Table.css";
import { auth } from "../../Firebase/firebaseConfig";
import { userServiceProvider } from "../../Firebase/services";
const Table = () => {
  const [usersList ,setUsersList] = useState([]);
  const getUsers = async ()=>{
  const users = await userServiceProvider.getAllUsers();
  setUsersList(users.docs.map((doc)=>doc.data()));
  }
  useEffect(()=>{
  getUsers();
    console.log(auth.currentUser);
  },[])
  const columns = useMemo(() => {
    return [     
       { Header: "Id", accessor: "id" },
      { Header: "Name", accessor: "name" },
      { Header: "Email", accessor: "email" },
      { Header: "Created", accessor: "createdAt" },
    ];
  }, []);
  const { gotoPage,prepareRow, getTableProps, getTableBodyProps, headerGroups, page,nextPage,previousPage ,state:{pageIndex} ,pageCount} =
    useTable({ columns, data:usersList,initialState:{
      pageSize:5
    } }, useSortBy,usePagination);
  return (
    <div>
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map((hg) => {
            return (
              <tr {...hg.getHeaderGroupProps()}>
                {hg.headers.map((column) => (
                  <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                    {column.render("Header")} {column.isSorted && (
                      <span>{column.isSortedDesc ?"up":"down"}</span>
                    )}
                  </th>
                ))}
              </tr>
            );
          })}
          {/* <tr>
          <th>Id</th>
          <th>Name</th>
          <th>Gender</th>
        </tr> */}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return (
                    <td {...cell.getCellProps()} onClick={()=>console.log({cell})}  className={cell.value === "male"?"red":"green"}>{cell.render("Cell")}</td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className="pagination-box">
        <button className="btn" onClick={()=>gotoPage(0)} >First</button>
        <button className="btn" onClick={previousPage} >Prev</button>
        <span>{pageIndex+1} of {pageCount}</span>
        <button className="btn" onClick= {nextPage}>Next</button>
        <button disabled ={true} className="btn" onClick= {()=>gotoPage(pageCount-1)}>Last</button>
      </div>
    </div>
  );
};

export default Table;
