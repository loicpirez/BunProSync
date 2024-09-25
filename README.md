# WKBunProSync

WKBunProSync is a tool for synchronizing your progress between WaniKani and BunPro.

## Environment Variables

To run this project, you'll need to add the following environment variables to your `.env` file:

- **`BUNPRO_LOGIN`**: Your BunPro login email.
- **`BUNPRO_PASSWORD`**: Your BunPro password.

**Note**: BunPro credentials are necessary because the official API is not publicly accessible.

## Data Requirements

In addition to WaniKani, you can specify additional words by creating an `items.txt` file in the `data/` directory. This file should contain a list of Japanese words, with each word on a new line.

### Example `items.txt` file:

```plaintext
こんにちは
さようなら
```

### Example `.env` File

```plaintext
BUNPRO_LOGIN=your_bunpro_login_email
BUNPRO_PASSWORD=your_bunpro_password
```