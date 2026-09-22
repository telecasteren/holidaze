# Basic run, opens the HTML report when done

`lighthouse https://holidaze.telecasternilsen.com --view`

# Desktop instead of the default mobile emulation

`lighthouse <url> --preset=desktop --view`

# Only specific categories

`lighthouse <url> --only-categories=performance,accessibility`

# Save the report to a file

`lighthouse <url> --output=html --output-path=./report.html`

# JSON output, useful for comparing runs

`lighthouse <url> --output=json --output-path=./report.json`

# Headless Chrome, no browser window

`lighthouse <url> --chrome-flags="--headless"`

# All flags

`lighthouse --help`
