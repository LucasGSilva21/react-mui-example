import { useEffect, useMemo, useState } from "react";
import { Autocomplete, CircularProgress, TextField } from "@mui/material";
import { TAutoCompleteOption } from "../../types";
import { useDebounce } from "../../hooks";
import { CitiesService } from "../../services/api/cities/CitiesService";
import { useField } from "@unform/core";

interface ICitiesAutoCompleteProps {
  isExternalLoading?: boolean;
}

export const CitiesAutoComplete = ({
  isExternalLoading = false,
}: ICitiesAutoCompleteProps) => {
  const { fieldName, registerField, defaultValue, error, clearError } =
    useField("cityId");
  const { debounce } = useDebounce(1000);
  const [options, setOptions] = useState<TAutoCompleteOption[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [selectedId, setSelectedId] = useState<number | undefined>(
    defaultValue
  );

  useEffect(() => {
    registerField({
      name: fieldName,
      getValue: () => selectedId,
      setValue: (_, newSelectedId) => setSelectedId(newSelectedId),
    });
  }, [registerField, fieldName, selectedId]);

  useEffect(() => {
    setIsLoading(true);
    debounce(() => {
      CitiesService.getAll(1, search)
        .then((result) => {
          setOptions(
            result.data.map((city) => ({ id: city.id, label: city.name }))
          );
          setIsLoading(false);
        })
        .catch((error) => {
          setIsLoading(false);
          alert(error);
        });
    });
  }, [debounce, search]);

  const autoCompleteSelectedOption = useMemo(() => {
    if (!selectedId) return null;
    const selectedOption = options.find((option) => option.id === selectedId);
    if (!selectedOption) return null;
    return selectedOption;
  }, [selectedId, options]);

  return (
    <Autocomplete
      value={autoCompleteSelectedOption}
      onChange={(_, newValue) => {
        setSelectedId(newValue?.id);
        setSearch("");
        clearError();
      }}
      disabled={isExternalLoading}
      loading={isLoading}
      popupIcon={
        isExternalLoading || isLoading ? (
          <CircularProgress size={20} />
        ) : undefined
      }
      onInputChange={(_, newValue) => setSearch(newValue)}
      options={options}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Cidade"
          error={!!error}
          helperText={error}
        />
      )}
      openText="Abrir"
      closeText="Fechar"
      noOptionsText="Sem opções"
      loadingText="Carregando..."
      disablePortal
    />
  );
};
