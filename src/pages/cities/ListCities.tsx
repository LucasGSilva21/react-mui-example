import { useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { ListToolBar } from "../../shared/components";
import { BasePage } from "../../shared/layouts";

export const ListCities: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const search = useMemo(() => {
    return searchParams.get("search") || "";
  }, [searchParams]);

  return (
    <BasePage
      title="Listagem de Cidades"
      toolBar={
        <ListToolBar
          showSearchInput
          textNewBotton="Nova"
          textToSearch={search}
          onChangeTextSearch={(text) =>
            setSearchParams({ search: text }, { replace: true })
          }
        />
      }
    ></BasePage>
  );
};
