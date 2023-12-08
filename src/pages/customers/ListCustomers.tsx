import { useMemo, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { ListToolBar } from "../../shared/components";
import { BasePage } from "../../shared/layouts";
import { CustomersService } from "../../shared/services/api/customers/CustomersService";
import { useDebounce } from "../../shared/hooks";

export const ListCustomers: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { debounce } = useDebounce(1000);

  const search = useMemo(() => {
    return searchParams.get("search") || "";
  }, [searchParams]);

  useEffect(() => {
    debounce(() => {
      CustomersService.getAll(1, search)
        .then((result) => {
          console.log(result);
        })
        .catch((error) => {
          alert(error);
        });
    });
  }, [debounce, search]);

  return (
    <BasePage
      title="Listagem de Clientes"
      toolBar={
        <ListToolBar
          showSearchInput
          textToSearch={search}
          onChangeTextSearch={(text) =>
            setSearchParams({ search: text }, { replace: true })
          }
        />
      }
    ></BasePage>
  );
};
