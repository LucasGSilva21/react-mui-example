import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Box, Grid, LinearProgress, Paper, Typography } from "@mui/material";
import { Form } from "@unform/web";
import { FormHandles } from "@unform/core";
import { VTextField } from "../../shared/forms";
import { BasePage } from "../../shared/layouts";
import { DetailToolBar } from "../../shared/components";
import {
  CustomersService,
  ICustomer,
} from "../../shared/services/api/customers/CustomersService";

export const DetailCustomers = () => {
  const { id } = useParams<"id">();
  const navigate = useNavigate();

  const formRef = useRef<FormHandles>(null);

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
          formRef.current?.setData(result);
        })
        .catch((error) => {
          setIsLoading(false);
          alert(error.message);
          navigate("/customers");
        });
    }
  }, [id, navigate]);

  const handleSave = (data: Omit<ICustomer, "id">) => {
    setIsLoading(true);
    if (id === "new") {
      CustomersService.create(data)
        .then((result) => {
          setIsLoading(false);
          navigate(`/customers/${result}`);
        })
        .catch((error) => {
          setIsLoading(false);
          alert(error);
        });
    } else {
      CustomersService.updateById(Number(id), data)
        .then(() => {
          setIsLoading(false);
          alert("Dados alterados com sucesso!");
        })
        .catch((error) => {
          setIsLoading(false);
          alert(error);
        });
    }
  };

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
          onClickSaveBotton={() => formRef.current?.submitForm()}
          onClickSaveAndBackBotton={() => formRef.current?.submitForm()}
        />
      }
    >
      <Form ref={formRef} onSubmit={handleSave}>
        <Box
          margin={1}
          display="flex"
          flexDirection="column"
          component={Paper}
          variant="outlined"
        >
          <Grid container direction="column" padding={2} spacing={2}>
            {isLoading && id !== "new" && (
              <Grid item>
                <LinearProgress variant="indeterminate" />
              </Grid>
            )}
            <Grid item>
              <Typography variant="h6">Formulário</Typography>
            </Grid>
            <Grid container item direction="row" spacing={2}>
              <Grid item xs={12} sm={12} md={6} lg={4} xl={2}>
                <VTextField
                  fullWidth
                  disabled={isLoading}
                  label="Nome"
                  name="name"
                  onChange={(e) => setName(e.target.value)}
                />
              </Grid>
            </Grid>
            <Grid container item direction="row" spacing={2}>
              <Grid item xs={12} sm={12} md={6} lg={4} xl={2}>
                <VTextField
                  fullWidth
                  disabled={isLoading}
                  label="Email"
                  name="email"
                />
              </Grid>
            </Grid>
            <Grid container item direction="row" spacing={2}>
              <Grid item xs={12} sm={12} md={6} lg={4} xl={2}>
                <VTextField
                  fullWidth
                  disabled={isLoading}
                  label="Cidade"
                  name="cityId"
                />
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </Form>
    </BasePage>
  );
};
