import React, { useEffect, useState } from "react";
import { BasePage } from "../../shared/layouts";
import { ListToolBar } from "../../shared/components";
import { Box, Card, CardContent, Grid, Typography } from "@mui/material";
import { CitiesService } from "../../shared/services/api/cities/CitiesService";
import { CustomersService } from "../../shared/services/api/customers/CustomersService";

export const Dashboard: React.FC = () => {
  const [isLoadingCities, setIsLoadingCities] = useState(true);
  const [isLoadingCustomers, setIsLoadingCustomers] = useState(true);
  const [totalCountCities, setTotalCountCities] = useState(0);
  const [totalCountCustomers, setTotalCountCustomers] = useState(0);

  useEffect(() => {
    setIsLoadingCities(true);
    setIsLoadingCustomers(true);

    CitiesService.getAll(1)
      .then((result) => {
        setIsLoadingCities(false);
        setTotalCountCities(result.total);
      })
      .catch((error) => {
        setIsLoadingCities(false);
        alert(error);
      });

    CustomersService.getAll(1)
      .then((result) => {
        setIsLoadingCustomers(false);
        setTotalCountCustomers(result.total);
      })
      .catch((error) => {
        setIsLoadingCustomers(false);
        alert(error);
      });
  }, []);

  return (
    <BasePage
      title="Página Inicial"
      toolBar={<ListToolBar showNewBotton={false} />}
    >
      <Box width="100%" display="flex">
        <Grid container margin={1}>
          <Grid container item spacing={1}>
            <Grid item xs={12} sm={12} md={8} lg={4} xl={3}>
              <Card>
                <CardContent>
                  <Typography variant="h5" align="center">
                    Total de Clientes
                  </Typography>
                  <Box
                    display="flex"
                    padding={6}
                    justifyContent="center"
                    alignItems="center"
                  >
                    {!isLoadingCustomers && (
                      <Typography variant="h2">
                        {totalCountCustomers}
                      </Typography>
                    )}
                    {isLoadingCustomers && (
                      <Typography variant="h2">Carregando...</Typography>
                    )}
                  </Box>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={12} md={8} lg={4} xl={3}>
              <Card>
                <CardContent>
                  <Typography variant="h5" align="center">
                    Total de Cidades
                  </Typography>
                  <Box
                    display="flex"
                    padding={6}
                    justifyContent="center"
                    alignItems="center"
                  >
                    {!isLoadingCities && (
                      <Typography variant="h2">{totalCountCities}</Typography>
                    )}
                    {isLoadingCities && (
                      <Typography variant="h2">Carregando...</Typography>
                    )}
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </BasePage>
  );
};
