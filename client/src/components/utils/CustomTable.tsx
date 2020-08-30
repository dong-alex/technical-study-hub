import React, {
  useState,
  useEffect,
  MouseEvent,
  ChangeEvent,
  FunctionComponent,
} from "react";
import styled from "styled-components";
import { Button } from "@material-ui/core";
import TablePagination from "@material-ui/core/TablePagination";
import CssBaseline from "@material-ui/core/CssBaseline";
import MaUTable from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import DeleteModal from "./DeleteModal";
import { useTable, Column } from "react-table";
import { useDataProvider } from "../../hooks/DataProvider";
import usePagination from "../../hooks/usePagination";

type CustomTableProps = {
  columns: Column[];
  data: any;
  isTag?: boolean;
  onDelete: (id: string) => void;
};

const CustomPagination = styled(TablePagination)`
  height: 100%;
  display: flex;
  justify-content: center;
  > li {
    &:first-child {
      padding: 0px;
      width: auto;
      height: auto;
    }
    &:last-child {
      padding: 0px;
      width: auto;
      height: auto;
    }

    > a {
      padding: 0;
    }

    max-width: 200px;
    padding: 0 1rem 0 1rem;
    margin: 0 1rem 0 1rem;
  }
`;

const CustomTable: FunctionComponent<CustomTableProps> = ({
  columns,
  data,
}) => {
  const [displayData, setDisplayData] = useState<any[]>([]);
  const [itemsPerPage, setItemsPerPage] = useState<number>(10);
  const [page, setPage] = useState<number>(0);
  const { getTableProps, headerGroups, rows, prepareRow } = useTable({
    columns,
    data: displayData,
  });

  useEffect(() => {
    let offset = page * itemsPerPage;
    let dataSet = data.slice(offset, offset + itemsPerPage);
    setDisplayData(dataSet);
  }, [data, page]);

  const handleChangePage = (
    event: MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setItemsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const getCellProps = (cellInfo: any) => {
    return cellInfo.column.id === "tagColor"
      ? {
          style: {
            backgroundColor: cellInfo.value,
          },
        }
      : {};
  };

  return (
    <>
      <MaUTable {...getTableProps()}>
        <TableHead>
          {headerGroups.map((headerGroup) => (
            <TableRow {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => {
                return (
                  <TableCell {...column.getHeaderProps()}>
                    {column.render("Header")}
                  </TableCell>
                );
              })}
            </TableRow>
          ))}
        </TableHead>
        <TableBody>
          {rows.map((row, i) => {
            prepareRow(row);
            return (
              <TableRow {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return (
                    <TableCell {...cell.getCellProps([getCellProps(cell)])}>
                      {cell.render("Cell")}
                    </TableCell>
                  );
                })}
              </TableRow>
            );
          })}
        </TableBody>
      </MaUTable>
      <CustomPagination
        count={data.length}
        page={page}
        rowsPerPage={itemsPerPage}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </>
  );
};

export default CustomTable;
