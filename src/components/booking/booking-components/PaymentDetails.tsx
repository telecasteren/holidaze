import { useState } from "react";
import {
  Stack,
  Typography,
  FormControl,
  FormControlLabel,
  Checkbox,
  FormHelperText,
  TextField,
} from "@mui/material";
import {
  ProviderLogoDisplay,
  providerDetails,
} from "@/components/booking/booking-components/ProvidersDisplay";

interface PaymentDetailsProps {
  checked: boolean;
  onCheck: (provider: string, checked: boolean) => void;
  onChange: () => void;
}

export const PaymentDetails = ({ onCheck, onChange }: PaymentDetailsProps) => {
  const [selectedProvider, setSelectedProvider] = useState<string>("");
  const selected = providerDetails.find((p) => p.name === selectedProvider);

  const handleCheck = (provider: string) => {
    const newChecked = selectedProvider === provider ? "" : provider;
    setSelectedProvider(newChecked);
    onCheck(provider, newChecked === provider);
  };

  return (
    <Stack spacing={2}>
      <Typography variant="h4">PAYMENT DETAILS</Typography>
      <Typography variant="body1">
        <strong>Payment method:</strong>
      </Typography>

      <FormControl>
        {providerDetails.map((provider) => (
          <FormControlLabel
            key={provider.name}
            control={
              <Checkbox
                key={provider.name}
                checked={selectedProvider === provider.name}
                onChange={() => handleCheck(provider.name)}
              />
            }
            label={provider.name}
          />
        ))}
        <FormHelperText sx={{ fontStyle: "italic" }}>
          Select your preferred provider
        </FormHelperText>
      </FormControl>

      <ProviderLogoDisplay />

      {/* checked provider form */}
      {selected && (
        <>
          <Typography variant="body1">
            <strong>{selected.title}</strong>
          </Typography>

          <FormControl sx={{ display: "flex", gap: 2 }}>
            {selected.name === "Card" ? (
              <>
                <TextField
                  id="card-number"
                  type="text"
                  label="Card number"
                  fullWidth
                  onChange={onChange}
                />
                <TextField
                  id="card-expiry"
                  type="date"
                  fullWidth
                  onChange={onChange}
                />
                <TextField
                  id="card-cvv"
                  type="number"
                  label="CVV code"
                  fullWidth
                  onChange={onChange}
                />
              </>
            ) : (
              <Typography variant="body2">{selected.description}</Typography>
            )}
          </FormControl>
        </>
      )}
    </Stack>
  );
};
