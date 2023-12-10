import { useMemo, useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  Icon,
  IconButton,
  LinearProgress,
  Pagination,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TableRow,
} from "@mui/material";
import { ListToolBar } from "../../shared/components";
import { BasePage } from "../../shared/layouts";
import {
  CustomersService,
  ICustomer,
} from "../../shared/services/api/customers/CustomersService";
import { useDebounce } from "../../shared/hooks";
import { Environment } from "../../shared/environment";

export const ListCustomers: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { debounce } = useDebounce(1000);
  const navigate = useNavigate();

  const [rows, setRows] = useState<ICustomer[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const search = useMemo(() => {
    return searchParams.get("search") || "";
  }, [searchParams]);

  const page = useMemo(() => {
    return Number(searchParams.get("page")) || 1;
  }, [searchParams]);

  useEffect(() => {
    setIsLoading(true);
    debounce(() => {
      CustomersService.getAll(page, search)
        .then((result) => {
          setRows(result.data);
          setTotalCount(result.total);
          setIsLoading(false);
        })
        .catch((error) => {
          setIsLoading(false);
          alert(error);
        });
    });
  }, [debounce, page, search]);

  const handleDelete = (id: number) => {
    if (window.confirm("Realmente deseja apagar?")) {
      CustomersService.deleteById(id)
        .then(() => {
          CustomersService.getAll(page, search)
            .then((result) => {
              setRows(result.data);
              setTotalCount(result.total);
              setIsLoading(false);
            })
            .catch((error) => {
              setIsLoading(false);
              alert(error);
            });
        })
        .catch((error) => {
          alert(error);
        });
    }
  };

  return (
    <BasePage
      title="Listagem de Clientes"
      toolBar={
        <ListToolBar
          showSearchInput
          textToSearch={search}
          onChangeTextSearch={(text) =>
            setSearchParams({ search: text, page: "1" }, { replace: true })
          }
        />
      }
    >
      <TableContainer
        component={Paper}
        variant="outlined"
        sx={{ m: 1, width: "auto" }}
      >
        <Table>
          <TableHead>
            <TableCell>Nome</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Ações</TableCell>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.id}>
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.email}</TableCell>
                <TableCell>
                  <IconButton
                    size="small"
                    onClick={() => navigate(`/customers/${row.id}`)}
                  >
                    <Icon>edit</Icon>
                  </IconButton>
                  <IconButton size="small" onClick={() => handleDelete(row.id)}>
                    <Icon>delete</Icon>
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          {totalCount === 0 && !isLoading && (
            <caption>{Environment.EMPTY_LISTING}</caption>
          )}
          <TableFooter>
            {isLoading && (
              <TableRow>
                <TableCell colSpan={3}>
                  <LinearProgress variant="indeterminate" />
                </TableCell>
              </TableRow>
            )}
            {totalCount > 0 && totalCount > Environment.DEFAULT_MAX_ITEMS && (
              <TableRow>
                <TableCell colSpan={3}>
                  <Pagination
                    page={page}
                    count={Math.ceil(
                      totalCount / Environment.DEFAULT_MAX_ITEMS
                    )}
                    onChange={(_, newPage) =>
                      setSearchParams({ search, page: newPage.toString() })
                    }
                  />
                </TableCell>
              </TableRow>
            )}
          </TableFooter>
        </Table>
      </TableContainer>
    </BasePage>
  );
};
