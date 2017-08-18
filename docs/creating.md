# Writing your own template

<!-- TODO: docs: Writing your own template -->
## Template structure

```
└── my-template
    ├── template ···································· Template source files directory (Required)
    │   ├── assets ·································· Any directory (Recurse all subdirectories)
    │   │   ├── logo.png ···························· Any file (Auto skip binary file)
    │   │   └── style.css ··························· Any file (Auto render mustache)
    │   └── index.html ······························ Any file (Auto render mustache)
    ├── index.js ···································· Entry point (Optional, Configuration file)
    └── README.md ··································· README (Optional)
```

## Configuration

A template repo may have a config file for the template which can be either a `index.js` or `main file` defined in `package.json`.

It must export an object:

```js
module.exports = {}
```

### Options

Config file can contain the following fields:

#### name

- Type: `string`
- Details: Name of template.

#### version

- Type: `string`
- Details: Version of template.

#### source

- Type: `string`
- Default: 'template'
- Details: Template source files directory name.

#### metadata

- Type: `string`
- Details: The metadata you can use in the template.

#### prompts

- Type: `Object`
- Details: Used to collect user input in CLI.

#### filters

- Type: `Object`
- Details: Used to conditional filter files to output.

#### helpers

- Type: `Object`
- Details: Used to custom handlebars helpers.

#### plugin

- Type: `Object`
- Details: Used to add custom metalsmith plugins in the chain.

#### complete

- Type: `string` or `Function`
- Details: Generate completed callback. if got a string, print it to the console.

