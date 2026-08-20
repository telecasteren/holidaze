import { Typography } from '@mui/material';

export default function HeroTitle({ title, span }: { title: string; span: string }) {
  return (
    <>
    <Typography
      variant="h1"
      sx={{
        display: 'flex',
        flexDirection: { xs: 'column', sm: 'row' },
        alignItems: 'center',
        gap: { sm: 1.5 },
        fontSize: 'clamp(3rem, 10vw, 3.5rem)',
      }}
    >
      {title}
      <Typography
        component="span"
        variant="h1"
        sx={(theme) => ({
          fontSize: 'inherit',
          color: 'primary.main',
          ...theme.applyStyles('dark', {
            color: 'primary.light',
          }),
        })}
      >
        {span}
      </Typography>
      </Typography>
    </>
  );
}
