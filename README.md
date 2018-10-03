# appliance-reader

# Prerequisites - Tesseract for node.js

[![NPM](https://nodei.co/npm/node-tesseract.png)](https://nodei.co/npm/node-tesseract/)

A simple wrapper for the Tesseract OCR package for node.js

## Requirements

* Tesseract 3.01 or higher is needed for this to work

## Installation
There is a hard dependency on the [Tesseract project](https://github.com/tesseract-ocr/tesseract).  You can find installation instructions for various platforms on the project site. For Homebrew users, the installation is quick and easy.

    brew install tesseract --with-all-languages

The above will install all of the language packages available, if you don't need them all you can remove the `--all-languages` flag and install them manually, by downloading them to your local machine and then exposing the `TESSDATA_PREFIX` variable into your path:

    export TESSDATA_PREFIX=~/Downloads/

You can then go about installing the node-module to expose the JavaScript API:

    npm install node-tesseract

# Setup

Clone the repo and install the dependencies.

```bash
git clone https://github.com/PavleNeskovic/appliance-reader
cd appliance-reader
```

```bash
npm install
```

## Start the Server

To start the express server, run the following

```bash
node index.js
```

