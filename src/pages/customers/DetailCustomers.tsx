import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { BasePage } from "../../shared/layouts";
import { DetailToolBar } from "../../shared/components";
import { CustomersService } from "../../shared/services/api/customers/CustomersService";
import { LinearProgress } from "@mui/material";

export const DetailCustomers = () => {
  const { id } = useParams<"id">();
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(true);
  const [name, setName] = useState("");

  useEffect(() => {
    if (id !== "new") {
      setIsLoading(true);
      CustomersService.getById(Number(id))
        .then((result) => {
          setIsLoading(false);
          setName(result.name);
          console.log(result);
        })
        .catch((error) => {
          setIsLoading(false);
          alert(error.message);
          navigate("/customers");
        });
    }
  }, [id, navigate]);

  const handleDelete = (id: number) => {
    if (window.confirm("Realmente deseja apagar?")) {
      CustomersService.deleteById(id)
        .then(() => {
          alert("Registro apagado com sucesso!");
          navigate("/customers");
        })
        .catch((error) => {
          alert(error);
        });
    }
  };

  return (
    <BasePage
      title={id === "new" ? "Novo Cliente" : name}
      toolBar={
        <DetailToolBar
          showSaveAndBackBotton
          showNewBotton={id !== "new"}
          showDeleteBotton={id !== "new"}
          onClickNewBotton={() => navigate("/customers/new")}
          onClickBackBotton={() => navigate("/customers")}
          onClickDeleteBotton={() => handleDelete(Number(id))}
        />
      }
    >
      {isLoading && <LinearProgress variant="indeterminate" />}
      <p>Detalhe de pessoas</p>
    </BasePage>
  );
};
