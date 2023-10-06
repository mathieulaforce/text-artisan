**status**: ![github build and test badge](https://github.com/mathieulaforce/text-artisan/actions/workflows/main.yml/badge.svg)

**url**: https://text-artisan.vercel.app.

# Documentation

## Data

The 'Data section' is where you specify the values that should be repeated according to the pattern defined in the 'Pattern section.' This section allows you to provide the specific data that will follow the established pattern

**Formats**

**CSV (Comma-Separated Values)**

is a text file format used for storing tabular data. It employs commas to separate individual values, with each line representing a data record. Fields within a record are separated by commas, and if a field contains a comma, it is enclosed in quotation marks.

To allow for flexibility, you can change the commas to any value of your choosing as the column separator. Similarly, for new lines, you can use the "\n" character as the row separator. This customization feature allows you to adapt the format to your specific needs when working with CSV data.

A common practice when using CSV files is to have the first line serve as the header. This header describes what each data column represents. When your data includes a header, you should check the header checkbox. If your data does not have a header, uncheck the box.

The following example shows person information with a header line, the column separator "," and row separator (\n) new line

```
firstname, lastname, country
Juanita, Fletcher, Spain
Abigail, Bell, Belarus
```

**JSON (JavaScript Object Notation)**

Not yet supported

## Pattern

In the 'Pattern' section, you create a text pattern with placeholders. These placeholders are like blanks to be filled in with data from the 'Data section.' The results of this pattern substitution will be displayed in the 'Output' section.

**Placeholders**

To use placeholders, you need to define a prefix and a suffix. These are like markers that tell the system where to put the data. Here are some examples with the prefix and suffix as '$':

examples of a placeholder when prefix and suffix have the value $

- \$0\$: This represents the first piece of data.
- \$5\$: This represents the sixth piece of data.
- \$firstname\$: This placeholder matches the 'firstname' data.
- \$lastname\$: This one matches the 'lastname' data.

Each field in the 'Data section' corresponds to a number, starting from 0. For instance, if you have data fields like firstname, lastname, country, they correspond to placeholders like $0$, $1$, $2$.

You can also use named placeholders, but only when you have a header in the CSV format. With a header, the placeholders match the field names like $firstname$, $lastname$, and $country$.

**Reserved placeholders**

There are a few special placeholders that you can use to enhance your patterns:

- **rowIndex**: It returns the index number of the current data line. For example, 0 for the first line, 1 for the second, and so on.
- **rowNumber**: This returns the line number but starting from 1 instead of 0. So, it's like rowIndex + 1.
- **h0, h1, h2,...hn**: These placeholders return the field names when you have a header defined in the input data. For example, if your header is firstname, lastname, country, then h0 is firstname, h1 is lastname, and h2 is country.
