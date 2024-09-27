# BunProSync

BunProSync is a tool for adding words to review in BunPro.

## Environment Variables

To run this project, you'll need to add the following environment variables to your `.env` file:

- **`BUNPRO_LOGIN`**: Your BunPro login email.
- **`BUNPRO_PASSWORD`**: Your BunPro password.

**Note**: BunPro credentials are required because the official API is not publicly accessible.

## Data Requirements

Words should be specified by creating an `items.txt` file in the `data/` directory. This file should contain a list of Japanese words, with each word on a new line.

### Example of an `items.txt` file:

```plaintext
こんにちは
さようなら
```

### Example of a `.env` file:

```plaintext
BUNPRO_LOGIN=your_bunpro_login_email
BUNPRO_PASSWORD=your_bunpro_password
```
