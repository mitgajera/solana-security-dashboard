# Contributing to the Solana Security Dashboard

Thank you for considering contributing to the Solana Security Dashboard! This guide will help you get started with the contribution process.

## Development Setup

1. **Fork & Clone**:
   ```bash
   git clone https://github.com/mitgajera/solana-security-dashboard.git
   cd solana-security-dashboard
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Run Development Server**:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

## Contribution Workflow

1. **Create a Branch**:
   ```bash
   git checkout -b feature/descriptive-name
   ```

2. **Make & Test Changes**: Ensure your code works as expected and includes tests.

3. **Commit Changes**: Follow [conventional commits](https://www.conventionalcommits.org/) format.
   ```bash
   git commit -m "feat: add new security metric visualization"
   ```

4. **Push & Open PR**:
   ```bash
   git push origin feature/descriptive-name
   ```
   Then open a pull request with a clear description of changes.

## Best Practices

- **Code Style**: Follow the project's ESLint and Prettier configurations
- **Testing**: Write unit tests for new features and fix broken tests
- **Documentation**: Update relevant documentation for your changes
- **Atomic PRs**: Keep pull requests focused on a single concern
- **Issues First**: For major changes, open an issue for discussion before coding

## Issue Management

- Search for existing issues before creating new ones
- Use issue templates when available
- Be specific about the problem or feature request
- Include screenshots, error messages, or steps to reproduce issues

## Pull Request Process

1. Update documentation as needed
2. Add necessary tests
3. Ensure all CI checks pass
4. Request reviews from maintainers
5. Address review feedback promptly

We value all contributions and will work with you to get your changes merged. Thank you for helping make the Solana ecosystem safer!