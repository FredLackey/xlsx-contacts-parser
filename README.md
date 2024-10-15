# xlsx-contacts-parser

Extract Basic Contact Lists from Excel Files

## Installation

```bash
npm install xlsx-contacts-parser
```

## Usage

```javascript
const xlsxToJson = require('xlsx-to-json-parser');

const json = await xlsxToJson({
  path: 'path/to/excel/file.xlsx',
  password: 'SuperSecretPassword',
});
```

## Options

- `path` (string, required): Path to the Excel file.
- `password` (string, optional): Password to open the Excel file.

## Output

The output is a JSON object with the following structure:

```json
{
  "path": "path/to/excel/file.xlsx",
  "lists": [
    {
      "name": "List 1",
      "contacts": [
        {
          "email": "joe.blow@nowhere.com",
          "name": "Joe Blow"
        },
        {
          "email": "mike.smith@nowhere.com",
          "name": "Mike Smith"
        }
      ]
    }
  ]
}
```

## Contact Information

If you ever need a hand or have any questions, feel free to reach out.  

**Fred Lackey**  
[https://fredlackey.com](https://fredlackey.com)  
[fred.lackey@gmail.com](mailto:fred.lackey@gmail.com)  