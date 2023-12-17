import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Box, Grid, LinearProgress, Paper, Typography } from "@mui/material";
import * as yup from "yup";
import { VForm, VTextField, useVForm, IVFormErrors } from "../../shared/forms";
import { BasePage } from "../../shared/layouts";
import { DetailToolBar } from "../../shared/components";
import {
  CitiesService,
  ICities,
} from "../../shared/services/api/cities/CitiesService";

const formValidationSchema: yup.ObjectSchema<Omit<ICities, "id">> = yup.object({
  name: yup.string().required().min(3),
});

export const DetailCities = () => {
  const { id } = useParams<"id">();
  const navigate = useNavigate();

  const { formRef, save, saveAndBack, isSaveAndBack } = useVForm();

  const [isLoading, setIsLoading] = useState(true);
  const [name, setName] = useState("");

  useEffect(() => {
    if (id !== "new") {
      setIsLoading(true);
      CitiesService.getById(Number(id))
        .then((result) => {
          setIsLoading(false);
          setName(result.name);
          console.log(result);
          formRef.current?.setData(result);
        })
        .catch((error) => {
          setIsLoading(false);
          alert(error.message);
          navigate("/cities");
        });
    } else {
      setIsLoading(false);
      formRef.current?.setData({
        name: "",
      });
    }
  }, [id, navigate, formRef]);

  const handleSave = (data: Omit<ICities, "id">) => {
    formValidationSchema
      .validate(data, { abortEarly: false })
      .then((validateData) => {
        setIsLoading(true);
        if (id === "new") {
          CitiesService.create(validateData)
            .then((result) => {
              setIsLoading(false);
              if (isSaveAndBack()) {
                navigate(`/cities`);
              } else {
                navigate(`/cities/${result}`);
              }
            })
            .catch((error) => {
              setIsLoading(false);
              alert(error.message);
            });
        } else {
          CitiesService.updateById(Number(id), data)
            .then(() => {
              setIsLoading(false);
              if (isSaveAndBack()) {
                navigate(`/cities`);
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
      CitiesService.deleteById(id)
        .then(() => {
          navigate("/cities");
        })
        .catch((error) => {
          alert(error.message);
        });
    }
  };

  return (
    <BasePage
      title={id === "new" ? "Nova Cidade" : name}
      toolBar={
        <DetailToolBar
          textNewBotton="Nova"
          showSaveAndBackBotton
          showNewBotton={id !== "new"}
          showDeleteBotton={id !== "new"}
          onClickNewBotton={() => navigate("/cities/new")}
          onClickBackBotton={() => navigate("/cities")}
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
          </Grid>
        </Box>
      </VForm>
    </BasePage>
  );
};
