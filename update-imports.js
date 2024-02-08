const fs = require('fs');
const path = require('path');
const readline = require('readline');
const { exec } = require('child_process');

const componentsFolder = './components/ui/';
const importsFile = 'ui-imports.tsx';

let chosenComponentsFolder = componentsFolder;
let exportStatement = ''; // Initialize exportStatement

if (fs.existsSync('./src')) {
    chosenComponentsFolder = './src/components/ui/';
    if (!fs.existsSync(chosenComponentsFolder)) {
        fs.mkdirSync(chosenComponentsFolder, { recursive: true });
        console.log('./src/components/ui/ created.');
    }
    processComponents();
} else if (!fs.existsSync(chosenComponentsFolder)) {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    rl.question('Neither ./components/ui/ nor ./src/components/ui/ exist. Do you want to create ./components/ui/? (y/n) ', (answer) => {
      if (answer.toLowerCase() === 'y') {
        fs.mkdirSync(chosenComponentsFolder, { recursive: true });
        console.log('./components/ui/ created.');
        processComponents();
        updateImports();
    } else {
        console.log('Folder not created. Please manually create either ./components/ui/ or ./src/components/ui/ and run the script again.');
        process.exit(1);
    }
        rl.close();
    });
} else {
    processComponents();
}

function processComponents() {
  const componentFiles = fs.readdirSync(chosenComponentsFolder)
    .filter(file => file.endsWith('.tsx') && file !== importsFile);

  if (!fs.existsSync('./components.json')) {
    console.log('Shadcn-ui config file not found, creating one... (rootdir_components.json)');

    let componentsJson = {
      "$schema": "https://ui.shadcn.com/schema.json",
      "style": "default",
      "tailwind": {
        "config": "tailwind.config.ts",
        "css": "app/globals.css",
        "baseColor": "slate",
        "cssVariables": true
      },
      "rsc": false,
      "aliases": {
        "utils": "@/core/lib/utils",
        "components": "@/components"
      }
    };

    console.log('components.json created. Please make sure the aliases and tailwind extension are correct.');

    fs.writeFileSync('./components.json', JSON.stringify(componentsJson, null, 2));
    console.log("Configuration is missing. Make sure shadcn-ui is initialized (components.json)...");
    exec('npx shadcn-ui@latest init', (error, stdout, stderr) => {
      if (error) {
        console.log(`errorrrr: ${error.message}`);
        return;
      }
    });
  }

// Generate import statements for each component
const importStatements = componentFiles.map(file => {
  let componentName = path.basename(file, '.tsx');
  componentName = componentName.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join('');
  return `import { ${componentName} } from './${componentName}';`;
});

// Create the export statement
const exportStatement = `export { ${componentFiles.map(file => {
  let componentName = path.basename(file, '.tsx');
  componentName = componentName.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join('');
  return componentName;
}).join(', ')} };`;

// Combine import statements and export statement
const content = `${importStatements.join('\n')}\n${exportStatement}\n`;

// Write the content to the ui-imports.tsx file
fs.writeFileSync(path.join(chosenComponentsFolder, importsFile), content);

  console.log(`Imports updated in ${path.join(chosenComponentsFolder, importsFile)}.`);
  console.log(`Components exportable in ui-imports.tsx: ${componentFiles.join(', ')}`);
  process.exit(0);
}