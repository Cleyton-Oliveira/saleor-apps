import { FormControl, Grid, InputLabel, MenuItem, Select } from "@material-ui/core";
import { Skeleton } from "@material-ui/lab";
import { SingleProviderSchema } from "../../../lib/cms/config";
import { AppPaper } from "../../ui/app-paper";

import { ProvidersErrors, ProvidersLoading } from "./types";

const ProviderInstancesListSkeleton = () => {
  return (
    <AppPaper>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Skeleton variant="rect" width={"45%"} height={10} />
        </Grid>
        <Grid item xs={12}>
          <Skeleton variant="rect" width={"100%"} height={30} />
        </Grid>
        <Grid item xs={12}>
          <Skeleton variant="rect" width={"100%"} height={30} />
        </Grid>
      </Grid>
    </AppPaper>
  );
};

interface ProviderInstancesListProps {
  providerInstances: SingleProviderSchema[];
  activeProviderInstance?: SingleProviderSchema | null;
  newProviderInstance?: SingleProviderSchema | null;
  setActiveProviderInstance: (providerInstance: SingleProviderSchema | null) => void;
  requestAddProviderInstance: () => void;
  loading: ProvidersLoading;
  errors: ProvidersErrors;
}

export const ProviderInstancesSelect = ({
  providerInstances,
  activeProviderInstance,
  newProviderInstance,
  setActiveProviderInstance,
  requestAddProviderInstance,
  loading,
  errors,
}: ProviderInstancesListProps) => {
  const handleSetActiveProviderInstance = (providerInstance: SingleProviderSchema) => {
    setActiveProviderInstance(providerInstance);
  };

  if (loading.fetching) {
    return <ProviderInstancesListSkeleton />;
  }

  if (errors.fetching) {
    return <div>Error loading providers</div>;
  }

  if (providerInstances.length === 0 || !activeProviderInstance) {
    return null;
  }

  return (
    <FormControl fullWidth>
      <InputLabel id="provider-select">Select Provider to configure</InputLabel>

      <Select
        labelId="channel-select"
        variant="outlined"
        fullWidth
        value={activeProviderInstance?.id}
        onChange={(e, value) => {
          handleSetActiveProviderInstance(providerInstances.find((p) => p.id === e.target.value)!);
        }}
      >
        {providerInstances.map((p) => (
          <MenuItem key={p.id} value={p.id}>
            {p.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};
