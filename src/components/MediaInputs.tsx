import { useState, useCallback } from "react";
import { ClearIconButton } from "@/components/layout/ClearIconButton";
import { GridBox } from "@/components/GridBox";
import { Stack, Box, TextField, Button, InputLabel } from "@mui/material";

interface MediaInputsProps {
  id: string;
  initialAmount?: number;
  initialUrls?: string[];
  max?: number;
}

export const MediaInputs = ({
  id,
  initialAmount = 1,
  initialUrls,
  max = 10,
}: MediaInputsProps) => {
  const [urls, setUrls] = useState<string[]>(
    initialUrls && initialUrls.length > 0
      ? initialUrls
      : Array(Math.min(Math.max(0, initialAmount), max)).fill(""),
  );

  const addInput = useCallback(
    (amount: number) => {
      setUrls((prev) => {
        const remaining = Math.max(0, max - prev.length);
        const toAdd = Math.min(Math.max(0, amount), remaining);
        return [...prev, ...Array(toAdd).fill("")];
      });
    },
    [max],
  );

  const removeInput = (index: number) => {
    setUrls((prev) => prev.filter((_, i) => i !== index));
  };

  const updateUrl = (index: number, value: string) => {
    setUrls((prev) => prev.map((url, i) => (i === index ? value : url)));
  };

  return (
    <Stack id={id} sx={{ display: "grid", gap: 2 }}>
      <InputLabel>Venu media gallery urls</InputLabel>
      <GridBox id={id} ariaLabel="Media input group" styles={{ gap: 2 }}>
        {urls.map((url, i) => {
          const index = i + 1;
          return (
            <Box
              key={index}
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                gap: 2,
              }}
            >
              <TextField
                type="text"
                id={`media-input-${index}`}
                name="venue-media"
                placeholder="https://yourpublicimagehere.com"
                value={url}
                onChange={(e) => updateUrl(i, e.target.value)}
                sx={{ width: "100%" }}
              />
              <ClearIconButton onClick={() => removeInput(i)} />
            </Box>
          );
        })}
      </GridBox>
      <Button variant="outlined" onClick={() => addInput(1)}>
        Add image
      </Button>
    </Stack>
  );
};
