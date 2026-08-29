import { useState } from "react";
import { Stack, Typography, FormControl, FormControlLabel, Checkbox, FormHelperText, TextField } from "@mui/material";

export const paymentProviders = ["Credit card", "PayPal", "Klarna", "Vipps"];

interface PaymentDetailsProps {
  checked: boolean;
  onCheck: (provider: string, checked: boolean) => void;
  onChange: () => void;
}

  export const PaymentDetails = ({ onCheck, onChange }: PaymentDetailsProps) => {
  const [selectedProvider, setSelectedProvider] = useState<string>("");

    const handleCheck = (provider: string) => {
      const newChecked = selectedProvider === provider ? "" : provider;
      setSelectedProvider(newChecked);
      onCheck(provider, newChecked === provider);
  };

  return (
    <Stack spacing={2}>
      <Typography variant="h4">
        PAYMENT DETAILS
      </Typography>

      <Typography variant="body1">
        <strong>Payment method:</strong>
      </Typography>

      <FormControl>
        {paymentProviders.map((provider) => (
          <FormControlLabel key={provider} control={
            <Checkbox
              key={provider}
              checked={selectedProvider === provider}
              onChange={() => handleCheck(provider)}
            />
          } label={provider} />
        ))}
         <FormHelperText sx={{ fontStyle: "italic" }}>Select your preferred provider</FormHelperText>
      </FormControl>

      {selectedProvider && (
        <>
        <Typography variant="body1">
          <strong>Card details:</strong>
        </Typography>

        <FormControl sx={{ display: "flex", gap: 2 }}>
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
          </FormControl>
        </>
      )}
  </Stack>
  );
};
