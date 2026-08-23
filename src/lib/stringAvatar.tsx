// Resource: https://mui.com/material-ui/react-avatar/

function stringToColor(string: string) {
  let hash = 0;
  let i;

   
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = '#';

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }
   

  return color;
}

export function stringAvatar(name: string) {
  const normalized = name.trim();
  const parts = normalized.split(/\s+/).filter(Boolean);

  let initials = "?";
  if (parts.length >= 2) {
    initials = parts[0][0] + parts[1][0];
  } else if (parts.length === 1) {
    initials = parts[0].slice(0, 2);
  }

  return {
    sx: {
      bgcolor: stringToColor(initials || "?"),
      fontSize: 14,
    },
    children: initials.toUpperCase(),
  };
}
