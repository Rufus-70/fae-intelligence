import * as fs from 'fs/promises';
import * as path from 'path';
import { glob } from 'glob';
import * as ts from 'typescript';
import { Neo4jClient, ContentAsset } from '../services/neo4j-client';

export interface ReactComponentInfo {
  filePath: string;
  componentName: string;
  content: string;
  exports: string[];
  imports: string[];
  jsxElements: string[];
  textContent: string[];
  metadata: {
    lineCount: number;
    fileSize: number;
    lastModified: Date;
    hasDefaultExport: boolean;
    hasNamedExports: boolean;
  };
}

export interface ExtractionResult {
  totalFiles: number;
  processedFiles: number;
  extractedComponents: number;
  errors: string[];
  duration: number;
}

export class ReactContentExtractor {
  private baseDir: string;
  private neo4jClient: Neo4jClient;
  private includePatterns: string[];
  private excludePatterns: string[];

  constructor(
    baseDir: string,
    neo4jClient: Neo4jClient,
    options: {
      includePatterns?: string[];
      excludePatterns?: string[];
    } = {}
  ) {
    this.baseDir = baseDir;
    this.neo4jClient = neo4jClient;
    this.includePatterns = options.includePatterns || ['**/*.{tsx,jsx}'];
    this.excludePatterns = options.excludePatterns || [
      '**/node_modules/**',
      '**/build/**',
      '**/dist/**',
      '**/.next/**',
      '**/out/**'
    ];
  }

  async extractFromDirectory(): Promise<ExtractionResult> {
    console.log('🔍 Starting React content extraction...');
    const startTime = Date.now();

    const result: ExtractionResult = {
      totalFiles: 0,
      processedFiles: 0,
      extractedComponents: 0,
      errors: [],
      duration: 0
    };

    try {
      // Find all React component files
      const tsxFiles = await this.findTsxFiles();
      result.totalFiles = tsxFiles.length;

      console.log(`📁 Found ${tsxFiles.length} React component files`);

      // Process each file
      for (const filePath of tsxFiles) {
        try {
          const componentInfo = await this.parseReactComponent(filePath);
          if (componentInfo && this.hasExtractableContent(componentInfo)) {
            const contentAsset = this.convertToContentAsset(componentInfo);
            await this.neo4jClient.ingestContentAsset(contentAsset);
            result.extractedComponents++;
          }
          result.processedFiles++;
        } catch (error) {
          const errorMsg = `Error processing ${filePath}: ${error instanceof Error ? error.message : String(error)}`;
          result.errors.push(errorMsg);
          console.error(`❌ ${errorMsg}`);
        }
      }

      result.duration = Date.now() - startTime;
      
      // Update extraction metadata
      await this.neo4jClient.updateExtractionMetadata('react', {
        lastExtraction: new Date(),
        totalFiles: result.totalFiles,
        processedFiles: result.processedFiles,
        extractedComponents: result.extractedComponents,
        errors: result.errors.length
      });

      console.log(`✅ React extraction complete: ${result.extractedComponents} components extracted in ${result.duration}ms`);
      return result;

    } catch (error) {
      result.errors.push(`Extraction failed: ${error instanceof Error ? error.message : String(error)}`);
      result.duration = Date.now() - startTime;
      return result;
    }
  }

  private async findTsxFiles(): Promise<string[]> {
    const files: string[] = [];
    
    for (const pattern of this.includePatterns) {
      const foundFiles = await glob(pattern, {
        cwd: this.baseDir,
        absolute: true,
        ignore: this.excludePatterns
      });
      files.push(...foundFiles);
    }

    return [...new Set(files)]; // Remove duplicates
  }

  private async parseReactComponent(filePath: string): Promise<ReactComponentInfo | null> {
    try {
      const fileContent = await fs.readFile(filePath, 'utf-8');
      const stats = await fs.stat(filePath);
      
      // Create TypeScript source file
      const sourceFile = ts.createSourceFile(
        filePath,
        fileContent,
        ts.ScriptTarget.Latest,
        true,
        ts.ScriptKind.TSX
      );

      const componentInfo: ReactComponentInfo = {
        filePath: path.relative(this.baseDir, filePath),
        componentName: path.basename(filePath, path.extname(filePath)),
        content: fileContent,
        exports: [],
        imports: [],
        jsxElements: [],
        textContent: [],
        metadata: {
          lineCount: fileContent.split('\n').length,
          fileSize: stats.size,
          lastModified: stats.mtime,
          hasDefaultExport: false,
          hasNamedExports: false
        }
      };

      // Parse AST
      this.visitNode(sourceFile, componentInfo);

      return componentInfo;
    } catch (error) {
      console.error(`Failed to parse ${filePath}:`, error);
      return null;
    }
  }

  private visitNode(node: ts.Node, componentInfo: ReactComponentInfo): void {
    switch (node.kind) {
      case ts.SyntaxKind.ImportDeclaration:
        const importDecl = node as ts.ImportDeclaration;
        const moduleSpecifier = (importDecl.moduleSpecifier as ts.StringLiteral).text;
        componentInfo.imports.push(moduleSpecifier);
        break;

      case ts.SyntaxKind.ExportAssignment:
        componentInfo.metadata.hasDefaultExport = true;
        const exportAssignment = node as ts.ExportAssignment;
        if (exportAssignment.expression && ts.isIdentifier(exportAssignment.expression)) {
          componentInfo.exports.push(exportAssignment.expression.text);
        }
        break;

      case ts.SyntaxKind.ExportDeclaration:
        componentInfo.metadata.hasNamedExports = true;
        break;

      case ts.SyntaxKind.FunctionDeclaration:
        const funcDecl = node as ts.FunctionDeclaration;
        if (funcDecl.name && funcDecl.modifiers?.some(m => m.kind === ts.SyntaxKind.ExportKeyword)) {
          componentInfo.exports.push(funcDecl.name.text);
        }
        break;

      case ts.SyntaxKind.JsxElement:
      case ts.SyntaxKind.JsxSelfClosingElement:
        const jsxElement = node as ts.JsxElement | ts.JsxSelfClosingElement;
        const tagName = this.getJsxTagName(jsxElement);
        if (tagName && !componentInfo.jsxElements.includes(tagName)) {
          componentInfo.jsxElements.push(tagName);
        }
        break;

      case ts.SyntaxKind.JsxText:
        const jsxText = node as ts.JsxText;
        const text = jsxText.text.trim();
        if (text && text.length > 3) {
          componentInfo.textContent.push(text);
        }
        break;

      case ts.SyntaxKind.StringLiteral:
        const stringLiteral = node as ts.StringLiteral;
        const value = stringLiteral.text.trim();
        if (value && value.length > 10 && this.isContentString(value)) {
          componentInfo.textContent.push(value);
        }
        break;
    }

    // Recursively visit child nodes
    ts.forEachChild(node, child => this.visitNode(child, componentInfo));
  }

  private getJsxTagName(element: ts.JsxElement | ts.JsxSelfClosingElement): string | null {
    const tagName = element.kind === ts.SyntaxKind.JsxElement
      ? element.openingElement.tagName
      : element.tagName;

    if (ts.isIdentifier(tagName)) {
      return tagName.text;
    }
    if (ts.isPropertyAccessExpression(tagName)) {
      return tagName.getText();
    }
    return null;
  }

  private isContentString(text: string): boolean {
    // Filter out code-like strings, focusing on human-readable content
    const codePatterns = [
      /^[a-zA-Z_][a-zA-Z0-9_]*$/, // Variable names
      /^[./]/, // File paths
      /^https?:\/\//, // URLs
      /^#[0-9a-fA-F]+$/, // Hex colors
      /^\d+px$/, // CSS values
      /^className|style|src|href|alt|title$/ // Common prop names
    ];

    return !codePatterns.some(pattern => pattern.test(text)) &&
           text.includes(' ') && // Contains spaces (likely human text)
           !/^[\w-]+$/.test(text); // Not just a single word/identifier
  }

  private hasExtractableContent(componentInfo: ReactComponentInfo): boolean {
    return componentInfo.textContent.length > 0 ||
           componentInfo.jsxElements.some(el => 
             ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'span', 'div', 'Card', 'Modal', 'Button'].includes(el)
           );
  }

  private convertToContentAsset(componentInfo: ReactComponentInfo): ContentAsset {
    const extractedText = componentInfo.textContent.join(' ');
    
    return {
      id: `react_${componentInfo.filePath.replace(/[\/\.]/g, '_')}`,
      title: `React Component: ${componentInfo.componentName}`,
      content: extractedText || `React component with JSX elements: ${componentInfo.jsxElements.join(', ')}`,
      type: 'asset',
      source: 'react_component',
      metadata: {
        filePath: componentInfo.filePath,
        componentName: componentInfo.componentName,
        jsxElements: componentInfo.jsxElements,
        exports: componentInfo.exports,
        imports: componentInfo.imports.filter(imp => !imp.startsWith('.')), // External imports only
        lineCount: componentInfo.metadata.lineCount,
        fileSize: componentInfo.metadata.fileSize,
        lastModified: componentInfo.metadata.lastModified.toISOString(),
        hasDefaultExport: componentInfo.metadata.hasDefaultExport,
        hasNamedExports: componentInfo.metadata.hasNamedExports,
        extractedAt: new Date().toISOString(),
        platform: 'react'
      }
    };
  }

  async getExtractionStats(): Promise<any> {
    return await this.neo4jClient.getExtractionMetadata('react');
  }
}