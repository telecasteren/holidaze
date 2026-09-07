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

export const paymentProviders = providerDetails.flatMap((provider) =>
  Object.keys(provider),
);

const providerTitles = Object.fromEntries(
  providerDetails.flatMap((provider) =>
    Object.entries(provider).map(([key, value]) => [key, value.title]),
  ),
);

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

  const providerForms: Record<string, React.ReactNode> = {
    Card: (
      <>
        <TextField
          id="card-number"
          type="text"
          label="Card number"
          fullWidth
          onChange={onChange}
        />
        <TextField id="card-expiry" type="date" fullWidth onChange={onChange} />
        <TextField
          id="card-cvv"
          type="number"
          label="CVV code"
          fullWidth
          onChange={onChange}
        />
      </>
    ),
    Klarna: (
      <Typography variant="body2">
        Pay with invoice with Klarna Payment.
      </Typography>
    ),
    Vipps: (
      <Typography variant="body2">Fastest checkout with Vipps.</Typography>
    ),
  };

  return (
    <Stack spacing={2}>
      <Typography variant="h4">PAYMENT DETAILS</Typography>
      <Typography variant="body1">
        <strong>Payment method:</strong>
      </Typography>

      <ProviderLogoDisplay />

      <FormControl>
        {paymentProviders.map((provider) => (
          <FormControlLabel
            key={provider}
            control={
              <Checkbox
                key={provider}
                checked={selectedProvider === provider}
                onChange={() => handleCheck(provider)}
              />
            }
            label={provider}
          />
        ))}
        <FormHelperText sx={{ fontStyle: "italic" }}>
          Select your preferred provider
        </FormHelperText>
      </FormControl>

      {/* checked provider form */}
      {selectedProvider && (
        <>
          <Typography variant="body1">
            <strong>{providerTitles[selectedProvider]}</strong>
          </Typography>

          <FormControl sx={{ display: "flex", gap: 2 }}>
            {providerForms[selectedProvider]}
          </FormControl>
        </>
      )}
    </Stack>
  );
};
