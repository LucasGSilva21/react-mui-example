import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Box, Grid, LinearProgress, Paper, Typography } from "@mui/material";
import * as yup from "yup";
import { VForm, VTextField, useVForm, IVFormErrors } from "../../shared/forms";
import { BasePage } from "../../shared/layouts";
import { CitiesAutoComplete, DetailToolBar } from "../../shared/components";
import {
  CustomersService,
  ICustomer,
} from "../../shared/services/api/customers/CustomersService";

const formValidationSchema: yup.ObjectSchema<Omit<ICustomer, "id">> =
  yup.object({
    name: yup.string().required().min(3),
    email: yup.string().email().required(),
    cityId: yup.number().required(),
  });

export const DetailCustomers = () => {
  const { id } = useParams<"id">();
  const navigate = useNavigate();

  const { formRef, save, saveAndBack, isSaveAndBack } = useVForm();

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
    } else {
      setIsLoading(false);
      formRef.current?.setData({
        name: "",
        email: "",
        cityId: undefined,
      });
    }
  }, [id, navigate, formRef]);

  const handleSave = (data: Omit<ICustomer, "id">) => {
    formValidationSchema
      .validate(data, { abortEarly: false })
      .then((validateData) => {
        setIsLoading(true);
        if (id === "new") {
          CustomersService.create(validateData)
            .then((result) => {
              setIsLoading(false);
              if (isSaveAndBack()) {
                navigate(`/customers`);
              } else {
                navigate(`/customers/${result}`);
              }
            })
            .catch((error) => {
              setIsLoading(false);
              alert(error.message);
            });
        } else {
          CustomersService.updateById(Number(id), data)
            .then(() => {
              setIsLoading(false);
              if (isSaveAndBack()) {
                navigate(`/customers`);
              }
            })
            .catch((error) => {
              setIsLoading(false);
              alert(error.message);
            });
        }
      })
      .catch((errors: yup.ValidationError) => {
        const validationErrors: IVFormErrors = {};

        errors.inner.forEach((error) => {
          if (!error.path) return;
          validationErrors[error.path] = error.message;
        });

        formRef.current?.setErrors(validationErrors);
      });
  };

  const handleDelete = (id: number) => {
    if (window.confirm("Realmente deseja apagar?")) {
      CustomersService.deleteById(id)
        .then(() => {
          navigate("/customers");
        })
        .catch((error) => {
          alert(error.message);
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
          onClickSaveBotton={() => save()}
          onClickSaveAndBackBotton={() => saveAndBack()}
        />
      }
    >
      <VForm ref={formRef} onSubmit={handleSave}>
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
                <CitiesAutoComplete isExternalLoading={isLoading} />
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </VForm>
    </BasePage>
  );
};
